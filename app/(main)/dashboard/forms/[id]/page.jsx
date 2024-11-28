import { GetFormById } from "@/actions/form/form";
import FormLinkShare from "@/app/_components/button/form-link-share";
import VisitButton from "@/app/_components/button/visit-button";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { StatsCard } from "@/app/_components/ui/cards/form-stats-card";
import SubmissionsTable from "@/app/_components/table/submissions-table";

const FormDetailPage = async ({ params }) => {
  const { id } = await params;
  const form = await GetFormById(Number(id));

  if (!form) throw new Error("فرم یافت نشد");

  const { visits, submissions } = form;

  let submissionRate = 0;

  if (visits > 0) submissionRate = (submissions / visits) * 100;

  const bounceRate = 100 - submissionRate;

  return (
    <div className="mx-auto container">
      <div className="py-10 border-b border-muted">
        <div className="flex justify-between container">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitButton shareUrl={form.shareUrl} />
        </div>
      </div>

      <div className="py-4 border-b border-muted">
        <div className="container flex gap-2 items-center justify-between">
          <FormLinkShare shareUrl={form.shareUrl} />
        </div>
      </div>
      <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container">
        <StatsCard
          title="مشاهده"
          icon={<LuView className="text-blue-600" />}
          helperText="دفعات مشاهده شده"
          value={visits.toLocaleString()}
          loading={false}
          className="shadow-md shadow-blue-600"
        />

        <StatsCard
          title="ثبت"
          icon={<FaWpforms className="text-yellow-600" />}
          helperText="دفعات ثبت شده"
          value={submissions.toLocaleString()}
          loading={false}
          className="shadow-md shadow-yellow-600"
        />

        <StatsCard
          title="درصد ثبت"
          icon={<HiCursorClick className="text-green-600" />}
          helperText="مشاهده کنندگانی که فرم را پر کرده اند"
          value={submissions.toLocaleString() + "%"}
          loading={false}
          className="shadow-md shadow-green-600"
        />

        <StatsCard
          title="درصد خروج"
          icon={<TbArrowBounce className="text-red-600" />}
          helperText="مشاهده کنندگانی که فرم را پر نکرده اند"
          value={submissions.toLocaleString() + "%"}
          loading={false}
          className="shadow-md shadow-red-600"
        />
      </div>
      <div className="container pt-10">
        <SubmissionsTable id={form.id} />
      </div>
    </div>
  );
};

export default FormDetailPage;
