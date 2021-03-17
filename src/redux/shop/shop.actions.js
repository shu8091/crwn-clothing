import { ShopActionTypes } from './shop.types';

export const updateCollections = collectionsMap => ({
  type: ShopActionTypes.UPDATES_COLLECTIONS,
  payload: collectionsMap
});