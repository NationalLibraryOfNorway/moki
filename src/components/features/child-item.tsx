import {DigitizedItem} from "@/models/digitized-item.ts";
import {useEffect} from "react";

interface ChildItemProps {
  item: DigitizedItem;
}

export const ChildItem = (props: ChildItemProps) => {
  // Display a row of item data, which is a collapsible that opens up to a ProductionStatusDetails component

  useEffect(() => {
    console.log('ChildItem mounted');
  }, []);

  return (
    <>
      <div className="flex flex-row items-center gap-2.5">
        <p className="text-lg">{props.item.description}</p>
        <p className="text-lg">{props.item.status}</p>
      </div>
    </>
  )
};