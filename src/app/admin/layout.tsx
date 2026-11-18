import type { Metadata } from "next";
import styles from "./admin.module.css";

// The admin reads the sign-in cookie on every request, so it renders at
// request time and is never prerendered (the public site still is).
export const instant = false;

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.admin}>{children}</div>;
}
