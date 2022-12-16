enum codeEnum {
  'cash',
  'thirdParty',
}

const codeMap = new Map<number, string>();
codeMap.set(codeEnum.cash, 'Cash');
codeMap.set(codeEnum.thirdParty, 'Third Party');

enum typeEnum {
  'credit',
  'debit',
}

const typeMap = new Map<number, string>();
typeMap.set(typeEnum.credit, 'Credit');
typeMap.set(typeEnum.debit, 'Debit');

enum modeEnum {
  'Offline',
  'Cod',
  'Cheque',
  'Draft',
  'Wired',
  'Online',
}

const modeMap = new Map<number, string>();
modeMap.set(modeEnum.Offline, 'Offline');
modeMap.set(modeEnum.Cod, 'Cash On Delivery');
modeMap.set(modeEnum.Cheque, 'Cheque');
modeMap.set(modeEnum.Draft, 'Draft');
modeMap.set(modeEnum.Wired, 'Wired');
modeMap.set(modeEnum.Online, 'Online');

enum statusEnum {
  'New',
  'Cancelled',
  'Failed',
  'Pending',
  'Declined',
  'Rejected',
  'Success' = 7,
}

const statusMap = new Map<number, string>();
statusMap.set(statusEnum.New, 'New');
statusMap.set(statusEnum.Cancelled, 'Cancelled');
statusMap.set(statusEnum.Failed, 'Failed');
statusMap.set(statusEnum.Pending, 'Pending');
statusMap.set(statusEnum.Declined, 'Declined');
statusMap.set(statusEnum.Rejected, 'Rejected');
statusMap.set(statusEnum.Success, 'Success');

export { codeEnum, codeMap, typeEnum, typeMap, modeEnum, modeMap, statusEnum, statusMap };
