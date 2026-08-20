async function testKarben() {
  const url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(`[out:json][timeout:10];
(
  node["shop"~"supermarket|convenience|chemist"](around:6000,50.231,8.769);
  way["shop"~"supermarket|convenience|chemist"](around:6000,50.231,8.769);
);
out center tags 25;`);

  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'GroceryDealsPlatform/1.0' } });
    const data = await res.json();
    const stores = data.elements.map(e => ({
      name: e.tags?.name || e.tags?.brand || 'Supermarkt',
      brand: e.tags?.brand || e.tags?.name,
      street: e.tags?.['addr:street'] ? `${e.tags['addr:street']} ${e.tags['addr:housenumber'] || ''}` : '',
      city: e.tags?.['addr:city'] || '',
      lat: e.lat || e.center?.lat,
      lon: e.lon || e.center?.lon
    })).filter(s => s.name);
    console.log(JSON.stringify(stores, null, 2));
  } catch (err) {
    console.error(err);
  }
}
testKarben();
