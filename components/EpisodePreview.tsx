import Image from 'next/image';
import { PANELS } from '@/lib/episodes';
import { Lock } from './Icon';

export default function EpisodePreview() {
  return (
    <div className="panel-strip">
      {PANELS.map((p) => (
        <figure className={`panel${p.locked ? ' panel-locked' : ''}`} key={p.n}>
          <span className="panel-num">{p.n}</span>
          {p.talk && <span className="panel-talk">Talk moment</span>}
          <Image
            src={p.img}
            alt={p.locked ? 'A locked panel from Episode 1' : p.caption}
            width={960}
            height={720}
            sizes="(max-width: 600px) 90vw, (max-width: 1100px) 45vw, 24vw"
          />
          {p.locked ? (
            <div className="panel-lock-note">
              <Lock size={22} />
              <span className="small" style={{ fontWeight: 600 }}>
                Locked
              </span>
              <span className="tiny" style={{ opacity: 0.75, maxWidth: '22ch' }}>
                The rest of the episode arrives with your first delivery.
              </span>
            </div>
          ) : (
            <figcaption className="panel-cap">{p.caption}</figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
