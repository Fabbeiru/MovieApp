interface RecentSearchesProps {
  searches: string[];
  onSelect: (title: string) => void;
  label?: string;
}

function RecentSearches({ searches, onSelect, label = "Recent:" }: RecentSearchesProps) {
  return (
    <div className="recent-searches">
      <span className="recent-searches-label">{label}</span>
      {searches.map((title) => (
        <button key={title} className="chip" onClick={() => onSelect(title)}>{title}</button>
      ))}
    </div>
  );
}

export default RecentSearches;
