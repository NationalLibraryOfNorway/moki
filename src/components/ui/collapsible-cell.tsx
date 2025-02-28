import {CollapsibleTrigger} from "@/components/ui/collapsible";
import {TableCell} from "@/components/ui/table";
import {ReactNode} from "react";

export const CollapsibleCell = ({children, className, ...props}: { children: ReactNode, className?: string }) => {
  return (
    <TableCell {...props} className={className}>
      <CollapsibleTrigger>{children}</CollapsibleTrigger>
    </TableCell>
  );
};