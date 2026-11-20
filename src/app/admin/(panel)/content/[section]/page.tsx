import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/session";
import { defaultContent, sectionSchemas, type SectionKey } from "@/content";
import { getContentStore } from "@/content/store";
import { SECTIONS } from "@/content/sections";
import { PAGES } from "@/content/pages";
import { isCloudinaryConfigured } from "@/lib/cloudinary";
import { SectionEditor, type JsonSchema } from "@/components/admin/SectionEditor";
import { Back } from "@/components/admin/icons";
import styles from "../../../admin.module.css";

export const instant = false;

export default async function EditSection({ params }: { params: Promise<{ section: string }> }) {
  await requireAdmin();
  const { section } = await params;
  const meta = SECTIONS.find((s) => s.key === section);
  if (!meta) notFound();
  const key = meta.key as SectionKey;

  // Read straight from the database (not the page cache) so the editor is always current.
  const stored = (await getContentStore().load())?.[key];
  let value: unknown = defaultContent[key];
  let notice: string | undefined;
  if (stored !== undefined) {
    const parsed = sectionSchemas[key].safeParse(stored);
    if (parsed.success) value = parsed.data;
    else notice = "The saved version of this section is invalid, so the site shows the default. Saving here replaces it.";
  }

  // Round-trip through JSON so only plain objects reach the client component.
  const schema = JSON.parse(JSON.stringify(z.toJSONSchema(sectionSchemas[key], { io: "input" }))) as JsonSchema;

  return (
    <>
      <header className={styles.pageHead}>
        <Link href={`/admin?page=${meta.page}`} className={styles.back}>
          <Back /> {PAGES.find((p) => p.slug === meta.page)?.label ?? "Page content"}
        </Link>
        <h1 className={styles.title}>{meta.label}</h1>
        <p className={styles.lead}>{meta.description}</p>
      </header>
      {notice && <p className={styles.notice}>{notice}</p>}
      <SectionEditor
        sectionKey={key}
        schema={schema}
        initialValue={value}
        isCustomised={stored !== undefined}
        cloudinary={isCloudinaryConfigured()}
      />
    </>
  );
}
