"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/admin/actions";
import styles from "@/app/admin/admin.module.css";
import { External } from "./icons";

const LINKS = [
  { href: "/admin", label: "Page content" },
  { href: "/admin/users", label: "Admins" },
  { href: "/admin/account", label: "Your account" },
];

export function AdminNav({ email }: { email: string }) {
  const path = usePathname();
  const current = (href: string) =>
    href === "/admin" ? path === "/admin" || path.startsWith("/admin/content") : path.startsWith(href);
  return (
    <aside className={styles.sidebar}>
      <Link href="/admin" className={styles.brand}>
        Ascend
        <span className={styles.brandSub}>Content admin</span>
      </Link>
      <nav className={styles.nav} aria-label="Admin">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={styles.navLink}
            aria-current={current(l.href) ? "page" : undefined}
          >
            {l.label}
          </Link>
        ))}
        <a href="/" target="_blank" rel="noopener noreferrer" className={styles.navLink}>
          View the site
          <External className={styles.navIcon} />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </nav>
      <div className={styles.who}>
        <span className={styles.avatar} aria-hidden="true">
          {email.charAt(0).toUpperCase()}
        </span>
        <span className={styles.whoText}>
          <span className={styles.whoEmail}>{email}</span>
          <form action={logoutAction}>
            <button type="submit" className={styles.quietButton}>
              Sign out
            </button>
          </form>
        </span>
      </div>
    </aside>
  );
}
