import { useEffect, useId, useRef, useState } from 'react';
import './Select.css';

export default function Select({ name, options, value, onChange, ariaLabel }) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(() => Math.max(options.indexOf(value), 0));
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const listId = useId();

  useEffect(() => {
    function handleClickOutside(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (open) listRef.current?.focus();
  }, [open]);

  function commit(index) {
    onChange(options[index]);
    setOpen(false);
    rootRef.current?.querySelector('.select-trigger')?.focus();
  }

  function handleTriggerKeyDown(e) {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setHighlighted(Math.max(options.indexOf(value), 0));
      setOpen(true);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  function handleListKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlighted((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      commit(highlighted);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      rootRef.current?.querySelector('.select-trigger')?.focus();
    } else if (e.key === 'Tab') {
      setOpen(false);
    }
  }

  return (
    <div className="select" ref={rootRef}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        className="select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => {
          setHighlighted(Math.max(options.indexOf(value), 0));
          setOpen((o) => !o);
        }}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className="select-value">{value}</span>
        <span className="select-arrow" aria-hidden="true" />
      </button>

      {open && (
        <ul
          className="select-panel"
          role="listbox"
          id={listId}
          ref={listRef}
          tabIndex={-1}
          onKeyDown={handleListKeyDown}
        >
          {options.map((opt, i) => (
            <li
              key={opt}
              role="option"
              aria-selected={opt === value}
              className={`select-option ${i === highlighted ? 'is-highlighted' : ''} ${opt === value ? 'is-selected' : ''}`}
              onMouseEnter={() => setHighlighted(i)}
              onClick={() => commit(i)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
