/**
 * Lightweight client-side toast notification manager.
 * Supports imperative triggering (`toast.error(...)`) anywhere on the client,
 * including inside React Query callbacks and standard event handlers.
 */

export type ToastType = "error" | "success" | "info" | "warning";

export interface ToastItem {
    id: string;
    type: ToastType;
    title?: string;
    message: string;
    duration?: number;
}

export type ToastOptions = {
    title?: string;
    duration?: number;
};

type ToastListener = (toasts: ToastItem[]) => void;

class ToastManager {
    private toasts: ToastItem[] = [];
    private listeners: Set<ToastListener> = new Set();
    private counter = 0;

    private notify() {
        const copy = [...this.toasts];
        this.listeners.forEach((listener) => listener(copy));
    }

    public subscribe(listener: ToastListener): () => void {
        this.listeners.add(listener);
        listener([...this.toasts]);
        return () => {
            this.listeners.delete(listener);
        };
    }

    public show(type: ToastType, message: string, opts?: ToastOptions): string {
        const id = `toast-${++this.counter}-${Date.now()}`;
        const duration = opts?.duration ?? (type === "error" ? 6000 : 4000);

        const item: ToastItem = {
            id,
            type,
            title: opts?.title,
            message,
            duration,
        };

        // Prepend to show most recent at the top
        this.toasts = [item, ...this.toasts.slice(0, 4)];
        this.notify();

        if (duration > 0) {
            setTimeout(() => {
                this.dismiss(id);
            }, duration);
        }

        return id;
    }

    public dismiss(id: string) {
        this.toasts = this.toasts.filter((t) => t.id !== id);
        this.notify();
    }

    public clear() {
        this.toasts = [];
        this.notify();
    }

    public error(message: string, opts?: ToastOptions): string {
        return this.show("error", message, opts);
    }

    public success(message: string, opts?: ToastOptions): string {
        return this.show("success", message, opts);
    }

    public info(message: string, opts?: ToastOptions): string {
        return this.show("info", message, opts);
    }

    public warning(message: string, opts?: ToastOptions): string {
        return this.show("warning", message, opts);
    }
}

export const toast = new ToastManager();
