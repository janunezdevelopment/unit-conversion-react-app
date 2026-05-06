import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
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
          <NumberInput value={value} onChange={handleInputChange} />
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
            // styles={}
          />
        </div>
      </div>
    </main>
  );
}

export default ConversionMain;
