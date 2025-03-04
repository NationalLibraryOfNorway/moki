import {Textarea} from "@/components/ui/shadcn/textarea";
import {DigitizedItem} from "@/models/digitized-item";
import {searchItem} from "@/services/production-data";
import {Button} from "@/components/ui/shadcn/button";
import {FaMagnifyingGlass} from "react-icons/fa6";

interface SearchInputProps {
  searchInputValue: string;
  setSearchInputValue: (value: string) => void;
  setSearchResults: (results: DigitizedItem[]) => void;
  setNotFoundIds: (ids: string[]) => void;
}

export const SearchInput = (props: SearchInputProps) => {

  const searchItems = () => {
    props.setNotFoundIds([]);
    const searchInputs = props.searchInputValue.split('\n').map(s => s.trim());
    const uniqueSearchInputs = Array.from(new Set(searchInputs));
    const tempData: DigitizedItem[] = [];
    const tempNotFoundIds: string[] = [];

    Promise.all(uniqueSearchInputs.filter(Boolean).map(async searchTerm => {
      const normalizedSearchTerm = normalizeName(searchTerm);
      const item = await searchItem(normalizedSearchTerm);
      if (!item) {
        console.error(`Item ${normalizedSearchTerm} not found`);
        tempNotFoundIds.push(normalizedSearchTerm);
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
      handleNotFoundId(tempNotFoundIds);
    }).catch(err => {
      console.error('Error while fetching data: ', err)
    });
  }

  const handleNotFoundId = (id: string[]) => {
    if (id.length === 0) {
      props.setNotFoundIds([]);
      return;
    }
    const uniqueIds = Array.from(new Set([...id]));
    props.setNotFoundIds(uniqueIds);
  }

  const normalizeName = (description: string): string => {
    const regex = /^(19|20)\d\d(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])\d{5}$/;
    if (regex.test(description)) {
      return 'digibok_' + description;
    }
    return description;
  }

  const rowHeight = (): number => {
    return props.searchInputValue.split('\n').length + 1;
  }

  return (
    <>
      <Textarea
        placeholder="Søk på strekkode"
        className="w-1/2"
        autoFocus={true}
        rows={rowHeight()}
        value={props.searchInputValue}
        onChange={e => props.setSearchInputValue(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && e.ctrlKey) {
            searchItems();
          }
        }}
      />
      <Button className="rounded-2xl" onClick={searchItems}><FaMagnifyingGlass/>Søk</Button>
    </>

  )
};