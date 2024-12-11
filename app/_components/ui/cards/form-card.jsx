import { formatDistance } from "date-fns";
import { Eye, Pencil } from "lucide-react";
import Link from "next/link";
import { BiRightArrow } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { Badge } from "../shadcn/badge";
import { Button } from "../shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../shadcn/card";

const FormCard = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate">{form.name}</span>
          {form.published ? (
            <Badge>فعال</Badge>
          ) : (
            <Badge variant={"destructive"}>غیر فعال</Badge>
          )}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {form.published && (
            <span className="flex items-center gap-2">
              <Eye className="text-muted-foreground" />
              <span>{form.visits.toLocaleString()}</span>
              <Pencil className="text-muted-foreground" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button asChild className="w-full mt-2 text-md gap-4">
            <Link href={`/dashboard/forms/${form.id}`}>
              مشاهده نتایج <BiRightArrow />
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button
            asChild
            variant="secondary"
            className="w-full mt-2 text-md gap-4"
          >
            <Link href={`/dashboard/builder/${form.id}`}>
              ویرایش
              <FaEdit />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FormCard;
