enum statusEnum {
  'New',
  'Checkout',
  'Paid',
  'Failed',
  'Shipped',
  'Delivered',
  'Returned',
  'Complete',
}

const statusMap = new Map<number, string>();
statusMap.set(statusEnum.New, 'New');
statusMap.set(statusEnum.Checkout, 'Checkout');
statusMap.set(statusEnum.Paid, 'Paid');
statusMap.set(statusEnum.Failed, 'Failed');
statusMap.set(statusEnum.Shipped, 'Shipped');
statusMap.set(statusEnum.Delivered, 'Delivered');
statusMap.set(statusEnum.Returned, 'Returned');
statusMap.set(statusEnum.Complete, 'Complete');

export { statusEnum, statusMap };
