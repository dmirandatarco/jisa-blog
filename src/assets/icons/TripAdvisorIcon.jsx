const TripAdvisorIcon = ({ size = 24, className = "" }) => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    href="https://www.tripadvisor.com.mx/Attraction_Review-g294318-d17545647-Reviews-JISA_ADVENTURE_Agencia_de_viajes_para_Cusco-Machu_Picchu_Sacred_Valley_Cusco_Reg.html"
    aria-label="Reseñas de Jisa Adventure en TripAdvisor"
    title="TripAdvisor: Jisa Adventure"
    className={`inline-flex items-center justify-center ${className}`}
  >
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 32 32"
      width={size}
      height={size}
    >
      <path d="M23.49 14.862a2.659 2.659 0 1 0 2.296 1.317l.007.013a2.664 2.664 0 0 0-2.303-1.33zm-14.985 0a2.659 2.659 0 1 0 2.296 1.317l.007.013a2.664 2.664 0 0 0-2.303-1.33zM23.49 12.45h.002a5.07 5.07 0 1 1-4.379 2.512l-.013.024a5.076 5.076 0 0 1 4.39-2.537zm-14.985-.003a5.072 5.072 0 1 1-4.38 2.512l-.013.024a5.077 5.077 0 0 1 4.393-2.536zM16 8.821c2.032.001 3.966.416 5.724 1.165l-.096-.036c-3.173 1.09-5.447 3.97-5.628 7.405l-.001.02a8.287 8.287 0 0 0-5.57-7.408l-.058-.017c1.662-.712 3.597-1.126 5.628-1.127zm.008-2.449h-.007A16.884 16.884 0 0 0 6.397 9.35l.057-.037h-5.45l2.453 2.668a7.493 7.493 0 1 0 10.145 11.03l-.005.004 2.402 2.614 2.402-2.612a7.494 7.494 0 1 0 10.147-11.031l-.006-.005 2.453-2.668h-5.436a16.815 16.815 0 0 0-9.545-2.94h-.008z" />
    </svg>
    <span className="sr-only">Abrir TripAdvisor de Jisa Adventure</span>
  </a>
);

export default TripAdvisorIcon;