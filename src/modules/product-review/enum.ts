enum published {
  'nonPublic',
  'public',
}

const publishedMap = new Map<number, string>();
publishedMap.set(published.nonPublic, 'Non-Public');
publishedMap.set(published.public, 'Public');

export { published, publishedMap };
