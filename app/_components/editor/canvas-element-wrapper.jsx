import React from "react";
import { FormElements } from "./form-elements";

const CanvasElementWrapper = ({ element }) => {
  // return canvas element component associated with form element
  const CanvasElement = FormElements[element.type].CanvasComponent;
  return <CanvasElement elementInstance={element} />;
};

export default CanvasElementWrapper;
