import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth/session";
import { isDatabaseConfigured } from "@/lib/mongodb";
import { LoginForm } from "@/components/admin/LoginForm";
import styles from "../admin.module.css";

export const instant = false;

export default async function LoginPage() {
  if (await getCurrentAdmin()) redirect("/admin");
  return (
    <main className={styles.loginPage}>
      <div className={styles.loginInner}>
        <p className={styles.loginBrand}>Ascend</p>
        <h1 className={styles.loginTitle}>Sign in to edit the site</h1>
        {!isDatabaseConfigured() && (
          <p className={styles.notice}>
            The database isn&rsquo;t connected. Set <code>MONGODB_URI</code>, then create the first
            admin with <code>npm run admin:create</code>.
          </p>
        )}
        <LoginForm />
        <p className={styles.loginFoot}>
          No account? Ask an existing admin to add you.
        </p>
      </div>
    </main>
  );
}
