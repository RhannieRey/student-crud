import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-5 right-5 z-50 transition-all duration-300 ease-out transform translate-y-0">
      <div
        className={`flex items-start gap-3 p-4 rounded-xl shadow-lg border max-w-md ${
          isSuccess
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
            : isError
            ? 'bg-rose-50 border-rose-200 text-rose-900'
            : 'bg-indigo-50 border-indigo-200 text-indigo-900'
        }`}
        role="alert"
      >
        <div className="shrink-0 mt-0.5">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          {isError && <AlertCircle className="w-5 h-5 text-rose-600" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-indigo-600" />}
        </div>

        <div className="flex-1 text-sm">
          <p className="font-semibold">
            {isSuccess ? 'Success' : isError ? 'Error' : 'Notice'}
          </p>
          <p className="mt-0.5 text-xs opacity-90 leading-relaxed">{toast.message}</p>
        </div>

        <button
          onClick={onClose}
          className="shrink-0 p-1 text-slate-400 hover:text-slate-600 rounded-md transition cursor-pointer"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
