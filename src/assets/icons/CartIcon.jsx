const CartIcon = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.size || 24}
            height={props.size || 24}
            fill="currentColor"
            viewBox="0 0 32 32">
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10 26a2 2 0 1 1-.001 4.001A2 2 0 0 1 10 26Zm-4 2a4 4 0 1 0 8 0 4 4 0 0 0-8 0Zm2-6a2 2 0 0 1-2-2s23-2 22.972-1.903C29.482 16.2 31.979 5.223 32 5c.054-.55-.447-1-1-1H6V2h1a1 1 0 1 0 0-2H1a1 1 0 1 0 0 2h3v18a4 4 0 0 0 4 4h23c.031 0 0-.991 0-2H8Zm14 4a2 2 0 1 1-.001 4.001A2 2 0 0 1 22 26Zm-4 2a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z" />
        </svg>
    )
}

export default CartIcon