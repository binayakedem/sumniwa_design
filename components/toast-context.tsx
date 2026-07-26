"use client";

import React, { createContext, useCallback, useContext, useState } from 'react';

type Toast = { id: string; message: string };

type ToastContextValue = {
    show: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const remove = useCallback((id: string) => {
        setToasts((t) => t.filter((x) => x.id !== id));
    }, []);

    const show = useCallback((message: string) => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
        setToasts((t) => [...t, { id, message }]);
        window.setTimeout(() => remove(id), 2400);
    }, [remove]);

    return (
        <ToastContext.Provider value={{ show }}>
            {children}

            <div className="fixed right-4 top-20 z-50 flex flex-col gap-2">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        role="status"
                        className="max-w-xs rounded-md bg-slate-900 px-3 py-2 text-sm text-white shadow-lg"
                    >
                        {t.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used within ToastProvider');
    return ctx;
}

export default ToastProvider;
