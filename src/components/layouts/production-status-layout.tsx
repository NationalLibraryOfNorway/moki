import {useState} from "react";
import {DigitizedItem} from "@/models/digitized-item.ts";
import {ItemTable} from "@/components/features/item-table.tsx";
import {SearchInput} from "@/components/features/search-input.tsx";

export default function ProductionStatusLayout() {
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<DigitizedItem[]>([]);

  return (
    <div className="rounded-md w-full mx-auto">
      <div className="flex flex-col items-start my-5">
        <h1 className="text-2xl">Produksjonsstatus</h1>
        <p className="text-lg text-gray-500">Søk på strekkode for å se status</p>
      </div>
      <div className="flex flex-row items-baseline gap-2.5 my-2.5">
        <SearchInput
          searchInputValue={searchInputValue}
          setSearchInputValue={setSearchInputValue}
          setSearchResults={setSearchResults}
        />
      </div>
      <div className="w-full mx-3.5">
        { searchResults.length > 0 && (
          <ItemTable tableData={searchResults}/>
        )}
      </div>
    </div>
  )
}