import {Textarea} from "@/components/ui/textarea.tsx";
import {DigitizedItem} from "@/models/digitized-item.ts";
import {searchItem} from "@/services/production-data.ts";
import {Button} from "@/components/ui/button.tsx";

interface SearchInputProps {
  searchInputValue: string;
  setSearchInputValue: (value: string) => void;
  setSearchResults: (results: DigitizedItem[]) => void;
}

export const SearchInput = (props: SearchInputProps) => {

  const searchItems = () => {
    const searchInputs = props.searchInputValue.split('\n').map(s => s.trim());
    const uniqueSearchInputs = Array.from(new Set(searchInputs));
    const tempData: DigitizedItem[] = [];
    Promise.all(uniqueSearchInputs.filter(Boolean).map(async searchTerm => {
      const normalizedSearchTerm = normalizeName(searchTerm);
      const item = await searchItem(normalizedSearchTerm);
      if (!item) {
        console.error(`Item ${normalizedSearchTerm} not found`);
      } else {
        tempData.push({...item, searchId: searchTerm});
      }
    })).then(() => {
      const sortedData = tempData.sort((a, b) => {
        if (!a.searchId || !b.searchId) {
          return 0;
        }
        return uniqueSearchInputs.indexOf(a.searchId) - uniqueSearchInputs.indexOf(b.searchId)
      });
      props.setSearchResults(sortedData);
    }).catch(err => {
      console.error('Error while fetching data: ', err)
    });
  }

  const normalizeName = (description: string): string => {
    const regex = /^(19|20)\d\d(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])\d{5}$/;
    if (regex.test(description)) {
      return 'digibok_' + description;
    }
    return description;
  }

  return (
    <>
      <Textarea
        placeholder="Søk på strekkode"
        className="w-1/3"
        value={props.searchInputValue}
        onChange={e => props.setSearchInputValue(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && e.ctrlKey) {
            searchItems();
          }
        }}
      />
      { props.searchInputValue.length > 0 && <Button className="rounded-2xl" onClick={searchItems}>Søk</Button> }
    </>

  )
};