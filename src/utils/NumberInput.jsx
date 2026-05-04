import React, { useState } from "react";

function NumberInput({ value = "", onChange }) {
  const [internalValue, setInternalValue] = useState("");
  const inputValue = onChange ? value : internalValue;

  const handleChange = (e) => {
    const val = e.target.value;

    if (val === "" || /^-?\d*\.?\d*$/.test(val)) {
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
      placeholder="Only numbers allowed"
      inputMode="decimal"
    />
  );
}

export default NumberInput;
