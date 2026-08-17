import type { File } from "@/generated/prisma/client";

export type FileWithDisplayName = File & {
    displayName: string;
};

export interface FileUsageInfo {
    doctors?: { count: number; displayName: string };
    certificates?: { count: number; displayName: string };
    articles?: { count: number; displayName: string };
    serviceImages?: { count: number; displayName: string };
}
