// Conversion factors to SI base unit for each category.
// Temperature is handled separately (non-linear formulas).

const factors = {
  // Length → meters
  length: {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.344,
  },
  // Mass → kilograms
  mass: {
    mg: 0.000001,
    g: 0.001,
    kg: 1,
    t: 1000,
    oz: 0.02834952,
    lb: 0.45359237,
  },
  // Area → square meters
  area: {
    mm2: 0.000001,
    cm2: 0.0001,
    m2: 1,
    km2: 1000000,
    in2: 0.00064516,
    ft2: 0.09290304,
    yd2: 0.83612736,
    ac: 4046.8564224,
    ha: 10000,
  },
  // Volume → liters
  volume: {
    ml: 0.001,
    L: 1,
    m3: 1000,
    tsp: 0.00492892,
    tbsp: 0.01478676,
    fl_oz: 0.02957353,
    cup: 0.2365882,
    pt: 0.4731765,
    qt: 0.9463529,
    gal: 3.785412,
  },
};

const imperialToMetricDefaults = {
  length: { from: "ft", to: "m" },
  mass: { from: "lb", to: "kg" },
  temperature: { from: "F", to: "C" },
  area: { from: "ft2", to: "m2" },
  volume: { from: "gal", to: "L" },
};

// Convert temperature between C, F, K
function convertTemperature(value, fromUnit, toUnit) {
  let celsius;
  switch (fromUnit) {
    case "C":
      celsius = value;
      break;
    case "F":
      celsius = (value - 32) * (5 / 9);
      break;
    case "K":
      celsius = value - 273.15;
      break;
    default:
      throw new Error(`Unsupported temperature unit: ${fromUnit}`);
  }
  switch (toUnit) {
    case "C":
      return celsius;
    case "F":
      return celsius * (9 / 5) + 32;
    case "K":
      return celsius + 273.15;
    default:
      throw new Error(`Unsupported temperature unit: ${toUnit}`);
  }
}

function ConvertUnits(value, fromUnitOrType, toUnit, conversionType) {
  const numericValue = Number(value);
  let fromUnit = fromUnitOrType;
  let targetUnit = toUnit;
  let type = conversionType;

  if (
    type === undefined &&
    targetUnit === undefined &&
    imperialToMetricDefaults[fromUnitOrType]
  ) {
    type = fromUnitOrType;
    fromUnit = imperialToMetricDefaults[type].from;
    targetUnit = imperialToMetricDefaults[type].to;
  }

  if (!Number.isFinite(numericValue)) {
    throw new Error("Value must be a valid number.");
  }

  if (type === "temperature") {
    return convertTemperature(numericValue, fromUnit, targetUnit);
  }

  const unitMap = factors[type];
  if (!unitMap) {
    throw new Error(`Unsupported conversion type: ${type}`);
  }

  const fromFactor = unitMap[fromUnit];
  const toFactor = unitMap[targetUnit];

  if (fromFactor === undefined) {
    throw new Error(`Unsupported unit "${fromUnit}" for type "${type}".`);
  }
  if (toFactor === undefined) {
    throw new Error(`Unsupported unit "${targetUnit}" for type "${type}".`);
  }

  // Convert to base unit, then to target unit
  return (numericValue * fromFactor) / toFactor;
}

export default ConvertUnits;
