"use client";

import { createContext, useState } from "react";

export const CanvasContext = createContext(null);

export default function CanvasContextProvider({ children }) {
  const [elements, setElements] = useState([]);

  const addElement = (index, element) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  return (
    <CanvasContext.Provider value={{ elements, addElement }}>
      {children}
    </CanvasContext.Provider>
  );
}
