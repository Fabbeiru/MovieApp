import { useState } from 'react';

interface PosterProps {
  src: string;
  alt: string;
}

function Poster({ src, alt }: PosterProps) {
  const [failed, setFailed] = useState(false);

  if (!src || src === "N/A" || failed) {
    return (
      <div className="poster poster-placeholder" role="img" aria-label={alt}>
        <span aria-hidden="true">🎬</span>
      </div>
    );
  }

  return <img className="poster" src={src} alt={alt} onError={() => setFailed(true)} />;
}

export default Poster;
