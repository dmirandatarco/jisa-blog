const CameraIcon = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width={props.size || 24}
            height={props.size || 24}
            {...props}
        >

            <path fill="currentColor"
                fillRule="evenodd"
                d="M15.596 2.807c-.144-.47-.523-.807-.907-.807H9.064c-.385 0-.763.338-.907.807L7.42 5H3a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4.669l-.735-2.193ZM16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                clipRule="evenodd" />
        </svg>
    )
}

export default CameraIcon