export default function ThankYouPage() {
  const today = new Date();
  const postmarkDate = today
    .toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
  const refCode = `RC-${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}${String(
    today.getDate(),
  ).padStart(2, "0")}`;

  return (
    <div className="tyc-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Work+Sans:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .tyc-root {
          --ink: #1B2438;
          --ink-soft: #2B3550;
          --paper: #F1E9D8;
          --paper-soft: #E9DFC9;
          --brass: #B8912F;
          --stamp: #3F6357;
          --stamp-light: #6B8F82;
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--ink);
          padding: clamp(1rem, 5vw, 3rem);
          box-sizing: border-box;
          font-family: 'Work Sans', sans-serif;
        }

        .tyc-card {
          position: relative;
          width: 100%;
          max-width: 460px;
          background: var(--paper);
          border-radius: 6px;
          padding: clamp(1.75rem, 5vw, 3rem);
          box-sizing: border-box;
          opacity: 0;
          transform: translateY(14px);
          animation: tyc-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
          overflow: hidden;
        }

        .tyc-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 6px;
          padding: 6px;
          background: repeating-linear-gradient(
            -45deg,
            var(--stamp) 0px, var(--stamp) 10px,
            var(--paper) 10px, var(--paper) 20px,
            var(--brass) 20px, var(--brass) 30px,
            var(--paper) 30px, var(--paper) 40px
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0.9;
        }

        .tyc-inner {
          position: relative;
          padding: clamp(0.75rem, 2vw, 1.25rem);
        }

        .tyc-ref {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          color: var(--ink-soft);
          opacity: 0;
          animation: tyc-fade 0.5s ease 0.5s forwards;
        }

        .tyc-stamp-wrap {
          position: absolute;
          top: clamp(-0.5rem, -1vw, 0rem);
          right: clamp(-0.5rem, -1vw, 0rem);
          width: clamp(72px, 18vw, 92px);
          height: clamp(72px, 18vw, 92px);
          opacity: 0;
          transform: scale(1.7) rotate(4deg);
          animation: tyc-stamp 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) 0.65s forwards;
        }

        .tyc-stamp-wrap svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .tyc-headline {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: clamp(2.1rem, 7vw, 2.9rem);
          line-height: 1.05;
          color: var(--ink);
          margin: 1.5rem 0 0.6rem;
          opacity: 0;
          transform: translateY(8px);
          animation: tyc-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.75s forwards;
        }

        .tyc-sub {
          font-size: clamp(1rem, 3vw, 1.15rem);
          color: var(--ink-soft);
          margin: 0 0 1rem;
          opacity: 0;
          transform: translateY(8px);
          animation: tyc-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.9s forwards;
        }

        .tyc-note {
          font-size: 0.9rem;
          color: var(--ink-soft);
          opacity: 0;
          border-top: 1px dashed rgba(27,36,56,0.25);
          padding-top: 1rem;
          margin: 0.5rem 0 1.75rem;
          animation: tyc-fade 0.6s ease 1.05s forwards;
        }

        .tyc-btn {
          font-family: 'Work Sans', sans-serif;
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--paper);
          background: var(--ink);
          border: none;
          border-radius: 4px;
          padding: 0.8rem 1.5rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          opacity: 0;
          animation: tyc-fade 0.6s ease 1.2s forwards;
          transition: background 0.25s ease, transform 0.2s ease;
        }

        .tyc-btn:hover {
          background: var(--stamp);
          transform: translateX(2px);
        }

        .tyc-btn:focus-visible {
          outline: 2px solid var(--brass);
          outline-offset: 2px;
        }

        .tyc-arrow {
          transition: transform 0.25s ease;
        }

        .tyc-btn:hover .tyc-arrow {
          transform: translateX(3px);
        }

        .tyc-postmark-date {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.06em;
          color: var(--ink-soft);
          margin-top: 1.75rem;
          opacity: 0;
          animation: tyc-fade 0.6s ease 1.3s forwards;
        }

        @keyframes tyc-rise {
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes tyc-fade {
          to { opacity: 1; }
        }

        @keyframes tyc-stamp {
          0% { opacity: 0; transform: scale(1.7) rotate(4deg); }
          60% { opacity: 1; transform: scale(0.94) rotate(-9deg); }
          100% { opacity: 1; transform: scale(1) rotate(-8deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .tyc-card, .tyc-ref, .tyc-stamp-wrap, .tyc-headline, .tyc-sub, .tyc-note, .tyc-btn, .tyc-postmark-date {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .tyc-stamp-wrap { transform: rotate(-8deg) !important; }
        }

        @media (max-width: 380px) {
          .tyc-headline { font-size: 1.8rem; }
        }
      `}</style>

      <div className="tyc-card">
        <div className="tyc-inner">
          <span className="tyc-ref">REF {refCode}</span>

          <div className="tyc-stamp-wrap" aria-hidden="true">
            <svg viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#3F6357"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <circle
                cx="50"
                cy="50"
                r="37"
                fill="none"
                stroke="#3F6357"
                strokeWidth="1.5"
              />
              <path
                id="tyc-arc-top"
                d="M 16 50 A 34 34 0 0 1 84 50"
                fill="none"
              />
              <path
                id="tyc-arc-bottom"
                d="M 20 62 A 30 30 0 0 0 80 62"
                fill="none"
              />
              <text
                fontFamily="IBM Plex Mono, monospace"
                fontSize="8.5"
                fill="#3F6357"
                letterSpacing="1.5"
              >
                <textPath
                  href="#tyc-arc-top"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  RECEIVED
                </textPath>
              </text>
              <text
                fontFamily="IBM Plex Mono, monospace"
                fontSize="7"
                fill="#3F6357"
                letterSpacing="1"
              >
                <textPath
                  href="#tyc-arc-bottom"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  {postmarkDate}
                </textPath>
              </text>
              <line
                x1="30"
                y1="50"
                x2="70"
                y2="50"
                stroke="#3F6357"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          <h1 className="tyc-headline">Thank you!</h1>
          <p className="tyc-sub">We'll be in touch soon.</p>
          <p className="tyc-note">
            Your message has been logged and typically gets a reply within two
            business days.
          </p>

          <button className="tyc-btn" onClick={() => window.history.back()}>
            Back to portfolio
            <span className="tyc-arrow" aria-hidden="true">
              &#8594;
            </span>
          </button>

          <div className="tyc-postmark-date">
            POSTMARKED &middot; {postmarkDate}
          </div>
        </div>
      </div>
    </div>
  );
}
