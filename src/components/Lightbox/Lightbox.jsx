import { useEffect, useRef, useState } from 'react';
import './Lightbox.css';

export default function Lightbox({ images, startIndex = 0, label, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const touchStartX = useRef(null);

  const goNext = () => setIndex((i) => (i + 1) % images.length);
  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    }
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length, onClose]);

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) (delta < 0 ? goNext : goPrev)();
    touchStartX.current = null;
  }

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={label} onClick={onClose}>
      <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-header">
          <span className="lightbox-label">{label}</span>
          <div className="lightbox-header-right">
            <span className="lightbox-counter">
              {index + 1} / {images.length}
            </span>
            <button type="button" className="lightbox-icon-btn" onClick={onClose} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="lightbox-stage" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <button type="button" className="lightbox-icon-btn lightbox-prev" onClick={goPrev} aria-label="Previous photo">
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
              <path d="M10 1L2 10l8 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="lightbox-frame">
            <img key={index} className="lightbox-image" src={images[index].src} alt="" />
          </div>

          <button type="button" className="lightbox-icon-btn lightbox-next" onClick={goNext} aria-label="Next photo">
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
              <path d="M2 1l8 9-8 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {images.length > 1 && (
          <div className="lightbox-thumbs">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                className={`lightbox-thumb ${i === index ? 'is-active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Photo ${i + 1}`}
                aria-current={i === index}
              >
                <img src={img.src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
