enum activeEnum {
  'notExist',
  'existed',
}

const activedMap = new Map<number, string>();
activedMap.set(activeEnum.notExist, 'notExist');
activedMap.set(activeEnum.existed, 'existed');

export { activeEnum, activedMap };
