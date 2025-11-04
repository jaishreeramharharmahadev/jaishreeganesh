// src/components/common/NotificationHandler.jsx
import React from "react";
import { useAppContext } from "../../context/AppContext";

const VARIANTS = {
  success: {
    bg: "bg-emerald-500",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M4 10l3 3 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  error: {
    bg: "bg-red-500",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M6 6l8 8M14 6L6 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  warning: {
    bg: "bg-yellow-400 text-black",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M10 4v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  info: {
    bg: "bg-blue-500",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M9 9h1v4H9zM10 7a1 1 0 110-2 1 1 0 010 2z" stroke="white" strokeWidth="0" />
      </svg>
    ),
  },
};

const Notification = ({ note, onClose }) => {
  const variant = VARIANTS[note.type] || VARIANTS.info;

  return (
    <div
      role="status"
      className={`group relative flex items-start gap-3 p-3 pr-4 rounded-xl shadow-lg transform transition duration-200 ease-out ${variant.bg} text-white`}
    >
      <div className="flex-none mt-0.5">{variant.icon}</div>

      <div className="flex-1 text-sm">
        <div className="font-semibold">{note.message}</div>
      </div>

      {/* close button */}
      <button
        aria-label="Close notification"
        onClick={() => onClose(note.id)}
        className="ml-2 opacity-80 hover:opacity-100 p-1 rounded-md"
      >
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M6 6l8 8M14 6L6 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* subtle progress bar */}
      <div className="absolute left-0 bottom-0 h-1 w-full bg-black/10 rounded-b-xl">
        <div className="h-1 bg-white/50 rounded-b-xl animate-progress" />
      </div>
    </div>
  );
};

const NotificationHandler = () => {
  const { notifications, removeNotification } = useAppContext();

  // Keep max 4 notifications stacked
  const visible = notifications.slice(-4);

  return (
    <div className="fixed bottom-5 left-5 z-[9999] flex flex-col gap-3 w-80 max-w-[90vw]">
      {visible.map((n) => (
        <Notification key={n.id} note={n} onClose={removeNotification} />
      ))}

      {/* small style tag for progress animation (you can move to CSS file) */}
      <style>{`
        @keyframes progressAnim {
          from { width: 100%; }
          to   { width: 0%; }
        }
        .animate-progress {
          animation: progressAnim linear forwards;
          animation-duration: 4.5s; /* matches default duration in context */
        }
      `}</style>
    </div>
  );
};

export default NotificationHandler;