import {DigitizedItem} from "@/models/digitized-item";
import {ItemEvent} from "@/models/item-event";
import {ItemIdentifier} from "@/models/item-identifier";
import {MaterialType} from "@/enums/material-type";

const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH;

const fetchGet = async (url: string): Promise<Response> => {
  return fetch(`${baseUrl}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

const searchItem = async (searchQuery: string): Promise<DigitizedItem | undefined> => {
  let httpQuery: Promise<DigitizedItem>;

  if (isValidBarcode(searchQuery)) {
    httpQuery = fetchGet(`/api/proddb/barcode/${searchQuery}`).then(response => response.json() as Promise<DigitizedItem>);
  } else {
    httpQuery = fetchGet(`/api/proddb/${searchQuery}`).then(response => response.json() as Promise<DigitizedItem>);
  }

  return httpQuery.then(item => {
    if (item.id && (item.type === MaterialType.NewspaperBundle || item.type === MaterialType.PeriodicalBundle)) {
      return getRelatedItems(item.id).then(relatedItems => {
        item.childItems = relatedItems;
        return item;
      }).catch(err => {
        console.error(`Error fetching related items for ${item.id}:`, err);
        return item;
      });
    }
    return item;
  }).then(item => {
    if (!item.id) return item;
    return getEventsById(item.id).then(events => {
      item.events = events;
      return item;
    })
      .catch(err => {
        console.error(`Error fetching events for ${item.id}:`, err);
        return item;
      });
  }).then(item => {
    if (!item.id) return item;
    return getIdentifiersById(item.id).then(identifiers => {
      item.identifiers = identifiers;
      return item;
    })
      .catch(err => {
        console.error(`Error fetching identifiers for ${item.id}:`, err);
        return item;
      });
  }).catch(err => {
    console.error('Error while fetching data: ', err);
    return undefined;
  });
};

const getEventsById = async (id: number): Promise<ItemEvent[]> => {
  return fetchGet(`/api/proddb/${id}/events`).then(response => response.json() as Promise<ItemEvent[]>)
    .then(items => items.sort((a, b) => {
      if (a.stepId === undefined || b.stepId === undefined) return 0;
      return a.stepId - b.stepId;
    }));
};

const getRelatedItems = async (id: number): Promise<DigitizedItem[]> => {
  return fetchGet(`/api/proddb/${id}/children`).then(response => response.json() as Promise<DigitizedItem[]>);
};

const getIdentifiersById = async (id: number): Promise<ItemIdentifier[]> => {
  return fetchGet(`/api/proddb/${id}/identifiers`).then(response => response.json() as Promise<ItemIdentifier[]>);
};

const isSupportedMaterialType = (productionLineId: number): boolean => {
  return isDigitizedPeriodical(productionLineId) ||
        productionLineId === 16 ||  // Bøker - Ordinær bokløype
        productionLineId === 24 ||  // Bøker - Komplett fra POS
        productionLineId === 30 ||  // Bøker - Ordinær bokløype v2
        productionLineId === 32 ||  // Bøker - Komplett fra POS v2
        productionLineId === 39;    // Bøker - DFB Cover
};

const isDigitizedPeriodical = (productionLineId: number): boolean => {
  return productionLineId === 26 || // Demonteringsskanning v2 (Flere hefter)
        productionLineId === 27 ||      // POS og V-form skanning v2 (1) (Return m/omslag)
        productionLineId === 28 ||      // POS og demonteringsskanning v2 (Kassering m/omslag)
        productionLineId === 37;        // Tidsskrift - Komplett (Enkelthefte)
};

const itemIsFinished = (item: DigitizedItem): boolean => {
  switch (item.type) {
  case MaterialType.Book:
    return item.status === 'moveToPreservation.done' || item.status === 'AddToSearchIndex.done';
  case MaterialType.Periodical:
    return item.status === 'moveToPreservation.done' || item.status === 'AddToSearchIndex.done';
  case MaterialType.PeriodicalBundle:
    // If parent does not have split periodika as final status, return false
    if (item.status !== 'SplitPeriodika.done') {
      return false;
    }
    // If any child item does not have moveToPreservation.done or AddToSearchIndex.done, return false
    return item.childItems?.every(childItem => {
      return childItem.status === 'moveToPreservation.done' || childItem.status === 'AddToSearchIndex.done';
    }) ?? false;
  default:
    return false;
  }
};

const isValidBarcode = (barcode: string): boolean => {
  const barcodeVariant1 = new RegExp('^\\d{2}[a-zA-Z]{1,2}\\d{5}$');
  const barcodeVariant2 = new RegExp('^\\d{2}[a-zA-Z]\\d{6}$');
  const barcodeVariant3 = new RegExp('^h\\d{2}[a-zA-Z]\\d{5}$|^h\\d{8}$')
  return barcodeVariant1.test(barcode) || barcodeVariant2.test(barcode) || barcodeVariant3.test(barcode);
};

export { searchItem, getEventsById, getRelatedItems, getIdentifiersById, isSupportedMaterialType, isDigitizedPeriodical, itemIsFinished };