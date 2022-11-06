enum cartStatus {
  INACTIVE,
  ACTIVE,
}

const cartStatusMap = new Map<number, string>([
  [cartStatus.INACTIVE, 'INACTIVE'],
  [cartStatus.ACTIVE, 'ACTIVE'],
]);

export { cartStatus, cartStatusMap };
