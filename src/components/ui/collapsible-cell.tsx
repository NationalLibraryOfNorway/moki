import {CollapsibleTrigger} from "@/components/ui/collapsible.tsx";
import {TableCell} from "@/components/ui/table.tsx";
import {ReactNode} from "react";

export const CollapsibleCell = ({children, className, ...props}: { children: ReactNode, className?: string }) => {
  return (
    <TableCell {...props} className={className}>
      <CollapsibleTrigger>{children}</CollapsibleTrigger>
    </TableCell>
  );
};