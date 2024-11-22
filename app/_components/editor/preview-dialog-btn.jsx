import React from "react";
import { Button } from "../ui/shadcn/button";
import { MdPreview } from "react-icons/md";

const PreviewDialogBtn = () => {
  return (
    <Button variant="outline" className="gap-2">
      <MdPreview className="w-6 h-6" />
      پیش نمایش
    </Button>
  );
};

export default PreviewDialogBtn;
