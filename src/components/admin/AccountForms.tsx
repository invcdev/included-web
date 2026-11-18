"use client";

import { useActionState } from "react";
import { changePasswordAction, createAdminAction } from "@/app/admin/actions";
import styles from "@/app/admin/admin.module.css";

function Status({ state }: { state: { error?: string; message?: string } | undefined }) {
  if (state?.error) return <p className={styles.error} role="alert">{state.error}</p>;
  if (state?.message) return <p className={styles.success} role="status">{state.message}</p>;
  return null;
}

export function NewAdminForm() {
  const [state, action, pending] = useActionState(createAdminAction, undefined);
  return (
    <form action={action} className={styles.form}>
      <div className={styles.row2}>
        <label className={styles.field}>
          <span className={styles.label}>Email</span>
          <input
            className={styles.input}
            name="email"
            type="email"
            required
            autoComplete="off"
            defaultValue={state?.error ? state.email : undefined}
            key={`e${state?.email}${state?.message}`}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Name (optional)</span>
          <input
            className={styles.input}
            name="name"
            autoComplete="off"
            defaultValue={state?.error ? state.name : undefined}
            key={`n${state?.name}${state?.message}`}
          />
        </label>
      </div>
      <label className={styles.field}>
        <span className={styles.label}>Temporary password</span>
        <input className={styles.input} name="password" type="text" required autoComplete="new-password" />
      </label>
      <Status state={state} />
      <button className={styles.primary} type="submit" disabled={pending}>
        {pending ? "Adding…" : "Add admin"}
      </button>
    </form>
  );
}

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState(changePasswordAction, undefined);
  return (
    <form action={action} className={styles.form}>
      <label className={styles.field}>
        <span className={styles.label}>Current password</span>
        <input className={styles.input} name="current" type="password" required autoComplete="current-password" />
      </label>
      <div className={styles.row2}>
        <label className={styles.field}>
          <span className={styles.label}>New password</span>
          <input className={styles.input} name="next" type="password" required autoComplete="new-password" />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Repeat new password</span>
          <input className={styles.input} name="confirm" type="password" required autoComplete="new-password" />
        </label>
      </div>
      <Status state={state} />
      <button className={styles.primary} type="submit" disabled={pending}>
        {pending ? "Saving…" : "Change password"}
      </button>
    </form>
  );
}
