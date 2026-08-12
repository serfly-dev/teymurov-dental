"use client";

import Styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const Header = () => {
    const pathname = usePathname();

    const isAdminPage = pathname.startsWith("/admin");

    if (isAdminPage) {
        return null;
    }

    return (
        <header className={Styles["header"]}>
            <div className={Styles["header__main"]}>
                <Link href="/" aria-label="Перейти на главную страницу">
                    <Image
                        src="/static/logo.png"
                        width={123}
                        height={123}
                        className={Styles["header__logo"]}
                        alt="Логотип стоматологической клиники «Стоматологическая династия Теймуровых»"
                        priority
                    />
                </Link>
                <div className={Styles["header__container"]}>
                    <address className={Styles["header__contacts"]}>
                        <a
                            href="tel:+79292177781"
                            className={Styles["header__contact"]}
                        >
                            +7 (929) 217-77-81
                        </a>

                        <a
                            href="https://yandex.ru/maps/-/CTWTZT80"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={Styles["header__contact"]}
                        >
                            Екатеринбург, Пехотинцев 2В
                        </a>

                        <time className={Styles["header__contact"]}>
                            Пн–Сб, 09:00–21:00
                        </time>
                    </address>

                    <nav
                        className={Styles["header__navigation"]}
                        aria-label="Основная навигация"
                    >
                        <ul className={Styles["header__list"]}>
                            <li className={Styles["header__item"]}>
                                <Link
                                    href="/"
                                    aria-current={pathname === "/" ? "page" : undefined}
                                    className={`${Styles["header__link"]} ${pathname === "/" ? Styles["header__link--active"] : ""
                                        }`}
                                >
                                    Главная
                                </Link>
                            </li>

                            <li className={Styles["header__item"]}>
                                <Link
                                    href="/about-us"
                                    aria-current={pathname === "/about-us" ? "page" : undefined}
                                    className={`${Styles["header__link"]} ${pathname === "/about-us"
                                        ? Styles["header__link--active"]
                                        : ""
                                        }`}
                                >
                                    О клинике
                                </Link>
                            </li>

                            <li className={Styles["header__item"]}>
                                <Link
                                    href="/services"
                                    aria-current={pathname === "/services" ? "page" : undefined}
                                    className={`${Styles["header__link"]} ${pathname === "/services"
                                        ? Styles["header__link--active"]
                                        : ""
                                        }`}
                                >
                                    Услуги
                                </Link>
                            </li>

                            <li className={Styles["header__item"]}>
                                <Link
                                    href="/doctors"
                                    aria-current={pathname === "/doctors" ? "page" : undefined}
                                    className={`${Styles["header__link"]} ${pathname === "/doctors"
                                        ? Styles["header__link--active"]
                                        : ""
                                        }`}
                                >
                                    Специалисты
                                </Link>
                            </li>

                            <li className={Styles["header__item"]}>
                                <Link
                                    href="/blog"
                                    aria-current={pathname === "/blog" ? "page" : undefined}
                                    className={`${Styles["header__link"]} ${pathname === "/blog"
                                        ? Styles["header__link--active"]
                                        : ""
                                        }`}
                                >
                                    Полезная информация
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};