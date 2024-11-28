import { GetFormStats } from "@/actions/form/form-stats";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn/card";
import { Skeleton } from "../shadcn/skeleton";
import { Suspense } from "react";

export const FormStatsCard = async () => {
  const stats = await GetFormStats();

  return (
    <Suspense fallback={<StatsCard loading={true} />}>
      <StatsCards loading={false} data={stats} />
    </Suspense>
  );
};

export default FormStatsCard;

function StatsCards(props) {
  const { data, loading } = props;

  return (
    <div className="w-full pt-8 px-2 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="مشاهده"
        icon={<LuView className="text-blue-600" />}
        helperText="دفعات مشاهده شده"
        value={data.visits.toLocaleString()}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />

      <StatsCard
        title="ثبت"
        icon={<FaWpforms className="text-yellow-600" />}
        helperText="دفعات ثبت شده"
        value={data.submissions.toLocaleString()}
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />

      <StatsCard
        title="درصد ثبت"
        icon={<HiCursorClick className="text-green-600" />}
        helperText="مشاهده کنندگانی که فرم را پر کرده اند"
        value={data.submissions.toLocaleString() + "%"}
        loading={loading}
        className="shadow-md shadow-green-600"
      />

      <StatsCard
        title="درصد خروج"
        icon={<TbArrowBounce className="text-red-600" />}
        helperText="مشاهده کنندگانی که فرم را پر نکرده اند"
        value={data.submissions.toLocaleString() + "%"}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  );
}

export function StatsCard({
  title,
  value,
  icon,
  helperText,
  loading,
  className,
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && <Skeleton className="h-8"></Skeleton>}
          {!loading && value}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
}
