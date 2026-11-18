import { requireAdmin, usersCollection } from "@/lib/auth/session";
import { deleteAdminAction } from "@/app/admin/actions";
import { NewAdminForm } from "@/components/admin/AccountForms";
import { PASSWORD_MIN_LENGTH } from "@/lib/auth/password";
import styles from "../../admin.module.css";

export const instant = false;

export default async function Users() {
  const me = await requireAdmin();
  const users = await (await usersCollection())
    .find({}, { projection: { passwordHash: 0 } })
    .sort({ createdAt: 1 })
    .toArray();

  return (
    <>
      <header className={styles.pageHead}>
        <h1 className={styles.title}>Admins</h1>
        <p className={styles.lead}>Everyone here can edit the site and add or remove admins.</p>
      </header>

      <ul className={styles.people}>
        {users.map((u) => {
          const id = u._id.toHexString();
          return (
            <li key={id} className={styles.person}>
              <span className={styles.avatar} aria-hidden="true">
                {(u.name || u.email).charAt(0).toUpperCase()}
              </span>
              <span className={styles.personText}>
                <span className={styles.personName}>{u.name || u.email}</span>
                <span className={styles.personMeta}>
                  {u.name ? `${u.email}, ` : ""}
                  {u.lastLoginAt
                    ? `last signed in ${u.lastLoginAt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`
                    : "hasn’t signed in yet"}
                </span>
              </span>
              {id === me.id ? (
                <span className={styles.you}>You</span>
              ) : (
                <form action={deleteAdminAction}>
                  <input type="hidden" name="id" value={id} />
                  <button type="submit" className={styles.dangerButton}>
                    Remove
                  </button>
                </form>
              )}
            </li>
          );
        })}
      </ul>

      <section className={styles.formSection} aria-labelledby="add-admin">
        <h2 id="add-admin" className={styles.sectionTitle}>
          Add an admin
        </h2>
        <p className={styles.hint}>
          Set a temporary password of at least {PASSWORD_MIN_LENGTH} characters and send it to them
          privately. They can change it under Your account.
        </p>
        <NewAdminForm />
      </section>
    </>
  );
}
