const DotIcon = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            height={props.size || 24}
            width={props.size || 24}
            {...props}
        >

            <path fill="currentColor" d="M8 3a5 5 0 1 0 0 10A5 5 0 0 0 8 3z" />
        </svg>
    )
}

export default DotIcon