"use client";

/*
 * Form editor for one content section, built from the section's JSON Schema
 * (generated from the zod schema in src/content/schema.ts). Adding a field to
 * the schema adds it here; no form code to write.
 *
 *   object  -> its fields (images, links and [x, y] pairs get their own widgets)
 *   array   -> a list with add / remove / reorder; fixed-length lists can only be edited
 *   string  -> a text box (multi-line for longer text), enum -> a select
 *   optional fields -> "Add" / "Remove"
 *
 * Top-level groups read as headed parts of a document; nested groups indent
 * with a thin rule instead of another frame.
 *
 * The server validates again on save and returns any problems by field path.
 */
import React, { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { getUploadSignature, resetSectionAction, saveSectionAction } from "@/app/admin/actions";
import styles from "@/app/admin/admin.module.css";
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, Close, Plus, Upload } from "./icons";

export type JsonSchema = {
  type?: string;
  description?: string;
  properties?: Record<string, JsonSchema>;
  required?: string[];
  items?: JsonSchema | false;
  prefixItems?: JsonSchema[];
  enum?: string[];
  minItems?: number;
  maxItems?: number;
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
};

type Path = (string | number)[];
type Errors = Record<string, string>;
type Ctx = { errors: Errors; cloudinary: boolean };

/* ---------- Labels ---------- */

const LABELS: Record<string, string> = {
  cta: "Button",
  primaryCta: "Main button",
  secondaryCta: "Second button",
  button: "Button",
  href: "Link to",
  label: "Label",
  url: "Image address",
  alt: "Alt text",
  ogImage: "Social share image",
  colorLogo: "Colour logo (shown on hover)",
  logo: "Logo",
  publicId: "Cloudinary ID",
  noteLink: "Note link",
  k: "Label",
  v: "Headline",
  b: "Detail",
  q: "Question",
  a: "Answer",
  n: "Number",
  at: "Star position (across %, down %)",
  glance: "At a glance",
  glanceTitle: "At a glance title",
  headingPrefix: "Heading start",
  pillLabel: "Pill label",
  priceSuffix: "After the price",
  admit: "Ticket top line",
  afterIntroducing: "After “Introducing Ascend”",
  afterTuesdays: "After “Your Tuesdays”",
  afterCountries: "After “Countries”",
  afterValues: "After “Our values”",
  you: "“You” piece",
  sphereLabel: "Centre label",
  sphereTime: "Centre time",
  sphereNote: "Centre note",
  ticketLabel: "Ticket label",
  meta: "Detail line",
  highlight: "Highlight this stage",
  details: "What it covers",
};

const LONG_TEXT = new Set([
  "body", "text", "quote", "lede", "note", "details", "a", "b", "callout", "description", "cardText", "footnote",
]);

function humanise(key: string) {
  if (LABELS[key]) return LABELS[key];
  const words = key.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

const pathKey = (p: Path) => p.join(".");

function readablePath(p: string) {
  return p
    .split(".")
    .map((part) => (/^\d+$/.test(part) ? `Item ${Number(part) + 1}` : humanise(part)))
    .join(" / ");
}

/* ---------- Schema helpers ---------- */

const isImage = (s: JsonSchema) => Boolean(s.properties?.url && s.properties?.width && s.properties?.alt);
const isLink = (s: JsonSchema) =>
  Boolean(s.properties && Object.keys(s.properties).length === 2 && s.properties.label && s.properties.href);

function emptyFor(s: JsonSchema): unknown {
  if (s.enum) return s.enum[0];
  switch (s.type) {
    case "string":
      return "";
    case "number":
    case "integer":
      return s.exclusiveMinimum !== undefined ? s.exclusiveMinimum + 1 : (s.minimum ?? 0);
    case "boolean":
      return false;
    case "array":
      if (s.prefixItems) return s.prefixItems.map(emptyFor);
      return Array.from({ length: s.minItems ?? 0 }, () => (s.items ? emptyFor(s.items) : ""));
    case "object": {
      const out: Record<string, unknown> = {};
      for (const k of s.required ?? []) out[k] = emptyFor(s.properties![k]);
      return out;
    }
    default:
      return "";
  }
}

/** A short name for a list item, from its most telling field. */
function summary(v: unknown): string {
  if (typeof v === "string") return v;
  if (v && typeof v === "object") {
    const o = v as Record<string, unknown>;
    for (const k of ["title", "name", "label", "q", "k", "heading", "quote", "slug", "day", "value"]) {
      if (typeof o[k] === "string" && o[k]) return o[k] as string;
    }
  }
  return "";
}

const hasErrorWithin = (errors: Errors, p: Path) => {
  const k = pathKey(p);
  return Object.keys(errors).some((e) => e === k || e.startsWith(k + "."));
};

/** Top-level groups are headed parts of the form; deeper ones indent. */
const groupClass = (path: Path) => (path.length <= 1 ? styles.groupTop : styles.groupNested);

/* ---------- Fields ---------- */

type FieldProps = {
  name: string;
  schema: JsonSchema;
  value: unknown;
  onChange: (v: unknown) => void;
  path: Path;
  ctx: Ctx;
};

function FieldError({ path, ctx }: { path: Path; ctx: Ctx }) {
  const msg = ctx.errors[pathKey(path)];
  return msg ? <p className={styles.fieldError}>{msg}</p> : null;
}

const groupId = (path: Path) => `g-${pathKey(path) || "root"}`;

/** A labelled group (role="group" rather than fieldset, which can't be laid out cleanly). */
function Group({ path, children }: { path: Path; children: React.ReactNode }) {
  return (
    <div role="group" aria-labelledby={groupId(path)} className={groupClass(path)}>
      {children}
    </div>
  );
}

function GroupHead({
  path,
  name,
  count,
  description,
}: {
  path: Path;
  name: string;
  count?: number;
  description?: string;
}) {
  return (
    <>
      <p id={groupId(path)} className={styles.legend}>
        {humanise(name)}
        {count !== undefined && <span className={styles.count}>{count}</span>}
      </p>
      {description && <p className={styles.hint}>{description}</p>}
    </>
  );
}

function Field(props: FieldProps) {
  const { schema: s } = props;
  if (s.enum) return <EnumField {...props} />;
  if (s.type === "object" && isImage(s)) return <ImageField {...props} />;
  if (s.type === "object" && isLink(s)) return <LinkField {...props} />;
  if (s.type === "object") return <ObjectField {...props} />;
  if (s.type === "array" && s.prefixItems) return <TupleField {...props} />;
  if (s.type === "array") return <ArrayField {...props} />;
  if (s.type === "boolean") return <BoolField {...props} />;
  if (s.type === "number" || s.type === "integer") return <NumberField {...props} />;
  return <TextField {...props} />;
}

function TextField({ name, value, onChange, path, ctx, schema }: FieldProps) {
  const text = typeof value === "string" ? value : "";
  const long = LONG_TEXT.has(name) || text.length > 90;
  const id = pathKey(path);
  const invalid = Boolean(ctx.errors[id]);
  return (
    <div className={styles.field}>
      {name && (
        <label className={styles.label} htmlFor={id}>
          {humanise(name)}
        </label>
      )}
      {schema.description && <p className={styles.hint}>{schema.description}</p>}
      {long ? (
        <textarea
          id={id}
          aria-label={name ? undefined : "Text"}
          aria-invalid={invalid || undefined}
          className={styles.textarea}
          value={text}
          rows={Math.min(10, Math.max(3, Math.ceil(text.length / 80)))}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          id={id}
          aria-label={name ? undefined : "Text"}
          aria-invalid={invalid || undefined}
          className={styles.input}
          value={text}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {long && (
        <p className={styles.formatHint}>
          Formatting: <code>**bold**</code> <code>*italic*</code> <code>[text](https://…)</code>
        </p>
      )}
      <FieldError path={path} ctx={ctx} />
    </div>
  );
}

function NumberField({ name, value, onChange, path, ctx, schema }: FieldProps) {
  const id = pathKey(path);
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {humanise(name)}
      </label>
      <input
        id={id}
        className={`${styles.input} ${styles.inputNarrow}`}
        type="number"
        step={schema.type === "integer" ? 1 : "any"}
        min={schema.minimum}
        max={schema.maximum !== undefined && schema.maximum < 1e9 ? schema.maximum : undefined}
        value={typeof value === "number" ? value : ""}
        onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
      />
      <FieldError path={path} ctx={ctx} />
    </div>
  );
}

function BoolField({ name, value, onChange, path, ctx }: FieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.switchRow}>
        <input
          type="checkbox"
          role="switch"
          className={styles.switch}
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span>{humanise(name)}</span>
      </label>
      <FieldError path={path} ctx={ctx} />
    </div>
  );
}

function EnumField({ name, value, onChange, path, ctx, schema }: FieldProps) {
  const id = pathKey(path);
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {humanise(name)}
      </label>
      <select
        id={id}
        className={`${styles.input} ${styles.select}`}
        value={String(value)}
        onChange={(e) => onChange(e.target.value)}
      >
        {schema.enum!.map((o) => (
          <option key={o} value={o}>
            {humanise(o)}
          </option>
        ))}
      </select>
      <FieldError path={path} ctx={ctx} />
    </div>
  );
}

function LinkField({ name, value, onChange, path, ctx }: FieldProps) {
  const v = (value ?? {}) as { label?: string; href?: string };
  return (
    <Group path={path}>
      <GroupHead path={path} name={name} />
      <div className={styles.row2}>
        <label className={styles.field}>
          <span className={styles.label}>Text</span>
          <input className={styles.input} value={v.label ?? ""} onChange={(e) => onChange({ ...v, label: e.target.value })} />
          <FieldError path={[...path, "label"]} ctx={ctx} />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Link to</span>
          <input
            className={styles.input}
            value={v.href ?? ""}
            placeholder="#section, /page or https://…"
            onChange={(e) => onChange({ ...v, href: e.target.value })}
          />
          <FieldError path={[...path, "href"]} ctx={ctx} />
        </label>
      </div>
    </Group>
  );
}

function TupleField({ name, value, onChange, path, ctx, schema }: FieldProps) {
  const v = Array.isArray(value) ? value : [];
  return (
    <div className={styles.field}>
      <span className={styles.label}>{humanise(name)}</span>
      <div className={styles.inline}>
        {schema.prefixItems!.map((s, i) => (
          <input
            key={i}
            aria-label={`${humanise(name)} ${i + 1}`}
            className={`${styles.input} ${styles.inputNarrow}`}
            type="number"
            min={s.minimum}
            max={s.maximum}
            value={typeof v[i] === "number" ? v[i] : ""}
            onChange={(e) => {
              const next = [...v];
              next[i] = e.target.value === "" ? 0 : Number(e.target.value);
              onChange(next);
            }}
          />
        ))}
      </div>
      <FieldError path={path} ctx={ctx} />
    </div>
  );
}

function ObjectField({ name, value, onChange, path, ctx, schema }: FieldProps) {
  const v = (value ?? {}) as Record<string, unknown>;
  const body = (
    <>
      {Object.entries(schema.properties ?? {}).map(([k, s]) => {
        const optional = !(schema.required ?? []).includes(k);
        const set = (nv: unknown) => onChange({ ...v, [k]: nv });
        if (optional && v[k] === undefined) {
          return (
            <button key={k} type="button" className={styles.addButton} onClick={() => set(emptyFor(s))}>
              <Plus /> Add {humanise(k).toLowerCase()}
            </button>
          );
        }
        return (
          <div key={k} className={optional ? styles.optional : styles.slot}>
            <Field name={k} schema={s} value={v[k]} onChange={set} path={[...path, k]} ctx={ctx} />
            {optional && (
              <button
                type="button"
                className={styles.quietButton}
                onClick={() => {
                  const next = { ...v };
                  delete next[k];
                  onChange(next);
                }}
              >
                Remove {humanise(k).toLowerCase()}
              </button>
            )}
          </div>
        );
      })}
      <FieldError path={path} ctx={ctx} />
    </>
  );
  // The section itself and list items have no frame of their own.
  if (name === "") return body;
  return (
    <Group path={path}>
      <GroupHead path={path} name={name} description={schema.description} />
      {body}
    </Group>
  );
}

let nextId = 1;

function ArrayField({ name, value, onChange, path, ctx, schema }: FieldProps) {
  const list = useMemo(() => (Array.isArray(value) ? value : []), [value]);
  const item = schema.items || { type: "string" };
  const fixed = schema.minItems !== undefined && schema.minItems === schema.maxItems;
  const canAdd = !fixed && (schema.maxItems === undefined || list.length < schema.maxItems);
  const canRemove = !fixed && list.length > (schema.minItems ?? 0);

  // Stable keys so open/closed state follows an item when it moves. Only this
  // field changes the list's length (reset/discard remount the whole form).
  const [ids, setIds] = useState(() => list.map(() => nextId++));
  const keyFor = (i: number) => (ids.length === list.length ? ids[i] : `i${i}`);

  const update = (next: unknown[], nextIds: number[]) => {
    setIds(nextIds);
    onChange(next);
  };
  const move = (i: number, d: -1 | 1) => {
    const j = i + d;
    const next = [...list];
    const nid = [...ids];
    [next[i], next[j]] = [next[j], next[i]];
    [nid[i], nid[j]] = [nid[j], nid[i]];
    update(next, nid);
  };
  const remove = (i: number) => update(list.filter((_, k) => k !== i), ids.filter((_, k) => k !== i));
  const add = () => update([...list, emptyFor(item)], [...ids, nextId++]);

  const simple = item.type === "string" && !item.enum;
  const description = [schema.description, fixed ? `The design needs exactly ${schema.minItems}, so items can be edited but not added or removed.` : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <Group path={path}>
      <GroupHead path={path} name={name} count={list.length} description={description || undefined} />

      <ol className={styles.list}>
        {list.map((v, i) => {
          const controls = (
            <span className={styles.itemControls}>
              <button type="button" aria-label={`Move item ${i + 1} up`} disabled={i === 0} onClick={() => move(i, -1)}>
                <ArrowUp />
              </button>
              <button
                type="button"
                aria-label={`Move item ${i + 1} down`}
                disabled={i === list.length - 1}
                onClick={() => move(i, 1)}
              >
                <ArrowDown />
              </button>
              {canRemove && (
                <button type="button" aria-label={`Remove item ${i + 1}`} className={styles.remove} onClick={() => remove(i)}>
                  <Close />
                </button>
              )}
            </span>
          );
          const set = (nv: unknown) => {
            const next = [...list];
            next[i] = nv;
            onChange(next);
          };
          if (simple) {
            return (
              <li key={keyFor(i)} className={styles.lineItem}>
                <span className={styles.index}>{i + 1}</span>
                <div className={styles.lineInput}>
                  <Field name="" schema={item} value={v} onChange={set} path={[...path, i]} ctx={ctx} />
                </div>
                {controls}
              </li>
            );
          }
          return (
            <Item
              key={keyFor(i)}
              index={i + 1}
              title={summary(v) || "Untitled"}
              controls={controls}
              startOpen={list.length === 1 || hasErrorWithin(ctx.errors, [...path, i])}
              forceOpen={hasErrorWithin(ctx.errors, [...path, i])}
            >
              <Field name="" schema={item} value={v} onChange={set} path={[...path, i]} ctx={ctx} />
            </Item>
          );
        })}
      </ol>
      {canAdd && (
        <button type="button" className={styles.addButton} onClick={add}>
          <Plus /> Add {simple ? "line" : "item"}
        </button>
      )}
      <FieldError path={path} ctx={ctx} />
    </Group>
  );
}

function Item({
  index,
  title,
  controls,
  startOpen,
  forceOpen,
  children,
}: {
  index: number;
  title: string;
  controls: React.ReactNode;
  startOpen: boolean;
  forceOpen: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(startOpen);
  const shown = open || forceOpen;
  return (
    <li className={styles.item} data-open={shown || undefined} data-error={forceOpen || undefined}>
      <div className={styles.itemHead}>
        <button type="button" className={styles.itemToggle} aria-expanded={shown} onClick={() => setOpen(!shown)}>
          <span className={styles.index}>{index}</span>
          <span className={styles.itemTitle}>{title}</span>
          {shown ? <ChevronDown className={styles.chevron} /> : <ChevronRight className={styles.chevron} />}
        </button>
        {controls}
      </div>
      {shown && <div className={styles.itemBody}>{children}</div>}
    </li>
  );
}

/* ---------- Images ---------- */

type Img = { url: string; alt: string; width: number; height: number; publicId?: string };

function ImageField({ name, value, onChange, path, ctx }: FieldProps) {
  const v = (value ?? { url: "", alt: "", width: 1, height: 1 }) as Img;
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState<string>();
  const measureNext = useRef(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setBusy(true);
    setProblem(undefined);
    try {
      const sig = await getUploadSignature();
      const form = new FormData();
      form.append("file", file);
      form.append("api_key", String(sig.apiKey));
      form.append("timestamp", String(sig.timestamp));
      form.append("signature", String(sig.signature));
      form.append("folder", String(sig.folder));
      const res = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`, {
        method: "POST",
        body: form,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error?.message ?? "Upload failed");
      onChange({ ...v, url: json.secure_url, publicId: json.public_id, width: json.width, height: json.height });
    } catch (err) {
      setProblem(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const errors = Object.entries(ctx.errors).filter(
    ([k]) => k === pathKey(path) || k.startsWith(pathKey(path) + "."),
  );

  return (
    <Group path={path}>
      <GroupHead path={path} name={name || "Image"} />
      <div className={styles.image}>
        <div className={styles.preview} data-empty={!v.url || undefined}>
          {v.url ? (
            // eslint-disable-next-line @next/next/no-img-element -- admin preview of any source
            <img
              src={v.url}
              alt=""
              onLoad={(e) => {
                if (!measureNext.current) return;
                measureNext.current = false;
                const el = e.currentTarget;
                if (el.naturalWidth && el.naturalHeight) {
                  onChange({ ...v, width: el.naturalWidth, height: el.naturalHeight });
                }
              }}
            />
          ) : (
            <span>No image</span>
          )}
        </div>
        <div className={styles.imageFields}>
          <div className={styles.imageMeta}>
            <span className={styles.dimensions}>
              {v.width} × {v.height}
            </span>
            {ctx.cloudinary ? (
              <>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
                />
                <button type="button" className={styles.secondary} disabled={busy} onClick={() => fileRef.current?.click()}>
                  <Upload /> {busy ? "Uploading…" : v.url ? "Replace" : "Upload"}
                </button>
              </>
            ) : (
              <span className={styles.hint}>Uploads turn on once Cloudinary is connected.</span>
            )}
          </div>
          {problem && <p className={styles.fieldError}>{problem}</p>}
          <label className={styles.field}>
            <span className={styles.label}>Alt text</span>
            <input
              className={styles.input}
              value={v.alt}
              placeholder="What the image shows, for screen readers"
              onChange={(e) => onChange({ ...v, alt: e.target.value })}
            />
          </label>
          <details className={styles.advanced}>
            <summary>Address and size</summary>
            <div className={styles.advancedBody}>
              <label className={styles.field}>
                <span className={styles.label}>Address</span>
                <input
                  className={styles.input}
                  value={v.url}
                  placeholder="https://res.cloudinary.com/… or /file-in-public.png"
                  onChange={(e) => {
                    measureNext.current = true;
                    const next = { ...v, url: e.target.value };
                    delete next.publicId;
                    onChange(next);
                  }}
                />
              </label>
              <div className={styles.inline}>
                <label className={styles.field}>
                  <span className={styles.label}>Width</span>
                  <input
                    className={`${styles.input} ${styles.inputNarrow}`}
                    type="number"
                    min={1}
                    value={v.width}
                    onChange={(e) => onChange({ ...v, width: Number(e.target.value) || 1 })}
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>Height</span>
                  <input
                    className={`${styles.input} ${styles.inputNarrow}`}
                    type="number"
                    min={1}
                    value={v.height}
                    onChange={(e) => onChange({ ...v, height: Number(e.target.value) || 1 })}
                  />
                </label>
              </div>
            </div>
          </details>
          {errors.map(([k, m]) => (
            <p key={k} className={styles.fieldError}>
              {m}
            </p>
          ))}
        </div>
      </div>
    </Group>
  );
}

/* ---------- The editor ---------- */

type Props = {
  sectionKey: string;
  schema: JsonSchema;
  initialValue: unknown;
  /** Whether a saved (non-default) version exists. */
  isCustomised: boolean;
  cloudinary: boolean;
};

export function SectionEditor({ sectionKey, schema, initialValue, isCustomised, cloudinary }: Props) {
  const [value, setValue] = useState(initialValue);
  const [saved, setSaved] = useState(() => JSON.stringify(initialValue));
  const [customised, setCustomised] = useState(isCustomised);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string }>();
  const [pending, start] = useTransition();
  // Bumped on reset/discard so list keys and open states start fresh.
  const [version, setVersion] = useState(0);

  const dirty = JSON.stringify(value) !== saved;

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const save = () =>
    start(async () => {
      setStatus(undefined);
      const result = await saveSectionAction(sectionKey, value);
      if (result.ok) {
        setErrors({});
        setSaved(JSON.stringify(value));
        setCustomised(true);
        setStatus({ kind: "ok", text: "Saved and live on the site." });
      } else if ("issues" in result) {
        setErrors(Object.fromEntries(result.issues.map((i) => [i.path, i.message])));
        setStatus({ kind: "error", text: "Nothing was saved. Fix the fields marked in red." });
      } else {
        setStatus({ kind: "error", text: result.error });
      }
    });

  const reset = () => {
    if (!confirm("Restore the original content for this section? Your saved version will be replaced.")) return;
    start(async () => {
      const def = await resetSectionAction(sectionKey);
      setValue(def);
      setSaved(JSON.stringify(def));
      setCustomised(false);
      setErrors({});
      setVersion((n) => n + 1);
      setStatus({ kind: "ok", text: "Original content restored and live on the site." });
    });
  };

  const discard = () => {
    setValue(JSON.parse(saved));
    setErrors({});
    setStatus(undefined);
    setVersion((n) => n + 1);
  };

  const errorList = Object.entries(errors);
  const state = pending
    ? "saving"
    : dirty
      ? "dirty"
      : status?.kind === "error"
        ? "error"
        : status?.kind === "ok"
          ? "saved"
          : "clean";
  const stateText = pending
    ? "Saving…"
    : dirty
      ? "Unsaved changes"
      : (status?.text ?? (customised ? "Edited version is live" : "Showing the original content"));

  return (
    <div className={styles.editor}>
      {errorList.length > 0 && (
        <div className={styles.errorSummary} role="alert">
          <p>Fix these before saving:</p>
          <ul>
            {errorList.map(([p, m]) => (
              <li key={p}>
                {p && <strong>{readablePath(p)}:</strong>} {m}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div key={version} className={styles.formBody}>
        <ObjectField name="" schema={schema} value={value} onChange={setValue} path={[]} ctx={{ errors, cloudinary }} />
      </div>

      <div className={styles.saveBar} data-state={state}>
        <span className={styles.saveState} role="status">
          <span className={styles.stateDot} aria-hidden="true" />
          {stateText}
        </span>
        <span className={styles.saveActions}>
          {customised && !dirty && (
            <button type="button" className={styles.quietButton} disabled={pending} onClick={reset}>
              Restore original
            </button>
          )}
          {dirty && (
            <button type="button" className={styles.secondary} disabled={pending} onClick={discard}>
              Discard
            </button>
          )}
          <button type="button" className={styles.primary} disabled={!dirty || pending} onClick={save}>
            Save changes
          </button>
        </span>
      </div>
    </div>
  );
}
