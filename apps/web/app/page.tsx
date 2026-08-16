import {
  Video,
  Clapperboard,
  Image as ImageIcon,
  MonitorSmartphone,
  Code2,
  Layers,
  Clock3,
  LayoutTemplate,
  Cloud,
  Save,
  Command,
  Ratio,
  Smartphone,
  Palette,
  Library,
  Users,
  Download,
  Mic,
  Scissors,
  Split,
  Captions,
  Wand2,
  AudioLines,
  Gauge,
  ArrowRight,
  ArrowDown,
} from "lucide-react";
import type { ReactNode } from "react";
import { SiteNav, SiteFooter } from "@repo/ui/sitechrome";
import {
  StudioMock,
  RecordMock,
  VideoMock,
  ImageMock,
  DeviceMock,
  CodeMock,
  Chrome,
  Pill,
} from "@repo/ui/mocks";
import Link from "next/link";

/* ---------- helpers ---------- */

function Section({
  id,
  eyebrow,
  title,
  copy,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  copy?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={className}>
      <div className="mx-auto max-w-[1180px] px-5 py-16 md:py-20">
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-2 max-w-[720px] text-[26px] font-semibold leading-tight tracking-tight md:text-[34px]">
          {title}
        </h2>
        {copy && (
          <p className="mt-3 max-w-[600px] text-[14px] leading-relaxed text-muted-foreground">
            {copy}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

function Callout({
  icon: Icon,
  label,
  className,
}: {
  icon: typeof Scissors;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cnJoin(
        "pointer-events-none absolute z-10 flex items-center gap-1.5 rounded-md border border-border-strong bg-background/85 px-2 py-1 text-[11px] backdrop-blur",
        className,
      )}
    >
      <Icon className="size-3 text-primary" strokeWidth={2} />
      {label}
    </span>
  );
}

function cnJoin(...c: (string | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

/* ---------- data ---------- */

const creationCards = [
  {
    to: "/app/record",
    icon: Video,
    title: "Record",
    desc: "Record podcasts, interviews, tutorials, and meetings.",
    visual: <RecordMock />,
  },
  {
    to: "/app/video",
    icon: Clapperboard,
    title: "Video",
    desc: "Edit recordings into polished videos.",
    visual: <VideoMock />,
  },
  {
    to: "/app/image",
    icon: ImageIcon,
    title: "Image",
    desc: "Create graphics, thumbnails, and social content.",
    visual: <ImageMock />,
  },
  {
    to: "/app/screenshots",
    icon: MonitorSmartphone,
    title: "Screenshot",
    desc: "Turn screenshots into polished product visuals.",
    visual: <DeviceMock />,
  },
  {
    to: "/app/code",
    icon: Code2,
    title: "Code",
    desc: "Turn code into publish-ready visuals.",
    visual: <CodeMock preset="X" />,
  },
] as const;

const flow = [
  { step: "Capture", note: "Multi-track recording", visual: <RecordMock compact /> },
  { step: "Edit", note: "Timeline & captions", visual: <VideoMock /> },
  { step: "Design", note: "Canvas composition", visual: <ImageMock /> },
  { step: "Resize", note: "Social presets", visual: <DeviceMock frame="1080 × 1350" /> },
  { step: "Export", note: "Publish-ready", visual: <CodeMock /> },
];

const presets = [
  { name: "X", dims: "1600 × 900", ratio: "16 / 9" },
  { name: "LinkedIn", dims: "1200 × 1200", ratio: "1 / 1" },
  { name: "Instagram Post", dims: "1080 × 1350", ratio: "4 / 5" },
  { name: "Instagram Story", dims: "1080 × 1920", ratio: "9 / 16" },
  { name: "Instagram Reel", dims: "1080 × 1920", ratio: "9 / 16" },
  { name: "YouTube Thumbnail", dims: "1280 × 720", ratio: "16 / 9" },
];

const templateCats = [
  { cat: "Social", bg: "linear-gradient(150deg,#26201a,#0f1216)", ratio: "4 / 5" },
  { cat: "Video", bg: "linear-gradient(150deg,#16202b,#0c1013)", ratio: "16 / 9" },
  { cat: "Code", bg: "linear-gradient(150deg,#1d1409,#101418)", ratio: "16 / 9" },
  { cat: "Product", bg: "linear-gradient(150deg,#12211d,#0d1211)", ratio: "4 / 3" },
  { cat: "Presentation", bg: "linear-gradient(150deg,#1a1a24,#0e0f14)", ratio: "16 / 9" },
  { cat: "Thumbnail", bg: "linear-gradient(150deg,#2a160f,#120d0b)", ratio: "16 / 9" },
  { cat: "Device Mockup", bg: "linear-gradient(150deg,#101c22,#0b0f12)", ratio: "4 / 3" },
];

const features = [
  { icon: Wand2, title: "Non-destructive editing", desc: "Every change stays reversible." },
  { icon: Layers, title: "Layers", desc: "Group, mask, lock and reorder." },
  { icon: Clock3, title: "Timeline", desc: "Frame-accurate multi-track." },
  { icon: LayoutTemplate, title: "Templates", desc: "Start from finished designs." },
  { icon: Cloud, title: "Cloud projects", desc: "Open your work anywhere." },
  { icon: Save, title: "Auto-save", desc: "Versioned every few seconds." },
  { icon: Command, title: "Keyboard shortcuts", desc: "Command palette for all." },
  { icon: Ratio, title: "Social presets", desc: "Every platform dimension." },
  { icon: Smartphone, title: "Device mockups", desc: "Browser, Mac, iOS, Android." },
  { icon: Palette, title: "Code themes", desc: "Tuned syntax palettes." },
  { icon: Library, title: "Media library", desc: "Reusable shared assets." },
  { icon: Users, title: "Collaboration", desc: "Comments and shared edits." },
  { icon: Download, title: "Export", desc: "MP4, PNG, WebP, SVG." },
  { icon: Mic, title: "Recording", desc: "Local-quality multi-track." },
];

/* ---------- page ---------- */

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="grid-canvas pointer-events-none absolute inset-0 opacity-60" />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 0%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[1180px] px-5 pb-16 pt-14 md:pt-20">
          <div className="mx-auto max-w-[760px] text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11.5px] text-muted-foreground">
              <span className="rec-dot size-1.5 rounded-full bg-primary" />
              One workspace for creating everything
            </span>
            <h1 className="mt-5 text-[34px] font-semibold leading-[1.08] tracking-tight md:text-[54px]">
              Create. Edit. Share.
              <br className="hidden sm:block" /> All in one place.
            </h1>
            <p className="mx-auto mt-4 max-w-[620px] text-[14.5px] leading-relaxed text-muted-foreground">
              Record videos, edit media, design visuals, create beautiful screenshots,
              and turn code into publish-ready content — without jumping between five
              different tools.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              <Link
                href="/app"
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-[13.5px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Start creating <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href="/app/video"
                className="rounded-md border border-border-strong bg-surface px-4 py-2 text-[13.5px] font-medium transition-colors hover:bg-surface-2"
              >
                Explore the studio
              </Link>
            </div>
          </div>

          <div className="relative mt-12">
            <StudioMock />
            <Callout icon={Layers} label="Layers" className="-left-8 top-28 hidden xl:flex" />
            <Callout
              icon={Ratio}
              label="Social presets"
              className="-right-9 top-44 hidden xl:flex"
            />
          </div>
        </div>
      </section>

      {/* PRODUCT PROMISE */}
      <Section
        id="product"
        eyebrow="The workflow"
        title="One creative workspace. Every format."
      >
        <div className="mt-8 grid gap-2 sm:grid-cols-5">
          {["Record", "Edit", "Design", "Polish", "Publish"].map((s, i) => (
            <div
              key={s}
              className="relative flex items-center gap-3 rounded-lg border border-border bg-surface p-3"
            >
              <span className="num grid size-7 shrink-0 place-items-center rounded-md bg-surface-3 text-[11px]">
                0{i + 1}
              </span>
              <span className="text-[13px] font-medium">{s}</span>
              {i < 4 && (
                <ArrowRight className="absolute -right-[13px] top-1/2 z-10 hidden size-3.5 -translate-y-1/2 text-muted-foreground sm:block" />
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* CREATION TYPES */}
      <Section
        title="Whatever you're creating, start here."
        copy="Five studios, one file format, one asset library, one export pipeline."
        className="border-y border-border bg-surface/30"
      >
        <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {creationCards.map((c, i) => (
            <Link
              key={c.title}
              href={c.to}
              className={cnJoin(
                "group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-border-strong",
                i === 0 ? "lg:col-span-2" : "",
              )}
            >
              <div className="h-[188px] border-b border-border bg-canvas p-3">
                {c.visual}
              </div>
              <div className="flex items-start gap-3 p-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-md bg-surface-3 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <c.icon className="size-4" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-[14px] font-medium">{c.title}</p>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-muted-foreground">
                    {c.desc}
                  </p>
                </div>
                <ArrowRight className="ml-auto size-3.5 shrink-0 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* RAW TO READY */}
      <Section
        title="From raw material to publish-ready."
        copy="Your content never leaves the workspace. Each step hands off to the next."
      >
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {flow.map((f, i) => (
            <div key={f.step} className="relative">
              <div className="h-[132px] rounded-lg border border-border bg-surface p-2">
                {f.visual}
              </div>
              <p className="mt-2 text-[12.5px] font-medium">{f.step}</p>
              <p className="text-[11.5px] text-muted-foreground">{f.note}</p>
              {i < flow.length - 1 && (
                <ArrowRight className="absolute -right-[11px] top-[60px] hidden size-3.5 text-muted-foreground lg:block" />
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* VIDEO EDITOR */}
      <Section
        title="Your recordings are just the beginning."
        copy="Turn raw recordings into polished content with a timeline built for fast editing."
        className="border-y border-border bg-surface/30"
      >
        <div className="relative mt-8 overflow-hidden rounded-xl border border-border-strong bg-surface shadow-artboard">
          <div className="flex h-9 items-center gap-2 border-b border-border bg-surface-2 px-3 text-[11.5px]">
            <span className="font-medium">Podcast ep. 41 — cut 3</span>
            <Pill>Auto-saved</Pill>
            <span className="ml-auto flex gap-1.5">
              <Pill>Share</Pill>
              <Pill active>Export</Pill>
            </span>
          </div>
          <div className="grid lg:grid-cols-[160px_minmax(0,1fr)_180px]">
            <div className="hidden flex-col gap-1.5 border-r border-border p-2.5 lg:flex">
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
                Media library
              </p>
              {["cam_shiv.mp4", "cam_ana.mp4", "screen.mp4", "intro.wav", "logo.png"].map(
                (m) => (
                  <div
                    key={m}
                    className="flex items-center gap-2 rounded border border-border bg-surface-2 p-1.5"
                  >
                    <span className="h-6 w-9 shrink-0 rounded-sm bg-canvas" />
                    <span className="num truncate text-[10px] text-muted-foreground">
                      {m}
                    </span>
                  </div>
                ),
              )}
            </div>
            <div className="relative bg-canvas p-5">
              <div className="dot-canvas absolute inset-0 opacity-40" />
              <div
                className="relative mx-auto aspect-video max-w-[520px] overflow-hidden rounded-lg border border-border-strong shadow-artboard"
                style={{
                  background: "linear-gradient(140deg,#1a2530,#0c1013 60%,#241a10)",
                }}
              >
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded bg-background/70 px-2 py-1 text-[11px] backdrop-blur">
                  “…and that's the whole workflow.”
                </span>
              </div>
              <div className="num relative mt-3 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
                <Pill>⏮</Pill>
                <Pill active>▶</Pill>
                <Pill>⏭</Pill>
                <span>00:41:12 / 01:04:38</span>
              </div>
              <Callout icon={Captions} label="Captions" className="left-4 top-4" />
              <Callout icon={Gauge} label="Speed 1.25×" className="right-4 top-4" />
            </div>
            <div className="hidden flex-col gap-2.5 border-l border-border p-2.5 lg:flex">
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
                Properties
              </p>
              {[
                ["Clip", "cam_shiv · 00:12"],
                ["Volume", "-4.0 dB"],
                ["Speed", "1.25×"],
                ["Transition", "Cross dissolve"],
                ["Transform", "Scale 104%"],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-[10px] text-muted-foreground">{k}</p>
                  <p className="num mt-1 truncate rounded border border-border bg-surface-2 px-1.5 py-1 text-[10.5px]">
                    {v}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative border-t border-border bg-surface-2 p-3">
            <div className="num mb-2 flex justify-between text-[9px] text-muted-foreground">
              {["00:00", "00:15", "00:30", "00:45", "01:00"].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <div className="relative space-y-1.5">
              <span className="absolute -top-1 bottom-0 left-[38%] z-10 w-px bg-primary">
                <span className="absolute -left-[3px] -top-1 size-[7px] rotate-45 bg-primary" />
              </span>
              {[
                ["V1", ["bg-track-video/80 flex-[3]", "bg-track-video/50 flex-[2]", "bg-track-video/70 flex-[4]"]],
                ["A1", ["bg-track-audio/70 flex-[5]", "bg-track-audio/40 flex-[4]"]],
                ["T1", ["bg-surface-3 flex-1", "bg-track-text/70 flex-[2]", "bg-surface-3 flex-[3]"]],
              ].map(([label, clips]) => (
                <div key={label as string} className="flex items-center gap-2">
                  <span className="num w-5 shrink-0 text-[9px] text-muted-foreground">
                    {label as string}
                  </span>
                  <div className="flex min-w-0 flex-1 gap-1">
                    {(clips as string[]).map((c, i) => (
                      <span key={i} className={cnJoin("h-5 rounded-sm", c)} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Callout icon={Scissors} label="Trim" className="-top-3 left-24" />
            <Callout icon={Split} label="Split" className="-top-3 left-52 hidden sm:flex" />
            <Callout
              icon={AudioLines}
              label="Audio"
              className="-top-3 right-6 hidden sm:flex"
            />
          </div>
        </div>
      </Section>

      {/* CODE SCREENSHOTS */}
      <Section
        title="Make code worth sharing."
        copy="Turn raw code into polished visuals designed for the platform you're posting to."
      >
        <div className="mt-8 grid gap-3 lg:grid-cols-[1fr_1.35fr]">
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
              Raw code
            </p>
            <pre className="num mt-2 overflow-hidden rounded-md border border-border bg-canvas p-3 text-[11px] leading-[1.8] text-muted-foreground">
              <code>{`export function useSearch(q) {
  const d = useDeferredValue(q)
  return useMemo(() => filter(d), [d])
}`}</code>
            </pre>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                ["Language", "TypeScript"],
                ["Theme", "Aakar Dark"],
                ["Font", "JetBrains Mono 13"],
                ["Line numbers", "On"],
                ["Window", "macOS"],
                ["Padding", "64 px"],
                ["Radius", "12 px"],
                ["Shadow", "Artboard"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-md border border-border bg-surface-2 p-2">
                  <p className="text-[10px] text-muted-foreground">{k}</p>
                  <p className="num mt-0.5 truncate text-[11px]">{v}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl border border-border bg-surface p-4">
            <div
              className="grid place-items-center rounded-lg p-6"
              style={{ background: "linear-gradient(140deg,#2a1c10,#0f1216 55%,#101c22)" }}
            >
              <Chrome
                title="useSearch.ts"
                className="w-full max-w-[440px] bg-[#0d1117] shadow-artboard"
                right={<Pill>TS</Pill>}
              >
                <pre className="num p-4 text-[11.5px] leading-[1.85] text-[#c9d1d9]">
                  <code>
                    <span className="text-muted-foreground">1  </span>
                    <span className="text-[#ff7b72]">export function</span>{" "}
                    <span className="text-[#d2a8ff]">useSearch</span>(q) {"{"}
                    {"\n"}
                    <span className="text-muted-foreground">2  </span>
                    <span className="text-[#ff7b72]">  const</span> d ={" "}
                    <span className="text-[#d2a8ff]">useDeferredValue</span>(q)
                    {"\n"}
                    <span className="text-muted-foreground">3  </span>
                    <span className="text-[#ff7b72]">  return</span>{" "}
                    <span className="text-[#d2a8ff]">useMemo</span>(() ={">"}{" "}
                    <span className="text-[#d2a8ff]">filter</span>(d), [d])
                    {"\n"}
                    <span className="text-muted-foreground">4  </span>
                    {"}"}
                  </code>
                </pre>
              </Chrome>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-muted-foreground">Export as</span>
              {["X", "LinkedIn", "Instagram", "YouTube"].map((p, i) => (
                <Pill key={p} active={i === 0}>
                  {p}
                </Pill>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* SCREENSHOT MOCKUPS */}
      <Section
        title="Your product deserves a better frame."
        copy="Drop a screenshot in, pick a frame, and tune perspective, shadow and background."
        className="border-y border-border bg-surface/30"
      >
        <div className="mt-8 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
          <div
            className="relative grid place-items-center overflow-hidden rounded-xl border border-border p-8"
            style={{ background: "linear-gradient(150deg,#26200f,#0f1418 50%,#122029)" }}
          >
            <div className="w-full max-w-[460px] [transform:perspective(1200px)_rotateY(-9deg)_rotateX(4deg)]">
              <Chrome title="app.aakar.studio" className="shadow-artboard">
                <div className="relative aspect-video bg-canvas">
                  <div className="grid-canvas absolute inset-0 opacity-70" />
                  <div className="absolute inset-4 grid grid-cols-3 gap-2">
                    <span className="rounded bg-surface-2" />
                    <span className="col-span-2 rounded bg-surface" />
                    <span className="col-span-3 rounded bg-surface-2/60" />
                  </div>
                </div>
              </Chrome>
            </div>
            <Callout icon={MonitorSmartphone} label="Perspective 9°" className="left-4 top-4" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["Browser", "Mac window", "iPhone", "Android", "Tablet", "Desktop"].map(
              (f, i) => (
                <div
                  key={f}
                  className="rounded-lg border border-border bg-surface p-2.5 transition-colors hover:border-border-strong"
                >
                  <div
                    className="relative overflow-hidden rounded-md border border-border"
                    style={{
                      aspectRatio: i === 2 || i === 3 ? "9 / 14" : "16 / 10",
                      background:
                        "linear-gradient(150deg,#1a222a,#0c1013)",
                    }}
                  >
                    <div className="dot-canvas absolute inset-0 opacity-40" />
                    <span className="absolute inset-x-2 top-2 h-1 rounded-full bg-surface-3" />
                  </div>
                  <p className="mt-1.5 text-[11.5px]">{f}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </Section>

      {/* SOCIAL PRESETS */}
      <Section
        title="Create once. Publish everywhere."
        copy="Presets re-compose your layout instead of stretching it — type, safe areas and crops adapt."
      >
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {presets.map((p, i) => (
            <div key={p.name} className="group">
              <div
                className="relative overflow-hidden rounded-lg border border-border transition-colors group-hover:border-primary/60"
                style={{
                  aspectRatio: p.ratio,
                  background: "linear-gradient(155deg,#231a12,#0f1215)",
                }}
              >
                <div className="dot-canvas absolute inset-0 opacity-40" />
                <div className="absolute inset-3 rounded border border-white/10" />
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 space-y-1.5">
                  <span className="block h-1.5 w-3/4 rounded-full bg-primary/70" />
                  <span className="block h-1.5 w-1/2 rounded-full bg-foreground/25" />
                </div>
                {i === 0 && (
                  <span className="absolute left-2 top-2">
                    <Pill active>Source</Pill>
                  </span>
                )}
              </div>
              <p className="mt-1.5 truncate text-[11.5px]">{p.name}</p>
              <p className="num truncate text-[10.5px] text-muted-foreground">{p.dims}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* RECORDING */}
      <Section
        title="Record without leaving your workspace."
        copy="Local-quality multi-track capture for camera, mic and screen — ready to edit the moment you stop."
        className="border-y border-border bg-surface/30"
      >
        <div className="mt-8 grid gap-3 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-xl border border-border-strong bg-surface p-3 shadow-panel">
            <div className="h-[320px]">
              <RecordMock />
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            {[
              ["Camera", "FaceTime HD · 1080p60"],
              ["Microphone", "Shure MV7 · -6 dB"],
              ["Speaker", "Studio Monitors"],
              ["Screen share", "Display 2 · 4K"],
              ["Quality", "Local recording · lossless"],
              ["Status", "Recording · 12:04"],
            ].map(([k, v], i) => (
              <div
                key={k}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2.5"
              >
                <span className="text-[12.5px]">{k}</span>
                <span
                  className={cnJoin(
                    "num truncate text-[11.5px]",
                    i === 5 ? "text-destructive" : "text-muted-foreground",
                  )}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* TEMPLATES */}
      <Section
        id="templates"
        title="Start from something great."
        copy="Finished designs across every category — open one and it's already yours."
      >
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {templateCats.map((t) => (
            <Link key={t.cat} href="/app/templates" className="group">
              <div
                className="relative overflow-hidden rounded-lg border border-border transition-colors group-hover:border-primary/60"
                style={{ aspectRatio: t.ratio, background: t.bg }}
              >
                <div className="dot-canvas absolute inset-0 opacity-40" />
                <div className="absolute inset-3 rounded-sm border border-white/10" />
                <div className="absolute inset-x-4 bottom-4 space-y-1">
                  <span className="block h-1.5 w-2/3 rounded-full bg-foreground/50" />
                  <span className="block h-1.5 w-1/3 rounded-full bg-primary/60" />
                </div>
              </div>
              <p className="mt-1.5 text-[11.5px]">{t.cat}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* UNIFIED WORKSPACE */}
      <Section
        title="Stop switching between tools."
        copy="Five apps, five subscriptions, five export folders. Or one workspace."
        className="border-y border-border bg-surface/30"
      >
        <div className="mt-8 flex flex-col items-center gap-5">
          <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-5">
            {[
              "Recording app",
              "Video editor",
              "Image editor",
              "Screenshot generator",
              "Code screenshot tool",
            ].map((t) => (
              <div
                key={t}
                className="rounded-lg border border-dashed border-border bg-surface/60 px-3 py-4 text-center text-[12px] text-muted-foreground"
              >
                {t}
              </div>
            ))}
          </div>
          <ArrowDown className="size-4 text-muted-foreground" />
          <div className="flex items-center gap-3 rounded-xl border border-primary/40 bg-primary/10 px-6 py-4">
            <span className="grid size-8 place-items-center rounded-md bg-primary text-[15px] font-bold text-primary-foreground">
              A
            </span>
            <span className="text-[18px] font-semibold tracking-tight">Aakar</span>
          </div>
        </div>
      </Section>

      {/* FEATURES */}
      <Section
        id="features"
        title="Built like a tool, not a template."
        copy="The details that make a creative app feel fast."
      >
        <div className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="flex gap-2.5">
              <f.icon className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={1.75} />
              <div>
                <p className="text-[13px] font-medium">{f.title}</p>
                <p className="text-[12px] text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* PRICING / RESOURCES anchors + FINAL CTA */}
      <section id="pricing" className="border-t border-border">
        <div id="resources" className="relative overflow-hidden">
          <div className="grid-canvas pointer-events-none absolute inset-0 opacity-50" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(50% 100% at 50% 100%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-[1180px] px-5 py-20 text-center">
            <h2 className="text-[28px] font-semibold tracking-tight md:text-[38px]">
              Everything you need to create.
            </h2>
            <p className="mt-3 text-[14px] text-muted-foreground">
              One workspace. From first recording to final post.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2.5">
              <Link
                href="/app"
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-[13.5px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Start creating <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href="/app/video"
                className="rounded-md border border-border-strong bg-surface px-4 py-2 text-[13.5px] font-medium transition-colors hover:bg-surface-2"
              >
                Explore the studio
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
