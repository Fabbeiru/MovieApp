interface RecentSearchesProps {
  searches: string[];
  onSelect: (title: string) => void;
}

function RecentSearches({ searches, onSelect }: RecentSearchesProps) {
  return (
    <div className="recent-searches">
      <span className="recent-searches-label">Recent:</span>
      {searches.map((title) => (
        <button key={title} className="chip" onClick={() => onSelect(title)}>{title}</button>
      ))}
    </div>
  );
}

export default RecentSearches;
