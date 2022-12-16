enum statusEnum {
  New,
  Cart,
  Checkout,
  Paid,
  Complete,
  Abandoned,
}

const statusMap = new Map<number, string>([
  [statusEnum.New, '.New'],
  [statusEnum.Cart, '.Cart'],
  [statusEnum.Checkout, '.Checkout'],
  [statusEnum.Paid, '.Paid'],
  [statusEnum.Complete, '.Complete'],
  [statusEnum.Abandoned, '.Abandoned'],
]);

export { statusEnum, statusMap };
