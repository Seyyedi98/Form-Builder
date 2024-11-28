import { GetFormContentByUrl } from "@/actions/form/form";
import FormSubmit from "@/app/_components/submit-page/form-submit";

const SubmitPage = async ({ params }) => {
  const { formUrl } = await params;

  const form = await GetFormContentByUrl(formUrl);
  if (!form) return new Error("Form not found");

  const formContent = JSON.parse(form.content);

  return <FormSubmit formUrl={formUrl} content={formContent} />;
};

export default SubmitPage;
