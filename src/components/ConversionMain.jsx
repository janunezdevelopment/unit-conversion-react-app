import { useState } from "react";
import Select from "react-select";
import NumberInput from "../utils/NumberInput";
import ConvertUnits from "../utils/ConvertUnits";

const unitOptionsByType = {
  length: [
    { value: "mm", label: "Millimeter" },
    { value: "cm", label: "Centimeter" },
    { value: "m", label: "Meter" },
    { value: "km", label: "Kilometer" },
    { value: "in", label: "Inch" },
    { value: "ft", label: "Foot" },
    { value: "yd", label: "Yard" },
    { value: "mi", label: "Mile" },
  ],
  mass: [
    { value: "mg", label: "Milligram" },
    { value: "g", label: "Gram" },
    { value: "kg", label: "Kilogram" },
    { value: "t", label: "Metric Ton" },
    { value: "oz", label: "Ounce" },
    { value: "lb", label: "Pound" },
  ],
  temperature: [
    { value: "C", label: "Celsius" },
    { value: "F", label: "Fahrenheit" },
    { value: "K", label: "Kelvin" },
  ],
  area: [
    { value: "mm2", label: "Square Millimeter" },
    { value: "cm2", label: "Square Centimeter" },
    { value: "m2", label: "Square Meter" },
    { value: "km2", label: "Square Kilometer" },
    { value: "in2", label: "Square Inch" },
    { value: "ft2", label: "Square Foot" },
    { value: "yd2", label: "Square Yard" },
    { value: "ac", label: "Acre" },
    { value: "ha", label: "Hectare" },
  ],
  volume: [
    { value: "ml", label: "Milliliter" },
    { value: "L", label: "Liter" },
    { value: "m3", label: "Cubic Meter" },
    { value: "tsp", label: "Teaspoon" },
    { value: "tbsp", label: "Tablespoon" },
    { value: "fl_oz", label: "Fluid Ounce" },
    { value: "cup", label: "Cup" },
    { value: "pt", label: "Pint" },
    { value: "qt", label: "Quart" },
    { value: "gal", label: "Gallon" },
  ],
};

const defaultUnits = {
  length: { from: "ft", to: "m" },
  mass: { from: "lb", to: "kg" },
  temperature: { from: "F", to: "C" },
  area: { from: "ft2", to: "m2" },
  volume: { from: "gal", to: "L" },
};

const conversionTypeOptions = [
  { value: "length", label: "Length" },
  { value: "mass", label: "Mass" },
  { value: "temperature", label: "Temperature" },
  { value: "area", label: "Area" },
  { value: "volume", label: "Volume" },
];

function ConversionMain() {
  const [conversionType, setConversionType] = useState("length");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [fromUnit, setFromUnit] = useState(defaultUnits.length.from);
  const [toUnit, setToUnit] = useState(defaultUnits.length.to);

  const handleConvert = (
    inputValue = value,
    from = fromUnit,
    to = toUnit,
    type = conversionType,
  ) => {
    if (inputValue === "") {
      setResult("");
      return;
    }
    try {
      const converted = ConvertUnits(inputValue, from, to, type);
      setResult(converted.toFixed(4));
    } catch (error) {
      setResult(error.message);
    }
  };

  const handleInputChange = (newValue) => {
    setValue(newValue);
    handleConvert(newValue, fromUnit, toUnit, conversionType);
  };

  const handleTypeChange = (selected) => {
    const selectedType = selected.value;
    const newFrom = defaultUnits[selectedType].from;
    const newTo = defaultUnits[selectedType].to;
    setConversionType(selectedType);
    setFromUnit(newFrom);
    setToUnit(newTo);
    handleConvert(value, newFrom, newTo, selectedType);
  };

  const handleFromUnitChange = (selected) => {
    setFromUnit(selected.value);
    handleConvert(value, selected.value, toUnit, conversionType);
  };

  const handleToUnitChange = (selected) => {
    setToUnit(selected.value);
    handleConvert(value, fromUnit, selected.value, conversionType);
  };

  const unitOptions = unitOptionsByType[conversionType];

  return (
    <main>
      <Select
        options={conversionTypeOptions}
        value={conversionTypeOptions.find((o) => o.value === conversionType)}
        onChange={handleTypeChange}
      />
      <div className="conversion-area">
        <div className="input">
          <NumberInput
            value={value}
            onChange={handleInputChange}
            className="value-result-container"
          />
          <Select
            options={unitOptions}
            value={unitOptions.find((o) => o.value === fromUnit)}
            onChange={handleFromUnitChange}
          />
        </div>
        <span>=</span>
        <div className="output">
          <div className="value-result-container">{result}</div>
          <Select
            options={unitOptions}
            value={unitOptions.find((o) => o.value === toUnit)}
            onChange={handleToUnitChange}
          />
        </div>
      </div>
    </main>
  );
}

export default ConversionMain;
