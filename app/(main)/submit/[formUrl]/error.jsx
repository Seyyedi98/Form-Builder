"use client";

import { Button } from "@/app/_components/ui/shadcn/button";
import Link from "next/link";
import { useEffect } from "react";

const ErrorPage = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="w-full h-full gap-8 flex flex-col items-center justify-center">
      <h2 className="text-destructive text-4xl">
        خطایی رخ داده است! لطفا دوباره تلاش کنید
      </h2>
      <Button asChild variant="link">
        <Link href="/">برگشت به صفحه اصلی</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
