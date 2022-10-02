import React, { createContext, useState } from "react";


export const NotificationContext = createContext();

export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState("");
  const [classes, setClasses] = useState("");
  const updateNotification = (type, value) => {
    switch (type) {
      case "error":
        setClasses("bg-red-400 border-red-500");
        break;
      case "success":
        setClasses("bg-green-400 border-green-500");
        break;
      case "warning":
        setClasses("bg-orange-400 border-orange-500");
        break;
      default:
        setClasses("bg-red-400 border-red-500");
    }
    setNotification(value);

    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      {notification && (
        <div className="fixed left-1/2 -translate-x-1/2 top-24">
          <div className="scale-in-center">
            <p className={classes + " border-4 text-white px-4 py-1 font-semibold rounded"}>
              {notification}
            </p>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}
