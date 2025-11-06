const DirectionIcon = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            viewBox="0 0 95.301 95.301"
            fill="currentColor"
            width={props.size || 24}
            height={props.size || 24}
            {...props}
        >
            <path
                d="M94.695.605a2.065 2.065 0 0 0-2.224-.458L1.297 36.581a2.063 2.063 0 0 0 .418 3.949l45.313 7.742 7.743 45.312a2.064 2.064 0 0 0 3.949.419L95.153 2.828a2.058 2.058 0 0 0-.458-2.223z" />
        </svg>
    )
}

export default DirectionIcon