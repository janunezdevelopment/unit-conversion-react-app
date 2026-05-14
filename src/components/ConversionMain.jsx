import { useState } from "react";
import NumberInput from "../utils/NumberInput";
import HistoryPanel from "./HistoryPanel";
import ConvertUnits from "../utils/convertUnits";
import staticData from "../staticData.json";

const { unitOptionsByType, defaultUnits, conversionTypeOptions } = staticData;
const HISTORY_LIMIT = 50;

function ConversionMain() {
  const [conversionType, setConversionType] = useState("length");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [fromUnit, setFromUnit] = useState(defaultUnits.length.from);
  const [toUnit, setToUnit] = useState(defaultUnits.length.to);
  const [history, setHistory] = useState(() => {
    try {
      const savedHistory = localStorage.getItem("calculationHistory");
      return savedHistory
        ? JSON.parse(savedHistory).slice(0, HISTORY_LIMIT)
        : [];
    } catch {
      return [];
    }
  });

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

  const handleReuseEntry = (entry) => {
    setConversionType(entry.conversionType);
    setFromUnit(entry.fromUnit);
    setToUnit(entry.toUnit);
    setValue(entry.input);
    handleConvert(
      entry.input,
      entry.fromUnit,
      entry.toUnit,
      entry.conversionType,
    );
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("calculationHistory");
  };

  const handleDeleteHistoryEntry = (entryId) => {
    const updatedHistory = history.filter((entry) => entry.id !== entryId);
    setHistory(updatedHistory);
    localStorage.setItem("calculationHistory", JSON.stringify(updatedHistory));
  };

  const unitOptions = unitOptionsByType[conversionType];

  return (
    <>
      <main>
        <label htmlFor="conversion-type" className="visually-hidden">
          Conversion type
        </label>
        <select
          id="conversion-type"
          value={conversionType}
          onChange={(e) => handleTypeChange({ value: e.target.value })}
          className="first-select"
        >
          {conversionTypeOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <div className="conversion-area">
          <div className="input-area">
            <label htmlFor="input-value" className="visually-hidden">
              Value to convert
            </label>
            <NumberInput
              id="input-value"
              value={value}
              onChange={handleInputChange}
            />
            <label htmlFor="from-unit" className="visually-hidden">
              From unit
            </label>
            <select
              id="from-unit"
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
          <span aria-hidden="true">=</span>
          <div className="output-area">
            <div
              className="value-result-container"
              role="status"
              aria-live="polite"
              aria-atomic="true"
              aria-label="Conversion result"
            >
              {result}
            </div>
            <label htmlFor="to-unit" className="visually-hidden">
              To unit
            </label>
            <select
              id="to-unit"
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
        <button
          type="button"
          className="save-history-btn"
          onClick={() => {
            const newEntry = {
              id: Date.now(), // unique identifier
              input: value,
              fromUnit: fromUnit,
              toUnit: toUnit,
              result: result,
              conversionType: conversionType,
              timestamp: new Date().toLocaleString(),
            };
            const updatedHistory = [newEntry, ...history].slice(
              0,
              HISTORY_LIMIT,
            );
            setHistory(updatedHistory);
            localStorage.setItem(
              "calculationHistory",
              JSON.stringify(updatedHistory),
            );
          }}
        >
          Save for later
        </button>
      </main>

      <HistoryPanel
        history={history}
        conversionTypeOptions={conversionTypeOptions}
        onReuseEntry={handleReuseEntry}
        onDeleteEntry={handleDeleteHistoryEntry}
        onClearHistory={handleClearHistory}
      />
    </>
  );
}

export default ConversionMain;
