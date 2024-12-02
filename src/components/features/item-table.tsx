import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.tsx";
import {CollapsibleCell} from "@/components/ui/collapsible-cell.tsx";
import {isSupportedMaterialType, itemIsFinished} from "@/services/production-data.ts";
import {LuFile, LuThumbsDown, LuThumbsUp} from "react-icons/lu";
import {DigitizedItem} from "@/models/digitized-item.ts";
import {ItemIdentifier} from "@/models/item-identifier.ts";
import {ProductionStatusDetails} from "@/components/features/production-status-details.tsx";
import {MaterialType} from "@/enums/material-type.ts";

interface ItemTableProps {
  tableData: DigitizedItem[];
}

export const ItemTable = (props: ItemTableProps) => {
  const getDokId = (identifiers?: ItemIdentifier[]): string | undefined => {
    if (!identifiers) return undefined;
    return identifiers?.find(i => i.name === 'bibsys_dokid_analog')?.value;
  }

  const displayChildItems = (item: DigitizedItem): boolean => {
    return (item.type === MaterialType.PeriodicalBundle || item.type === MaterialType.NewspaperBundle) && (item.childItems?.length ?? 0) > 0;
  }

  return (
    <Table className="">
      <TableCaption>Søkeresultater</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Søke-ID</TableHead>
          <TableHead>Navn</TableHead>
          <TableHead>DokID</TableHead>
          <TableHead>Materialtype</TableHead>
          <TableHead>Kan sendes videre? </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        { props.tableData.map((item, index) => (
          <Collapsible key={index} asChild>
            <>
              <TableRow className="hover:bg-muted/50">
                <CollapsibleCell className="text-start">{item.searchId}</CollapsibleCell>
                <CollapsibleCell className="text-start">{item.description}</CollapsibleCell>
                <CollapsibleCell className="text-start">{getDokId(item.identifiers)}</CollapsibleCell>
                <CollapsibleCell className="text-start">{item.type}</CollapsibleCell>
                <CollapsibleCell className="text-start">{
                  !isSupportedMaterialType(item?.plineId ?? -1) ? (
                    <LuFile size={24} />
                  ) : (
                    itemIsFinished(item) ?
                      <LuThumbsUp size={24} className="text-blue-500"/>
                      : <LuThumbsDown size={24} className="text-orange-500"/>
                  )
                }</CollapsibleCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5} className="p-0">
                  <CollapsibleContent asChild>
                    <div className="px-10 py-5 rounded-xl border-zinc-500 border bg-opacity-15 w-full">
                      <ProductionStatusDetails selectedObject={item}/>
                      {displayChildItems(item) && (
                        <div className="text-start px-10 py-5 rounded-xl border-zinc-500 border bg-accent/25 w-full">
                          <h1 className="text-lg">Hefter:</h1>
                          {item.childItems?.map((childItem, index) => (
                            <Collapsible className="w-full my-1.5">
                              <CollapsibleTrigger className="w-full rounded-xl border-zinc-500 bg-background border hover:bg-accent/50">
                                <div className="flex flex-row justify-start gap-2.5 p-2.5 m-1 rounded-2xl">
                                  <p className="text-md">{childItem.description}</p>
                                  <p className="text-md">{childItem.status}</p>
                                </div>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <div className="rounded-2xl p-2 bg-background border-zinc-500 border-x-2 border-b-2" >
                                  <ProductionStatusDetails selectedObject={childItem} key={index}/>
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          ))}
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </TableCell>
              </TableRow>
            </>
          </Collapsible>
        ))}
      </TableBody>
    </Table>

  )
}