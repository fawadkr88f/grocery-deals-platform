import { LocationState, ShoppingListItem } from '../types';

const DEFAULT_LOCATION: LocationState = {
  address: 'DHA Phase 6, Lahore',
  latitude: 31.4697,
  longitude: 74.4107,
  radiusKm: 10
};

export async function getSavedLocation(): Promise<LocationState> {
  try {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      const data = await chrome.storage.local.get(['userLocation']);
      if (data.userLocation) return data.userLocation;
    } else {
      const local = localStorage.getItem('userLocation');
      if (local) return JSON.parse(local);
    }
  } catch (err) {
    console.error('Error reading saved location:', err);
  }
  return DEFAULT_LOCATION;
}

export async function saveLocation(loc: LocationState): Promise<void> {
  try {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      await chrome.storage.local.set({ userLocation: loc });
    } else {
      localStorage.setItem('userLocation', JSON.stringify(loc));
    }
  } catch (err) {
    console.error('Error saving location:', err);
  }
}

export async function getShoppingList(): Promise<ShoppingListItem[]> {
  try {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      const data = await chrome.storage.local.get(['shoppingList']);
      if (data.shoppingList) return data.shoppingList;
    } else {
      const local = localStorage.getItem('shoppingList');
      if (local) return JSON.parse(local);
    }
  } catch (err) {
    console.error('Error reading shopping list:', err);
  }
  return [
    { id: '1', name: 'Cooking Oil 5L', quantity: 1, checked: true },
    { id: '2', name: 'Basmati Rice 5kg', quantity: 1, checked: true },
    { id: '3', name: 'Milk 1L', quantity: 6, checked: true },
    { id: '4', name: 'Tapal Tea 950g', quantity: 1, checked: false }
  ];
}

export async function saveShoppingList(items: ShoppingListItem[]): Promise<void> {
  try {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      await chrome.storage.local.set({ shoppingList: items });
    } else {
      localStorage.setItem('shoppingList', JSON.stringify(items));
    }
  } catch (err) {
    console.error('Error saving shopping list:', err);
  }
}
