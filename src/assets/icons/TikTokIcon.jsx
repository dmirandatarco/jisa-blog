const TikTokIcon = ({ size = 24, className = "" }) => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    href="https://www.tiktok.com/@jisa_adventure"
    aria-label="TikTok de Jisa Adventure"
    title="TikTok: Jisa Adventure"
    className={`inline-flex items-center justify-center ${className}`}
  >
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M9.5 3H13c0 2.21 1.79 4 4 4v2c-1.54 0-2.94-.58-4-1.53V15a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V3z" />
    </svg>
    <span className="sr-only">Abrir TikTok de Jisa Adventure</span>
  </a>
);

export default TikTokIcon;
