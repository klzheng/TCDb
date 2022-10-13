import React from "react";
import AuthProvider from "./AuthProvider";
import NotificationProvider from "./NotificationProvider";


export default function ContextProviders(props) {
  return (
    <NotificationProvider>
      <AuthProvider>{props.children}</AuthProvider>
    </NotificationProvider>
  );
}
