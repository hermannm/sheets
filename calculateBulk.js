function calculateBulk(items, bulkValues) {
  if (items.length !== bulkValues.length) {
    throw "Array inputs must be same length.";
  }
  const extractFirstItem = (item) => item[0];
  items = items.map(extractFirstItem);
  bulkValues = bulkValues.map(extractFirstItem);
  const backpackIndex =
    items.indexOf("Backpack") === -1
      ? items.indexOf("Adventurer's pack")
      : items.indexOf("Backpack");
  let wornBulk = 0;
  let backpackBulk = 0;
  for (let i = 0; i < bulkValues.length; i++) {
    let bulkValue = bulkValues[i];
    if (bulkValue === "L") {
      bulkValue = 0.1;
    } else if (bulkValue === "") {
      continue;
    } else {
      bulkValue = parseFloat(bulkValue);
    }
    const quantity = parseInt(items[i].match(/(?<=\()[0-9]+(?=\)$)/));
    if (quantity) {
      bulkValue *= quantity;
    }
    if (i < backpackIndex || backpackIndex === -1) {
      wornBulk += bulkValue;
    } else {
      backpackBulk += bulkValue;
    }
  }
  backpackBulk = Math.max(0, backpackBulk - 2);
  return wornBulk + backpackBulk;
}
