import { useState } from "react";
import NumberInput from "../utils/NumberInput";
import ConvertUnits from "../utils/convertUnits";
import staticData from "../staticData.json";

const { unitOptionsByType, defaultUnits, conversionTypeOptions } = staticData;

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
      setResult(converted.toFixed(2));
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
      <select
        value={conversionType}
        onChange={(e) => handleTypeChange({ value: e.target.value })}
      >
        {conversionTypeOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <div className="conversion-area">
        <div className="input">
          <NumberInput value={value} onChange={handleInputChange} />
          <select
            value={fromUnit}
            onChange={(e) => handleFromUnitChange({ value: e.target.value })}
          >
            {unitOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <span>=</span>
        <div className="output">
          <div className="value-result-container">{result}</div>
          <select
            value={toUnit}
            onChange={(e) => handleToUnitChange({ value: e.target.value })}
          >
            {unitOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </main>
  );
}

export default ConversionMain;
