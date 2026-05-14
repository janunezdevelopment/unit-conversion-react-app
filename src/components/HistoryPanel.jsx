function HistoryPanel({ history, onReuseEntry, onClearHistory }) {
  const hasHistory = history.length > 0;

  return (
    <section className="history-panel" aria-label="Calculation history">
      <div className="history-header">
        <h2>Calculation History</h2>
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
        <ul className="history-list">
          {history.map((entry) => (
            <li key={entry.id} className="history-item">
              <div className="history-item-text">
                <strong>{entry.input}</strong> {entry.fromUnit} to{" "}
                {entry.toUnit} =<strong> {entry.result}</strong>
                <span className="history-meta">
                  {entry.conversionType} - {entry.timestamp}
                </span>
              </div>
              <button
                type="button"
                className="history-reuse-btn"
                onClick={() => onReuseEntry(entry)}
              >
                Reuse
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default HistoryPanel;
