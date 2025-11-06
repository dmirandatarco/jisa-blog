const GoogleIcon = (props) => {
    return (
        <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.google.com/maps/place/Jisa+Adventure+-+Agencia+de+Viajes+para+Cusco/data=!4m2!3m1!1s0x0:0xea62539e8d460589?sa=X&ved=1t:2428&ictx=111"
            aria-label="Google de Jisa Adventure"
            title="Google: Jisa Adventure"
            className={`inline-flex items-center justify-center`}
        >
            <svg xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                xmlSpace="preserve"
                height={props.size || 24}
                width={props.size || 24}
                viewBox="0 0 512 512">
                <path d="M319.317 213.333H153.6v76.8h83.345c-11.204 31.855-38.357 51.2-73.054 51.2-46.387 0-87.091-39.893-87.091-85.367 0-45.44 40.704-85.299 87.091-85.299 22.178 0 40.926 7.083 54.221 20.471l6.033 6.084 57.148-57.148-6.212-6.033c-27.051-26.283-65.493-40.175-111.189-40.175C71.996 93.867 0 165.069 0 255.966c0 90.931 71.996 162.167 163.891 162.167 84.71 0 144.896-49.698 157.073-129.698 1.587-10.377 2.398-21.299 2.406-32.469 0-12.262-1.05-25.566-2.807-35.576l-1.246-7.057zM460.843 213.292v-51.158h-59.776v51.2h-51.2v59.734h51.2v51.2h59.776v-51.2H512v-59.776z" />
            </svg>
        </a>
    );
};

export default GoogleIcon;
