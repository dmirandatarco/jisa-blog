const FacebookIcon = ({ size = 24, className = "" }) => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    href="https://www.facebook.com/Jisadventuress"
    aria-label="Facebook de Jisa Adventure"
    title="Facebook: Jisa Adventure"
    className={`inline-flex items-center justify-center ${className}`}
  >
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={size} height={size} fill="currentColor">
      <path d="m23.446 18 .889-5.791h-5.557V8.451c0-1.584.776-3.129 3.265-3.129h2.526V.392S22.277.001 20.085.001c-4.576 0-7.567 2.774-7.567 7.795v4.414H7.431v5.791h5.087v14h6.26v-14z" />
    </svg>
    <span className="sr-only">Abrir Facebook de Jisa Adventure</span>
  </a>
);

export default FacebookIcon;