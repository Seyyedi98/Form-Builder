import React from "react";
import { HiSaveAs } from "react-icons/hi";
import { Button } from "../ui/shadcn/button";

const SaveFormBtn = () => {
  return (
    <Button variant="outline" className="gap-2">
      <HiSaveAs className="w-4 h-4" />
      ذخیره
    </Button>
  );
};

export default SaveFormBtn;
