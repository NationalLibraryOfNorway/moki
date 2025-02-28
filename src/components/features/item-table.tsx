import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {CollapsibleCell} from "@/components/ui/collapsible-cell";
import {isSupportedMaterialType, itemIsFinished} from "@/services/production-data";
import {LuThumbsDown, LuThumbsUp} from "react-icons/lu";
import {DigitizedItem} from "@/models/digitized-item";
import {ItemIdentifier} from "@/models/item-identifier";
import {ProductionStatusDetails} from "@/components/features/production-status-details";
import {MaterialType} from "@/enums/material-type";
import {ReactElement} from "react";
import {toProperCase} from "@/lib/string-utils";

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

  const getThumbIconForItem = (item: DigitizedItem): ReactElement => {
    if (!isSupportedMaterialType(item.plineId ?? -1)) {
      return <span className="font-light">N/A</span>
    } else {
      return itemIsFinished(item) ?
        <LuThumbsUp size={24} className="text-blue-500"/> : <LuThumbsDown size={24} className="text-orange-500"/>
    }
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
          <TableHead className="text-center">Kan sendes videre?</TableHead>
          <TableHead className="text-center">Status</TableHead>
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
                <CollapsibleCell className="text-start">{toProperCase(item.type?.toString())}</CollapsibleCell>
                <CollapsibleCell className="text-center">{getThumbIconForItem(item)}</CollapsibleCell>
                <CollapsibleCell className="text-center"> {item.status}</CollapsibleCell>
              </TableRow>
              <TableRow className="border-0">
                <TableCell colSpan={6} className="p-0">
                  <CollapsibleContent asChild className="rounded-b-xl border-x border-b">
                    <div className="px-10 py-5 bg-opacity-15 w-full">
                      <ProductionStatusDetails selectedObject={item}/>
                      {displayChildItems(item) && (
                        <div className="text-start px-10 py-5 rounded-xl border-zinc-500 border bg-accent/10 w-full">
                          <h1 className="text-lg">Hefter:</h1>
                          {item.childItems?.map((childItem, index) => (
                            <Collapsible key={index} className="w-full my-1.5">
                              <CollapsibleTrigger className="w-full rounded-xl border-zinc-500 bg-white dark:bg-accent hover:bg-accent/50 shadow-md">
                                <div className="flex flex-row justify-start gap-2.5 p-2.5 m-1 rounded-2xl">
                                  <p className="text-md">{childItem.description}</p>
                                  <p className="text-md">{childItem.status}</p>
                                  <p className="text-md">{getThumbIconForItem(childItem)}</p>
                                </div>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <div className="rounded-b-xl p-2 px-5 bg-white dark:bg-accent shadow-md -translate-y-2.5">
                                  <ProductionStatusDetails selectedObject={childItem} />
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