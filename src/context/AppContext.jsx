// src/context/AppContext.jsx
import React, { createContext, useContext, useCallback, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  // notifications: { id, message, type }
  const [notifications, setNotifications] = useState([]);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  // Add notification; auto-dismiss after duration (ms)
  const showNotification = useCallback((message, type = "info", duration = 4500) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setNotifications((prev) => [...prev, { id, message, type }]);

    // auto remove
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, duration);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        showLoader,
        hideLoader,
        notifications,
        showNotification,
        removeNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);