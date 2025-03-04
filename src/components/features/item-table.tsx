import {Table, TableBody, TableCaption, TableHead, TableHeader, TableRow} from "@/components/ui/shadcn/table";
import {Collapsible, CollapsibleTrigger} from "@/components/ui/shadcn/collapsible";
import {DigitizedItem} from "@/models/digitized-item";
import {ChildCollapsible} from "@/components/features/child-collapsible";

interface ItemTableProps {
  tableData: DigitizedItem[];
}

export const ItemTable = (props: ItemTableProps) => {

  return (
    <Table>
      <TableCaption>Søkeresultater</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Søke-ID</TableHead>
          <TableHead>Navn</TableHead>
          <TableHead>DokID</TableHead>
          <TableHead>Materialtype</TableHead>
          <TableHead className="text-center">Kan sendes videre?</TableHead>
          <TableHead className="text-center">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody >
        { props.tableData.map((item, index) => (
          <Collapsible key={index} asChild>
            <ChildCollapsible item={item} />
            {/*<CollapsibleTrigger asChild>*/}
            {/*</CollapsibleTrigger>*/}
          </Collapsible>
        ))}
      </TableBody>
    </Table>
  )
}