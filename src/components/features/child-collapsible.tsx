import {ReactElement} from "react";
import {TableCell, TableRow} from "@/components/ui/table";
import {CollapsibleCell} from "@/components/ui/collapsible-cell";
import {toProperCase} from "@/lib/string-utils";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {ProductionStatusDetails} from "@/components/features/production-status-details";
import {DigitizedItem} from "@/models/digitized-item";
import {ItemIdentifier} from "@/models/item-identifier";
import {MaterialType} from "@/enums/material-type";
import {isSupportedMaterialType, itemIsFinished} from "@/services/production-data";
import {LuThumbsDown, LuThumbsUp} from "react-icons/lu";
import {IconType} from "react-icons";

interface ChildCollapsibleProps {
  item: DigitizedItem;
}

export const ChildCollapsible = (
  {item}: ChildCollapsibleProps
) => {
  const getDokId = (identifiers?: ItemIdentifier[]): string | undefined => {
    if (!identifiers) return undefined;
    return identifiers?.find(i => i.name === 'bibsys_dokid_analog')?.value;
  }

  const displayChildItems = (item: DigitizedItem): boolean => {
    return (item.type === MaterialType.PeriodicalBundle || item.type === MaterialType.NewspaperBundle) && (item.childItems?.length ?? 0) > 0;
  }

  const getThumbIconForItem = (item: DigitizedItem): ReactElement<HTMLSpanElement | IconType> => {
    if (!isSupportedMaterialType(item.plineId ?? -1)) {
      return <span className="font-light">N/A</span>
    } else {
      return itemIsFinished(item) ?
        <LuThumbsUp size={24} className="text-blue-500"/> : <LuThumbsDown size={24} className="text-orange-500"/>
    }
  }

  return (
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
            <div className="px-10 py-5 w-full">
              <ProductionStatusDetails selectedObject={item}/>
              {displayChildItems(item) && (
                <div className="text-start px-10 py-5 rounded-xl border-zinc-500 border bg-accent/20 w-full">
                  <h1 className="text-lg">Hefter:</h1>
                  {item.childItems?.map((childItem, index) => (
                    <Collapsible key={index} className="w-full my-1.5">
                      <CollapsibleTrigger className="w-full rounded-xl border-zinc-500 bg-white dark:bg-accent hover:cursor-pointer hover:bg-muted/50 shadow-md">
                        <div className="flex flex-row justify-start gap-2.5 p-2.5 m-1 rounded-2xl ">
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
  );
};
