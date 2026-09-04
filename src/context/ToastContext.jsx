import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 7);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <div className="toast-viewport" role="region" aria-label="Notifications" aria-live="polite">
        {toasts.map((toast) => {
          let Icon = Info;
          if (toast.type === 'success') Icon = CheckCircle2;
          if (toast.type === 'error') Icon = AlertCircle;
          if (toast.type === 'warning') Icon = AlertTriangle;

          return (
            <div key={toast.id} className={`hw-toast hw-toast-${toast.type}`}>
              <div className="hw-toast-icon">
                <Icon size={16} />
              </div>
              <div className="hw-toast-message">{toast.message}</div>
              <button
                type="button"
                className="hw-toast-close"
                onClick={() => removeToast(toast.id)}
                aria-label="Close notification"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export default ToastProvider;
