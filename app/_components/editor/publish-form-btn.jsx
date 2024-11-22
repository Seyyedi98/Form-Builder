import React from "react";
import { Button } from "../ui/shadcn/button";
import { MdOutlinePublish } from "react-icons/md";

const PublishFormBtn = () => {
  return (
    <Button
      variant="outline"
      className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
    >
      <MdOutlinePublish className="w-6 h-6" />
      انتشار
    </Button>
  );
};

export default PublishFormBtn;
