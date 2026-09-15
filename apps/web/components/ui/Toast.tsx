"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from "lucide-react";
import { toast, type ToastItem, type ToastType } from "../../lib/toast";

const ICONS: Record<ToastType, React.ComponentType<{ className?: string }>> = {
    error: AlertCircle,
    success: CheckCircle2,
    warning: AlertTriangle,
    info: Info,
};

const STYLES: Record<
    ToastType,
    {
        bg: string;
        border: string;
        iconColor: string;
        badgeBg: string;
        badgeText: string;
    }
> = {
    error: {
        bg: "bg-[#1A1517]/95",
        border: "border-[#EF4444]/40",
        iconColor: "text-[#EF4444]",
        badgeBg: "bg-[#EF4444]/15",
        badgeText: "text-[#EF4444]",
    },
    success: {
        bg: "bg-[#121C18]/95",
        border: "border-[#10B981]/40",
        iconColor: "text-[#10B981]",
        badgeBg: "bg-[#10B981]/15",
        badgeText: "text-[#10B981]",
    },
    warning: {
        bg: "bg-[#1C1914]/95",
        border: "border-[#F59E0B]/40",
        iconColor: "text-[#F59E0B]",
        badgeBg: "bg-[#F59E0B]/15",
        badgeText: "text-[#F59E0B]",
    },
    info: {
        bg: "bg-[#14171E]/95",
        border: "border-[#3B82F6]/40",
        iconColor: "text-[#3B82F6]",
        badgeBg: "bg-[#3B82F6]/15",
        badgeText: "text-[#3B82F6]",
    },
};

export function ToastContainer() {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    useEffect(() => {
        return toast.subscribe((updatedToasts) => {
            setToasts(updatedToasts);
        });
    }, []);

    if (toasts.length === 0) return null;

    return (
        <div
            aria-live="polite"
            aria-atomic="true"
            className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0"
        >
            {toasts.map((item) => {
                const Icon = ICONS[item.type];
                const style = STYLES[item.type];

                return (
                    <div
                        key={item.id}
                        role="alert"
                        className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-200 transform translate-y-0 opacity-100 ${style.bg} ${style.border}`}
                    >
                        <div className={`mt-0.5 p-1 rounded-lg ${style.badgeBg} ${style.iconColor} shrink-0`}>
                            <Icon className="w-4 h-4" />
                        </div>

                        <div className="flex-1 min-w-0 pr-2">
                            {item.title && (
                                <p className="text-xs font-semibold tracking-wide text-[#F2F1ED] mb-0.5">
                                    {item.title}
                                </p>
                            )}
                            <p className="text-xs text-[#C8C6BC] leading-relaxed break-words font-mono">
                                {item.message}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => toast.dismiss(item.id)}
                            aria-label="Dismiss notification"
                            className="text-[#8E8D88] hover:text-[#F2F1ED] p-1 rounded-md transition-colors shrink-0 cursor-pointer"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
