# Unit Conversion React App

## Project Overview

This project is a React + Vite web application for converting between imperial and metric units. The app is designed to be compact, accessible, and practical for quick calculations with saved history for reuse.

### High-level goals

- Convert common values across multiple unit categories quickly and accurately.
- Support both live calculation and reusable saved entries.
- Keep conversion definitions centralized and easy to extend.
- Provide a responsive UI with accessible controls and keyboard-friendly behavior.

### Primary technologies

- React 19
- Vite
- JavaScript (ES modules)
- CSS for styling and layout
- Browser localStorage for persistence of recent calculation history

---

## Architecture & Structure

### Main application entry

- Root app component: `src/App.jsx`
- Renders the header and main conversion UI.

### Core component layout

| Area                   | File                                | Purpose                                                                       |
| ---------------------- | ----------------------------------- | ----------------------------------------------------------------------------- |
| Header                 | `src/components/Header.jsx`         | Top-level app title/header                                                    |
| Main conversion UI     | `src/components/ConversionMain.jsx` | Handles user input, conversion logic, save actions, and history drawer        |
| History panel          | `src/components/HistoryPanel.jsx`   | Displays saved conversions, filters, search, reuse, delete, and clear actions |
| Unit conversion engine | `src/utils/convertUnits.js`         | Converts values by unit type and validates input                              |
| Number input wrapper   | `src/utils/NumberInput.jsx`         | Input control for numeric values                                              |
| Static data source     | `src/staticData.json`               | Centralized conversion definitions, types, default units, and factor tables   |
| Global styling         | `src/index.css`                     | Layout, responsive styling, buttons, history panel, and visual states         |

### Functional design

- The app keeps conversion types and unit metadata in `staticData.json`.
- `ConversionMain` is the main stateful component and owns the current conversion, result, and saved history.
- `ConvertUnits` is the single source of truth for conversion math.
- History entries are stored in `localStorage` under the key `calculationHistory` and are capped at 50 entries.

### Supported conversion categories

- Length
- Mass
- Temperature
- Area
- Volume

### Default conversion mappings

| Type        | Default From | Default To |
| ----------- | ------------ | ---------- |
| Length      | `ft`         | `m`        |
| Mass        | `lb`         | `kg`       |
| Temperature | `F`          | `C`        |
| Area        | `ft2`        | `m2`       |
| Volume      | `gal`        | `L`        |

---

## Key Decisions & Guidelines

### Coding standards and conventions

- Prefer functional React components with hooks (`useState`, `useMemo`).
- Keep business logic in utilities rather than embedding it directly in components.
- Use `staticData.json` for large static metadata instead of hardcoding conversion options in multiple places.
- Keep the UI accessible with labels, `aria-live` for the result, and `aria-expanded`/`aria-controls` for history toggling.

### Design rules and constraints

- Conversion values are evaluated in real time as the user edits input.
- Empty input clears the result without error.
- Invalid numeric values throw a guarded error message from the conversion utility.
- Saving a history entry prevents duplicates by matching the same input, units, conversion type, and result.
- History panels support filtering by type and free-text search.
- Results are displayed as a string with 2 decimal places when valid.

### Data model considerations

- Conversion definitions must remain structurally consistent with `staticData.json`.
- Any new unit type added to the JSON requires matching entries in:
  - `conversionTypeOptions`
  - `unitOptionsByType`
  - `defaultUnits`
  - `factors`
  - `imperialToMetricDefaults` (if applicable)
- `ConvertUnits` assumes that temperature conversion is handled separately from other unit families.

### UX and persistence decisions

- History is intentionally capped at 50 entries to avoid unbounded local storage growth.
- Users can reuse or delete one history item or clear the entire history.
- The history panel can be toggled from the main interface and closes on mobile when a saved entry is reused.

---

## Current State & Todo List

### Completed features

- Multi-category unit conversion engine
- Selectable conversion type dropdown
- Live conversion result updates
- Swap-unit button and clear action
- Save calculation to history
- History drawer with filtering and search
- Reuse and delete saved entries
- Clear all history
- localStorage persistence
- Responsive interface and accessible labels

### Immediate next steps

- Review and polish styling for final UI consistency.
- Add automated test coverage for conversion edge cases and duplicate-save logic.
- Consider expanding validation around unsupported unit combinations and edge values.
- Improve accessibility further if additional controls are introduced.
- Evaluate whether more conversion categories or better unit groupings should be added.

### Suggested backlog items

- Add tests for temperature conversions and area/volume calculations.
- Validate behavior for very large or very small numbers.
- Add optional copy-to-clipboard or export for saved rows.
- Improve mobile history interaction and animation polish.

---

## AI Agent Context

### What an AI should know before continuing work

- This is a small, single-page React app focused on unit conversion, not a large app framework.
- The primary business logic lives in `src/utils/convertUnits.js`, so changes to conversion rules should be made there or in `src/staticData.json`.
- `ConversionMain.jsx` owns most of the state and user interactions; it is the best place to add UI behaviors and state changes.
- The app stores saved calculations in browser localStorage and expects those entries to remain JSON-serializable.
- Do not break the shape of `staticData.json`; it is used directly by the UI and conversion engine.

### Important implementation notes

- `ConvertUnits` accepts either:
  1. a value + `fromUnit` + `toUnit` + `type`, or
  2. a value + a type alias for default conversions when the default mapping is known.
- Temperature conversion is separate from linear unit conversion and uses a dedicated branch in `convertUnits.js`.
- `NumberInput` should continue to handle numeric input consistently; invalid or empty inputs should be treated gracefully.
- History entries include `id`, `input`, `fromUnit`, `toUnit`, `result`, `conversionType`, and `timestamp`.

### Working assumptions

- This project is meant to remain lightweight and easy to reason about.
- Default units are intended to feel familiar for common conversions (imperial-to-metric defaults).
- The UI should remain accessible and progressive without requiring heavy libraries or frameworks.

### Recommended continuation pattern

When modifying the app, keep these priorities in order:

1. Preserve the conversion data contract in `src/staticData.json`.
2. Update the functional logic in `src/utils/convertUnits.js` when changing math rules.
3. Adjust `src/components/ConversionMain.jsx` for UI behavior and state flow.
4. Keep styling changes limited to `src/index.css` unless a new component clearly needs its own styles.
5. Verify the app still works as a quick conversion tool with saved history and no regressions in basic user flows.

---

## Summary

This project is a focused React unit-conversion app with a modular data-driven design, reusable conversion logic, and a saved history feature. The app currently supports five conversion categories and is organized around a small set of reusable components and a centralized static data source. The main priorities for future work are UI polish, accessibility, and validation/test coverage while preserving the existing architecture and conversion contract.
