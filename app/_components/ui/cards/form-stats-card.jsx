import { GetFormStats } from "@/actions/form/form-stats";
import { Eye, Pencil } from "lucide-react";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn/card";
import { Skeleton } from "../shadcn/skeleton";

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
    <div className="w-full pt-8 px-2 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      <StatsCard
        title="مشاهده"
        icon={<Eye className="text-blue-600" />}
        helperText="دفعات مشاهده شده"
        value={data.visits.toLocaleString()}
        loading={loading}
        className="shadow-md"
      />

      <StatsCard
        title="ثبت"
        icon={<Pencil className="text-yellow-600" />}
        helperText="دفعات ثبت شده"
        value={data.submissions.toLocaleString()}
        loading={loading}
        className="shadow-md"
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
