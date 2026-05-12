import React, { useState } from "react";

function NumberInput({ value = "", onChange }) {
  const [internalValue, setInternalValue] = useState("");
  const inputValue = onChange ? value : internalValue;

  const formatWithCommas = (rawValue) => {
    if (
      rawValue === "" ||
      rawValue === "-" ||
      rawValue === "." ||
      rawValue === "-."
    ) {
      return rawValue;
    }

    const isNegative = rawValue.startsWith("-");
    const unsignedValue = isNegative ? rawValue.slice(1) : rawValue;
    const [integerPart, decimalPart] = unsignedValue.split(".");
    const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    let formatted = `${isNegative ? "-" : ""}${integerWithCommas}`;
    if (unsignedValue.includes(".")) {
      formatted += `.${decimalPart ?? ""}`;
    }

    return formatted;
  };

  const handleChange = (e) => {
    const val = e.target.value.replace(/,/g, "");

    if (val === "" || /^-?\d*\.?\d{0,2}$/.test(val)) {
      if (onChange) {
        onChange(val);
        return;
      }

      setInternalValue(val);
    }
  };

  return (
    <input
      type="text"
      value={formatWithCommas(inputValue)}
      onChange={handleChange}
      placeholder="Type value"
      inputMode="decimal"
      className="value-result-container"
    />
  );
}

export default NumberInput;
