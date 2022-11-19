function exclude<T, Key extends keyof T>(
  entity: T,
  keys: Key[],
): Omit<T, Key> {
  const entityWithoutKeys = entity;

  keys.forEach((key) => delete entityWithoutKeys[key]);

  return entityWithoutKeys;
}

export default exclude;
