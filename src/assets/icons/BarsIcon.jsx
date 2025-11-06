const BarsIcon = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"

            viewBox="0 0 16 16"
            fill="currentColor"
            width={props.size || 24}
            height={props.size || 24}
            {...props}
        >

            <path d="M2 13v-2h12v2Zm0-4V7h12v2Zm0-4V3h12v2Z" />
        </svg>
    )
}

export default BarsIcon