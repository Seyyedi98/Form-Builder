"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/shadcn/button";

const VisitButton = ({ shareUrl }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;

  return (
    <Button
      className="w-[200px]"
      onClick={() => {
        window.open(shareLink, "_blank");
      }}
    >
      مشاهده
    </Button>
  );
};

export default VisitButton;
