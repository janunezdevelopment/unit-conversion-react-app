import { useMemo, useState } from "react";

function HistoryPanel({
  history,
  conversionTypeOptions,
  onReuseEntry,
  onDeleteEntry,
  onClearHistory,
}) {
  const [selectedType, setSelectedType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const hasHistory = history.length > 0;

  const filteredHistory = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return history.filter((entry) => {
      const matchesType =
        selectedType === "all" || entry.conversionType === selectedType;

      if (!matchesType) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const searchableEntry = [
        entry.input,
        entry.fromUnit,
        entry.toUnit,
        entry.result,
        entry.conversionType,
        entry.timestamp,
      ]
        .join(" ")
        .toLowerCase();

      return searchableEntry.includes(normalizedSearch);
    });
  }, [history, searchTerm, selectedType]);

  const hasFilteredHistory = filteredHistory.length > 0;

  return (
    <section className="history-panel" aria-label="Saved history">
      <div className="history-header">
        <h2>Saved History</h2>
        {hasHistory && (
          <button
            type="button"
            className="history-clear-btn"
            onClick={onClearHistory}
          >
            Clear all
          </button>
        )}
      </div>

      {!hasHistory && <p className="history-empty">No calculations yet.</p>}

      {hasHistory && (
        <div className="history-filters">
          <label htmlFor="history-type-filter" className="visually-hidden">
            Filter history by conversion type
          </label>
          <select
            id="history-type-filter"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All</option>
            {conversionTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <label htmlFor="history-search-filter" className="visually-hidden">
            Search history
          </label>
          <input
            id="history-search-filter"
            className="history-search-input"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter history"
          />
        </div>
      )}

      {hasHistory && hasFilteredHistory && (
        <ul className="history-list">
          {filteredHistory.map((entry) => (
            <li key={entry.id} className="history-item">
              <div className="history-item-text">
                <strong>{entry.input}</strong> {entry.fromUnit} to{" "}
                {entry.toUnit} =<strong> {entry.result}</strong>
                <span className="history-meta">
                  {entry.conversionType} - {entry.timestamp}
                </span>
              </div>
              <div className="history-actions">
                <button
                  type="button"
                  className="history-reuse-btn"
                  onClick={() => onReuseEntry(entry)}
                >
                  Reuse
                </button>
                <button
                  type="button"
                  className="history-delete-btn"
                  onClick={() => onDeleteEntry(entry.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {hasHistory && !hasFilteredHistory && (
        <p className="history-empty">No matching calculations.</p>
      )}
    </section>
  );
}

export default HistoryPanel;
