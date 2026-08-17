import { prisma } from "@/server/db/prisma";

import { FilesTable } from "@/components/admin/files/FilesTable";
import type { FileWithDisplayName, FileUsageInfo } from "@/components/admin/files/types";

// Приоритеты использования (от высшего к низшему)
const USAGE_PRIORITY = ["doctors", "certificates", "articles", "serviceImages"] as const;
type UsageType = typeof USAGE_PRIORITY[number];

// Функция получения приоритетного использования файла
function getMainUsage(usage: FileUsageInfo | undefined): { type: UsageType; name: string } | null {
    if (!usage) return null;

    // Проходим по приоритетам
    for (const type of USAGE_PRIORITY) {
        const usageData = usage[type];
        if (usageData?.count && usageData.count > 0) {
            return { type, name: usageData.displayName };
        }
    }

    return null;
}

// Функция формирования display name на основе использования
function getDisplayName(usage: FileUsageInfo | undefined): string | null {
    const mainUsage = getMainUsage(usage);
    if (!mainUsage) return null;

    switch (mainUsage.type) {
        case "doctors":
            return mainUsage.name;
        case "certificates":
            return mainUsage.name;
        case "articles":
            return mainUsage.name;
        case "serviceImages":
            return mainUsage.name;
        default:
            return null;
    }
}

export default async function MediaPage({
    searchParams,
}: {
    searchParams: Promise<{
        search?: string;
        sort?: string;
        order?: string;
    }>;
}) {
    const params = await searchParams;

    const search = params.search?.trim() ?? "";
    const sort = params.sort ?? "createdAt";
    const order = params.order === "asc" ? "asc" : "desc";

    // Получаем список файлов с пагинацией/сортировкой
    const files = await prisma.file.findMany({
        where: search
            ? {
                  OR: [
                      {
                          filename: {
                              contains: search,
                              mode: "insensitive",
                          },
                      },
                      {
                          originalName: {
                              contains: search,
                              mode: "insensitive",
                          },
                      },
                  ],
              }
            : undefined,
        orderBy: {
            [sort]: order,
        },
    });

    if (files.length === 0) {
        return (
            <FilesTable
                files={files as FileWithDisplayName[]}
                search={search}
                sort={sort}
                order={order}
                usage={{}}
            />
        );
    }

    // Агрегированные запросы для подсчета использования файлов
    const fileUrls = files.map((f) => f.url);

    // Используем findMany + select вместо groupBy для получения данных
    const [doctors, certificates, articles, serviceImagesWithDetails] = await Promise.all([
        // Доктора с полным именем
        prisma.doctor.findMany({
            where: {
                photo: { in: fileUrls, not: null },
            },
            select: {
                photo: true,
                fullName: true,
            },
        }),
        // Сертификаты с названием
        prisma.doctorCertificate.findMany({
            where: {
                image: { in: fileUrls },
            },
            select: {
                image: true,
                name: true,
            },
        }),
        // Статьи с заголовком
        prisma.article.findMany({
            where: {
                image: { in: fileUrls, not: null },
            },
            select: {
                image: true,
                title: true,
            },
        }),
        // Изображения услуг с названием услуги
        prisma.serviceImage.findMany({
            where: {
                url: { in: fileUrls },
            },
            include: {
                service: {
                    select: {
                        name: true,
                    },
                },
            },
        }),
    ]);

    // Сопоставляем результаты в Map для быстрого доступа
    const usageMap = new Map<string, FileUsageInfo>();

    // Доктора (фото) - подсчитываем сколько раз каждый url используется
    const doctorUsageMap = new Map<string, { count: number; fullName: string }>();
    for (const item of doctors) {
        const existing = doctorUsageMap.get(item.photo);
        if (existing) {
            doctorUsageMap.set(item.photo, { count: existing.count + 1, fullName: existing.fullName });
        } else {
            doctorUsageMap.set(item.photo, { count: 1, fullName: item.fullName });
        }
    }
    for (const [url, { count, fullName }] of doctorUsageMap) {
        const displayName = `Фото врача: ${fullName}`;
        const existing = usageMap.get(url) || {};
        usageMap.set(url, {
            ...existing,
            doctors: { count, displayName },
        });
    }

    // Сертификаты докторов
    const certificateUsageMap = new Map<string, { count: number; name: string }>();
    for (const item of certificates) {
        const existing = certificateUsageMap.get(item.image);
        if (existing) {
            certificateUsageMap.set(item.image, { count: existing.count + 1, name: existing.name });
        } else {
            certificateUsageMap.set(item.image, { count: 1, name: item.name });
        }
    }
    for (const [url, { count, name }] of certificateUsageMap) {
        const displayName = `Сертификат: ${name}`;
        const existing = usageMap.get(url) || {};
        usageMap.set(url, {
            ...existing,
            certificates: { count, displayName },
        });
    }

    // Статьи
    const articleUsageMap = new Map<string, { count: number; title: string }>();
    for (const item of articles) {
        const existing = articleUsageMap.get(item.image);
        if (existing) {
            articleUsageMap.set(item.image, { count: existing.count + 1, title: existing.title });
        } else {
            articleUsageMap.set(item.image, { count: 1, title: item.title });
        }
    }
    for (const [url, { count, title }] of articleUsageMap) {
        const displayName = `Статья: ${title}`;
        const existing = usageMap.get(url) || {};
        usageMap.set(url, {
            ...existing,
            articles: { count, displayName },
        });
    }

    // Изображения услуг (суммируем, если один url используется несколько раз)
    for (const item of serviceImagesWithDetails) {
        const url = item.url;
        const displayName = `Услуга: ${item.service.name}`;
        const existing = usageMap.get(url) || {};
        const currentCount = existing.serviceImages?.count ?? 0;
        usageMap.set(url, {
            ...existing,
            serviceImages: { count: currentCount + 1, displayName },
        });
    }

    // Добавляем displayName к каждому файлу
    const filesWithDisplay: FileWithDisplayName[] = files.map((file) => {
        const usageInfo = usageMap.get(file.url);
        const displayName = getDisplayName(usageInfo) || file.originalName;

        return {
            ...file,
            displayName,
        };
    });

    // Преобразуем Map в объект для передачи в компонент
    const usageObject = Object.fromEntries(usageMap);

    return (
        <FilesTable
            files={filesWithDisplay}
            search={search}
            sort={sort}
            order={order}
            usage={usageObject}
        />
    );
}
