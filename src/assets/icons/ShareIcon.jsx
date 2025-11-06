
const ShareIcon = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            fill="currentColor"
            width={props.size || 24}
            height={props.size || 24}
            {...props}
            viewBox="0 0 512 512">
            <path d="M512 255.995 277.045 65.394v103.574h-57.542c-208.59 0-249.35 153.44-201.394 266.128 9.586-103.098 142.053-100.701 237.358-100.701h21.578v112.211L512 255.995z" />
        </svg>
    )
}

export default ShareIcon