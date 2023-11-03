function shuffleExceptFirst(array) {
  const firstElement = array[0];
  const restElements = array.slice(1);

  for (let i = restElements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [restElements[i], restElements[j]] = [restElements[j], restElements[i]];
  }

  return [firstElement, ...restElements];
}

module.exports = shuffleExceptFirst;
