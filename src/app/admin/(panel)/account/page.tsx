import { requireAdmin } from "@/lib/auth/session";
import { ChangePasswordForm } from "@/components/admin/AccountForms";
import styles from "../../admin.module.css";

export const instant = false;

export default async function Account() {
  const me = await requireAdmin();
  return (
    <>
      <header className={styles.pageHead}>
        <h1 className={styles.title}>Your account</h1>
        <p className={styles.lead}>Signed in as {me.email}.</p>
      </header>
      <section className={styles.formSection} aria-labelledby="change-password">
        <h2 id="change-password" className={styles.sectionTitle}>
          Change password
        </h2>
        <p className={styles.hint}>Changing it signs you out everywhere else.</p>
        <ChangePasswordForm />
      </section>
    </>
  );
}
