'use client';

import { useState } from 'react';

export interface QA {
  q: string;
  a: string;
}

export default function Accordion({ items, startOpen = 0 }: { items: QA[]; startOpen?: number }) {
  const [open, setOpen] = useState<number | null>(startOpen);

  return (
    <div className="acc">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className={`acc-item${isOpen ? ' open' : ''}`} key={item.q}>
            <button
              type="button"
              className="acc-btn"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span>{item.q}</span>
              <span className="acc-ico" aria-hidden="true" />
            </button>
            <div className="acc-panel">
              <div>
                <p className="small">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
