export enum actived {
  'Added',
  'Ordered',
  'Pending',
  'Done',
}

const activedMap = new Map<number, string>();
activedMap.set(actived.Added, 'Added');
activedMap.set(actived.Ordered, 'Ordered');
activedMap.set(actived.Pending, 'Pending');
activedMap.set(actived.Done, 'Done');

export { activedMap };
