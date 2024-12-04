import React from "react";
import { TableCell } from "../ui/shadcn/table";
import { Badge } from "../ui/shadcn/badge";
import { Checkbox } from "../ui/shadcn/checkbox";

const RowCell = ({ type, value }) => {
  let node = value;

  switch (type) {
    case "DataField":
      if (!value) break;
      const date = new Date(value);
      node = <Badge variant="outline">{format(date, "dd/MM/yyyy")}</Badge>;
      break;

    case "CheckboxField":
      const checked = value === "true" ? true : false;
      node = <Checkbox checked={checked} disabled />;
      break;

    default:
      break;
  }

  return <TableCell>{node}</TableCell>;
};

export default RowCell;
