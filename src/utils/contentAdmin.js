const isPlainObject = (value) =>
  Boolean(value) && typeof value === "object" && !Array.isArray(value);

const isNumericSegment = (segment) => /^\d+$/.test(segment);

const cloneValue = (value) => JSON.parse(JSON.stringify(value));

export const flattenStringLeaves = (value, currentPath = "") => {
  if (typeof value === "string") {
    return [{ path: currentPath, value }];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      flattenStringLeaves(item, currentPath ? `${currentPath}.${index}` : `${index}`),
    );
  }

  if (isPlainObject(value)) {
    return Object.entries(value).flatMap(([key, nestedValue]) =>
      flattenStringLeaves(nestedValue, currentPath ? `${currentPath}.${key}` : key),
    );
  }

  return [];
};

export const getValueByPath = (source, path) => {
  if (!path) {
    return source;
  }

  return path.split(".").reduce((current, segment) => {
    if (current == null) {
      return undefined;
    }

    if (Array.isArray(current)) {
      return current[Number(segment)];
    }

    return current[segment];
  }, source);
};

export const setValueByPath = (source, path, value) => {
  const segments = path.split(".");
  let current = source;

  segments.forEach((segment, index) => {
    const isLast = index === segments.length - 1;
    const nextSegment = segments[index + 1];

    if (isLast) {
      if (Array.isArray(current)) {
        current[Number(segment)] = value;
      } else {
        current[segment] = value;
      }
      return;
    }

    const nextContainer = isNumericSegment(nextSegment) ? [] : {};

    if (Array.isArray(current)) {
      const targetIndex = Number(segment);
      current[targetIndex] ??= nextContainer;
      current = current[targetIndex];
      return;
    }

    current[segment] ??= nextContainer;
    current = current[segment];
  });
};

export const applyFlatOverrides = (baseTranslations, overrides = {}) => {
  const nextTranslations = cloneValue(baseTranslations);

  Object.entries(overrides).forEach(([path, value]) => {
    if (typeof value === "string" && path) {
      setValueByPath(nextTranslations, path, value);
    }
  });

  return nextTranslations;
};
