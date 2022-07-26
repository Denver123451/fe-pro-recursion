/**
 * Принимает два объекта, должна вернуть или true или false, если объекты идентичны внутри, возвращает
 * true, если есть различие, false. То есть проверяет каждое свойство, вне зависимости от вложенности,
 * делаем через рекурсию(а других вариантов и нет)
 */
export const deepEqual = (obj, anotherObject) => {
  return Object.entries(obj).every(([pr, val]) => {
    if (typeof val === 'object') {
      return deepEqual(val, anotherObject[pr]);
    } else {
      return val === anotherObject[pr];
    }
  });
};

/**
 * Принимает объект, возвращает его глубокую копию, то есть ни одно свойство
 * не является ссылочным у другого объекта, точно возвращает новое.
 * Если это массив, возвращает новый массив(map) и если элемент массива не простого типа,
 * то тогда в рекурсию. С объектом также. Поскольку массив при typeof возвращает object, чтобы
 * их различить берем метод Array.isArray и он на массивах вернет тру
 */
export const deepCopy = (obj) => {
  if (typeof obj === 'object' &&
    !Array.isArray(obj) &&
    obj !== null
  ) {
    let copiedObj = Object.assign({}, obj);
    Object.keys(copiedObj).forEach(key => {
      copiedObj[key] = deepCopy(copiedObj[key]);
    });
    return copiedObj;
  } else if (Array.isArray(obj)) {
    return obj.map(item => deepCopy(item));
  }

  return obj;

};

/**
 * Мы передаем объект, и должны вернуть массив уникальных названий свойств
 * То есть если у нас объект { name: { bohdan: { name: 'test' } } } вернет ['name', 'bohdan']
 */
export const getAllObjectKeys = (obj) => {
  if (typeof obj !== 'object') {
    return [];
  }

  return Array.from(new Set([...Object.keys(obj), ...[].concat(...Object.keys(obj).map(key => {
    return getAllObjectKeys(obj[key]);
  }))]));
};
