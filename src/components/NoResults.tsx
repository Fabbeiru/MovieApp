interface NoResultsProps {
  message: string;
}

function NoResults({ message }: NoResultsProps) {
  return (
    <div className="no-results" role="status">
      <span className="no-results-icon" aria-hidden="true">🎬</span>
      <p>{message}</p>
    </div>
  );
}

export default NoResults;
