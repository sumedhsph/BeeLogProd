import React from "react";

export default function Container({ children }) {
  return <div className="container px-4 md:px-0 max-w-6xl mx-auto -mt-32">{children}</div>;
}