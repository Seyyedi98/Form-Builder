import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/_components/ui/shadcn/card";
import BackButton from "../../auth/back-button";

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>{headerLabel}</CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref}></BackButton>
      </CardFooter>
    </Card>
  );
};
