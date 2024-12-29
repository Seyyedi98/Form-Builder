"use client";

import { createContext, useState } from "react";

export const CanvasContext = createContext(null);

export default function CanvasContextProvider({ children }) {
  const [elements, setElements] = useState([]); // List of all elements in current form
  const [selectedElement, setSelectedElement] = useState(null);

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

  const updateElement = (id, element) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((el) => el.id === id);
      newElements[index] = element;
      return newElements;
    });
  };

  return (
    <CanvasContext.Provider
      value={{
        elements,
        setElements,
        addElement,
        removeElement,
        updateElement,
        selectedElement,
        setSelectedElement,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}
