const ItinerarioIcon = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            height={props.size || 24}
            width={props.size || 24}
            fill="currentColor"
            viewBox="0 0 16 16">
            <g fill="currentColor">
                <path d="M5 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM15 13a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM9 4.5a1.5 1.5 0 1 1 3 0V9h2V4.5a3.5 3.5 0 1 0-7 0v7a1.5 1.5 0 0 1-3 0V7H2v4.5a3.5 3.5 0 1 0 7 0v-7Z" />
            </g>
        </svg>
    )
}

export default ItinerarioIcon