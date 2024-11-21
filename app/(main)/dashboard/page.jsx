import { GetFormStats } from "@/actions/form/form-stats";
import FormStatsCard from "@/app/_components/ui/cards/form-stats-card";
import CreateFormButton from "@/app/_components/ui/form/create-form-button";
import { Separator } from "@/app/_components/ui/shadcn/separator";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  const stats = await GetFormStats();

  return (
    <div className="container p-4">
      <FormStatsCard />
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">فرم های ایجاد شده</h2>
      <Separator className="my-6" />
      <CreateFormButton />
    </div>
  );
};

export default page;
