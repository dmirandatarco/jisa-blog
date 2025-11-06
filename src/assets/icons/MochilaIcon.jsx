import React from 'react'

const MochilaIcon = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.size || 24}
            height={props.size || 24}
            fill="currentColor"
            viewBox="0 0 24 24">
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 21v-9H9v9m6-5H9m6-7H9m6-2.962V6c0-.932 0-1.398-.152-1.765a2 2 0 0 0-1.083-1.083C13.398 3 12.932 3 12 3c-.932 0-1.398 0-1.765.152a2 2 0 0 0-1.083 1.083C9 4.602 9 5.068 9 6v.038m6 0C14.371 6 13.597 6 12.6 6h-1.2c-.997 0-1.771 0-2.4.038m6 0c.784.048 1.34.156 1.816.398a4 4 0 0 1 1.748 1.748C19 9.04 19 10.16 19 12.4v5.4c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C17.48 21 16.92 21 15.8 21H8.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C5 19.48 5 18.92 5 17.8v-5.4c0-2.24 0-3.36.436-4.216a4 4 0 0 1 1.748-1.748c.475-.242 1.032-.35 1.816-.398" />
        </svg>
    )
}

export default MochilaIcon