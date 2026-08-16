import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/* ---------- primitives ---------- */

export function Chrome({
  title,
  right,
  children,
  className,
  dense,
}: {
  title?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
  dense?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-surface shadow-panel",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 border-b border-border bg-surface-2 px-2.5",
          dense ? "h-7" : "h-9",
        )}
      >
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-destructive/70" />
          <span className="size-2 rounded-full bg-warning/70" />
          <span className="size-2 rounded-full bg-success/70" />
        </span>
        {title && (
          <span className="truncate text-[11px] text-muted-foreground">{title}</span>
        )}
        <span className="ml-auto flex items-center gap-1.5">{right}</span>
      </div>
      {children}
    </div>
  );
}

export function Pill({
  children,
  active,
  className,
}: {
  children: ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded border px-1.5 py-0.5 text-[10px] leading-none",
        active
          ? "border-primary/40 bg-primary/15 text-primary"
          : "border-border bg-surface-2 text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

function Bar({ w, c = "bg-surface-3" }: { w: string; c?: string }) {
  return <span className={cn("block h-1.5 rounded-full", c)} style={{ width: w }} />;
}

/* ---------- hero: full studio ---------- */

const tools = ["Select", "Text", "Image", "Video", "Code", "Frames"];
const inspector: [string, string][] = [
  ["Typography", "Inter Tight · 600"],
  ["Size", "72 / 84"],
  ["Position", "X 120 · Y 96"],
  ["Appearance", "Opacity 100%"],
  ["Effects", "Shadow · lg"],
];

export function StudioMock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border-strong bg-surface shadow-artboard",
        className,
      )}
    >
      {/* topbar */}
      <div className="flex h-10 items-center gap-3 border-b border-border bg-surface-2 px-3">
        <span className="grid size-5 place-items-center rounded bg-primary text-[10px] font-bold text-primary-foreground">
          A
        </span>
        <span className="text-[12px] font-medium">Launch teaser — v4</span>
        <Pill className="hidden sm:inline">Saved</Pill>
        <span className="ml-auto flex items-center gap-1.5">
          <Pill>Preview</Pill>
          <Pill>Share</Pill>
          <span className="rounded bg-primary px-2 py-1 text-[10px] font-semibold leading-none text-primary-foreground">
            Export
          </span>
        </span>
      </div>

      <div className="flex">
        {/* tool rail */}
        <div className="hidden w-[86px] shrink-0 flex-col gap-1 border-r border-border p-2 sm:flex">
          <p className="px-1 pb-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
            Tools
          </p>
          {tools.map((t, i) => (
            <span
              key={t}
              className={cn(
                "rounded px-2 py-1.5 text-[11px]",
                i === 4
                  ? "bg-sidebar-accent text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {t}
            </span>
          ))}
        </div>

        {/* canvas */}
        <div className="relative min-w-0 flex-1 bg-canvas p-4 sm:p-7">
          <div className="grid-canvas pointer-events-none absolute inset-0 opacity-70" />
          <div className="relative mx-auto max-w-[520px] overflow-hidden rounded-lg border border-border-strong shadow-artboard">
            <div
              className="p-4 sm:p-6"
              style={{
                background:
                  "linear-gradient(140deg,#20160c,#0f1216 45%,#101b22)",
              }}
            >
              <Chrome dense title="useDeferredSearch.ts" className="bg-[#0d1117]">
                <pre className="num overflow-hidden p-3 text-[10.5px] leading-[1.7] text-[#c9d1d9] sm:text-[11.5px]">
                  <code>
                    <span className="text-muted-foreground">1 </span>
                    <span className="text-[#ff7b72]">export function</span>{" "}
                    <span className="text-[#d2a8ff]">useSearch</span>
                    <span>(q: </span>
                    <span className="text-[#79c0ff]">string</span>
                    <span>) {"{"}</span>
                    {"\n"}
                    <span className="text-muted-foreground">2 </span>
                    <span className="text-[#ff7b72]">  const</span> deferred ={" "}
                    <span className="text-[#d2a8ff]">useDeferredValue</span>(q)
                    {"\n"}
                    <span className="text-muted-foreground">3 </span>
                    <span className="text-[#ff7b72]">  return</span>{" "}
                    <span className="text-[#d2a8ff]">useMemo</span>(() ={">"}{" "}
                    <span className="text-[#d2a8ff]">filter</span>(deferred), [deferred])
                    {"\n"}
                    <span className="text-muted-foreground">4 </span>
                    <span>{"}"}</span>
                  </code>
                </pre>
              </Chrome>
            </div>
          </div>
          <div className="num mt-3 flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
            <Pill>1600 × 900</Pill>
            <Pill active>Fit</Pill>
            <Pill>120%</Pill>
          </div>
        </div>

        {/* inspector */}
        <div className="hidden w-[168px] shrink-0 flex-col gap-2.5 border-l border-border p-3 lg:flex">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
            Properties
          </p>
          {inspector.map(([k, v]) => (
            <div key={k}>
              <p className="text-[10px] text-muted-foreground">{k}</p>
              <p className="num mt-1 truncate rounded border border-border bg-surface-2 px-1.5 py-1 text-[10.5px]">
                {v}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* timeline strip */}
      <div className="flex items-center gap-2 border-t border-border bg-surface-2 px-3 py-2">
        <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          Timeline
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex gap-1">
            <span className="h-2.5 flex-[3] rounded-sm bg-track-video/70" />
            <span className="h-2.5 flex-[2] rounded-sm bg-track-video/40" />
            <span className="h-2.5 flex-1 rounded-sm bg-track-text/60" />
          </div>
          <div className="flex gap-1">
            <span className="h-2.5 flex-[5] rounded-sm bg-track-audio/60" />
            <span className="h-2.5 flex-1 rounded-sm bg-surface-3" />
          </div>
        </div>
        <span className="num text-[10px] text-muted-foreground">00:41 / 01:24</span>
      </div>
    </div>
  );
}

/* ---------- section mocks ---------- */

export function RecordMock({ compact }: { compact?: boolean }) {
  const people = ["SR", "AM", "JT", "KP"];
  return (
    <div className="flex h-full flex-col gap-2 rounded-lg border border-border bg-surface p-2">
      <div className="flex items-center gap-1.5">
        <span className="rec-dot size-1.5 rounded-full bg-destructive" />
        <span className="num text-[10px] text-muted-foreground">REC 12:04</span>
        <span className="ml-auto flex gap-0.5">
          {[3, 6, 4, 8, 5].map((h, i) => (
            <span
              key={i}
              className="w-0.5 rounded-full bg-success/80"
              style={{ height: h * 1.5 }}
            />
          ))}
        </span>
      </div>
      <div className={cn("grid flex-1 gap-1.5", compact ? "grid-cols-2" : "grid-cols-2")}>
        {people.map((p, i) => (
          <div
            key={p}
            className="relative grid min-h-[46px] place-items-center overflow-hidden rounded border border-border"
            style={{
              background:
                i % 2
                  ? "linear-gradient(150deg,#1b2229,#0e1216)"
                  : "linear-gradient(150deg,#241a12,#100e0c)",
            }}
          >
            <span className="grid size-6 place-items-center rounded-full bg-surface-3 text-[9px] font-semibold">
              {p}
            </span>
            <span className="absolute bottom-1 left-1 rounded bg-background/70 px-1 text-[8px]">
              {["Shiv", "Ana", "Jon", "Kira"][i]}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-1.5">
        {["Mic", "Cam", "Share"].map((c) => (
          <Pill key={c}>{c}</Pill>
        ))}
        <span className="rounded bg-destructive px-1.5 py-0.5 text-[9px] font-medium text-destructive-foreground">
          Stop
        </span>
      </div>
    </div>
  );
}

export function VideoMock() {
  return (
    <div className="flex h-full flex-col gap-2 rounded-lg border border-border bg-surface p-2">
      <div
        className="relative flex-1 overflow-hidden rounded border border-border"
        style={{ background: "linear-gradient(140deg,#16202b,#0c1013 60%,#1d1408)" }}
      >
        <div className="dot-canvas absolute inset-0 opacity-40" />
        <span className="num absolute bottom-1 right-1 rounded bg-background/75 px-1 text-[9px]">
          00:41
        </span>
      </div>
      <div className="space-y-1">
        {[
          ["bg-track-video/70", "flex-[3]", "bg-track-video/40", "flex-[2]"],
          ["bg-track-audio/60", "flex-[4]", "bg-track-audio/35", "flex-1"],
          ["bg-track-text/60", "flex-1", "bg-track-text/30", "flex-[3]"],
        ].map(([c1, f1, c2, f2], i) => (
          <div key={i} className="flex gap-1">
            <span className={cn("h-2 rounded-sm", c1, f1)} />
            <span className={cn("h-2 rounded-sm", c2, f2)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ImageMock() {
  return (
    <div className="flex h-full gap-2 rounded-lg border border-border bg-surface p-2">
      <div className="relative flex-1 overflow-hidden rounded border border-border bg-canvas">
        <div className="grid-canvas absolute inset-0" />
        <div
          className="absolute inset-3 rounded border border-primary/50"
          style={{ background: "linear-gradient(150deg,#26201a,#12161b)" }}
        >
          <div className="p-2">
            <Bar w="70%" c="bg-foreground/70" />
            <span className="mt-1.5 block" />
            <Bar w="45%" />
          </div>
        </div>
      </div>
      <div className="hidden w-[62px] shrink-0 flex-col gap-1 sm:flex">
        {["Layer 3", "Layer 2", "Layer 1"].map((l, i) => (
          <span
            key={l}
            className={cn(
              "truncate rounded px-1 py-1 text-[9px]",
              i === 0 ? "bg-sidebar-accent text-foreground" : "text-muted-foreground",
            )}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

export function DeviceMock({ frame = "Browser" }: { frame?: string }) {
  return (
    <div
      className="grid h-full place-items-center rounded-lg border border-border p-3"
      style={{ background: "linear-gradient(150deg,#2a1c10,#101418 55%,#152029)" }}
    >
      <div className="w-full max-w-[220px]">
        <Chrome dense title={frame} className="shadow-artboard">
          <div className="relative aspect-video bg-canvas">
            <div className="grid-canvas absolute inset-0 opacity-70" />
            <div className="absolute inset-x-3 top-3 space-y-1.5">
              <Bar w="55%" c="bg-primary/70" />
              <Bar w="80%" />
              <Bar w="68%" />
            </div>
          </div>
        </Chrome>
      </div>
    </div>
  );
}

export function CodeMock({ preset }: { preset?: string }) {
  return (
    <div
      className="grid h-full place-items-center rounded-lg border border-border p-3"
      style={{ background: "linear-gradient(140deg,#1d1409,#0f1216 50%,#101c22)" }}
    >
      <div className="w-full max-w-[240px]">
        <Chrome dense title="aakar.ts" className="bg-[#0d1117] shadow-artboard">
          <pre className="num overflow-hidden p-2.5 text-[9.5px] leading-[1.75] text-[#c9d1d9]">
            <code>
              <span className="text-[#ff7b72]">const</span> studio ={" "}
              <span className="text-[#d2a8ff]">create</span>({"{"}
              {"\n"}  format: <span className="text-[#a5d6ff]">'x-post'</span>,{"\n"}{" "}
              theme: <span className="text-[#a5d6ff]">'aakar-dark'</span>
              {"\n"}
              {"}"})
            </code>
          </pre>
        </Chrome>
        {preset && (
          <div className="mt-2 flex justify-center gap-1">
            <Pill active>{preset}</Pill>
            <Pill>LinkedIn</Pill>
            <Pill>Instagram</Pill>
          </div>
        )}
      </div>
    </div>
  );
}
