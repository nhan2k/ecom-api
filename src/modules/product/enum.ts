enum shop {
  'unavailable',
  'available',
}

const shopMap = new Map<number, string>();
shopMap.set(shop.available, 'available');
shopMap.set(shop.unavailable, 'unavailable');

export { shop, shopMap };
