import {
  FormCards,
  FormCardSkeleton,
} from "@/app/_components/ui/cards/form-cards-list";
import FormStatsCard from "@/app/_components/ui/cards/form-stats-card";
import CreateFormButton from "@/app/_components/ui/form/create-form-button";
import { Separator } from "@/app/_components/ui/shadcn/separator";
import { Suspense } from "react";

const page = async () => {
  return (
    <div className="container mx-auto p-4">
      <FormStatsCard />
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">فرم های ایجاد شده</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormButton />
        <Suspense
          fallback={[1, 2, 3, 4, 5].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
