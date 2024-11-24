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

  const removeElement = (id) => {
    setElements((prev) => prev.filter((elements) => elements.id !== id));
  };

  return (
    <CanvasContext.Provider value={{ elements, addElement, removeElement }}>
      {children}
    </CanvasContext.Provider>
  );
}
