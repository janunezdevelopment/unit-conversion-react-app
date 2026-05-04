import staticData from "../staticData.json";

const { factors, imperialToMetricDefaults } = staticData;

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
