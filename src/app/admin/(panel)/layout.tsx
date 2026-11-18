import { requireAdmin } from "@/lib/auth/session";
import { AdminNav } from "@/components/admin/AdminNav";
import styles from "../admin.module.css";

export const instant = false;

/** Signed-in area: sidebar + page. Each page and action also checks the admin itself. */
export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  return (
    <div className={styles.panel}>
      <AdminNav email={admin.email} />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
