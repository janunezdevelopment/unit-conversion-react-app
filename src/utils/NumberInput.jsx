import React, { useState } from "react";

function NumberInput({ value = "", onChange }) {
  const [internalValue, setInternalValue] = useState("");
  const inputValue = onChange ? value : internalValue;

  const handleChange = (e) => {
    const val = e.target.value;

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
      value={inputValue}
      onChange={handleChange}
      placeholder="Type value here"
      inputMode="decimal"
      className="value-result-container"
    />
  );
}

export default NumberInput;
