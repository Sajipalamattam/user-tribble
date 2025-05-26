// Layout.js
import React from "react";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <Header />
      {children}
    </div>
  );
}
