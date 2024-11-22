import { GetFormById } from "@/actions/form/form";
import FormBuilder from "@/app/_components/editor/form-builder";
import React from "react";

const BuilderPage = async ({ params }) => {
  const { id } = await params;
  const form = await GetFormById(Number(id));

  if (!form) throw new Error("فرم یافت نشد");
  return <FormBuilder form={form} />;
};

export default BuilderPage;
