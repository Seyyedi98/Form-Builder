const { GetForms } = require("@/actions/form/form");
const { Skeleton } = require("../shadcn/skeleton");
const { default: FormCard } = require("./form-card");

export async function FormCards() {
  const forms = await GetForms();
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

export function FormCardSkeleton() {
  return <Skeleton className="border-2 border-primary/20 h-[190px] w-full" />;
}
