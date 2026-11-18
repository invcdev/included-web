"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/admin/actions";
import styles from "@/app/admin/admin.module.css";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, undefined);
  return (
    <form action={action} className={styles.form}>
      <label className={styles.field}>
        <span className={styles.label}>Email</span>
        <input
          className={styles.input}
          name="email"
          type="email"
          autoComplete="username"
          defaultValue={state?.email}
          key={state?.email}
          required
        />
      </label>
      <label className={styles.field}>
        <span className={styles.label}>Password</span>
        <input className={styles.input} name="password" type="password" autoComplete="current-password" required />
      </label>
      {state?.error && (
        <p className={styles.error} role="alert">
          {state.error}
        </p>
      )}
      <button className={`${styles.primary} ${styles.wide}`} type="submit" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
