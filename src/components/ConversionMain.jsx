import NumberInput from "../utils/NumberInput";
import { useState } from "react";
import ConvertUnits from "../utils/ConvertUnits";

function ConversionMain() {
  const [conversionType, setConversionType] = useState("length");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const imperialToMetricConfig = {
    length: { from: "ft", to: "m", fromLabel: "ft", toLabel: "m" },
    mass: { from: "lb", to: "kg", fromLabel: "lb", toLabel: "kg" },
    temperature: { from: "F", to: "C", fromLabel: "°F", toLabel: "°C" },
    area: { from: "ft2", to: "m2", fromLabel: "ft²", toLabel: "m²" },
    volume: { from: "gal", to: "L", fromLabel: "gal", toLabel: "L" },
  };

  const handleConvert = () => {
    const config = imperialToMetricConfig[conversionType];

    if (!config) {
      setResult("Select a conversion type.");
      return;
    }

    try {
      const convertedValue = ConvertUnits(
        value,
        config.from,
        config.to,
        conversionType,
      );

      setResult(
        `${value} ${config.fromLabel} = ${convertedValue.toFixed(4)} ${config.toLabel}`,
      );
    } catch (error) {
      setResult(error.message);
    }
  };

  return (
    <>
      <select
        value={conversionType}
        onChange={(e) => setConversionType(e.target.value)}
      >
        <option value="length">Length</option>
        <option value="mass">Mass</option>
        <option value="temperature">Temperature</option>
        <option value="area">Area</option>
        <option value="volume">Volume</option>
      </select>
      <div id="conversion-area">
        <NumberInput value={value} onChange={setValue} />
        <button onClick={handleConvert}>Convert</button>
        <div id="result">{result}</div>
      </div>
    </>
  );
}

export default ConversionMain;
