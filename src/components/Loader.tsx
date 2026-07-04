interface LoaderProps {
  count?: number;
  variant?: 'card' | 'detail';
}

function Loader({ count = 1, variant = 'card' }: LoaderProps) {
  if (variant === 'detail') {
    return (
      <div className="movie detail loading">
        <div className="poster shimmer"></div>
        <div className="movie-data">
          <h2 className="shimmer"></h2>
          <p className="shimmer meta-line-skeleton"></p>
          <div className="genre-pills">
            <span className="pill shimmer"></span>
            <span className="pill shimmer"></span>
            <span className="pill shimmer"></span>
          </div>
          <p className="shimmer plot-skeleton"></p>
          <p className="shimmer detail-line-skeleton"></p>
          <p className="shimmer detail-line-skeleton"></p>
        </div>
      </div>
    );
  }

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div className="movie loading" key={i}>
          <div className="poster shimmer"></div>
          <div className="movie-data">
            <h2 className="shimmer"></h2>
            <div className="movie-details">
              <p className="shimmer"></p>
              <p className="shimmer"></p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Loader;
