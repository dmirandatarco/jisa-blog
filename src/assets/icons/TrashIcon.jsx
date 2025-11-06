import React from 'react'

const TrashIcon = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.size || 24}
            height={props.size || 24}
            fill="currentColor"
            viewBox="-3 0 32 32">
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7 15a1 1 0 0 1 2 0v12a1 1 0 1 1-2 0V15Zm5 0a1 1 0 0 1 2 0v12a1 1 0 1 1-2 0V15Zm5 0a1 1 0 0 1 2 0v12a1 1 0 1 1-2 0V15ZM2 28a4 4 0 0 0 4 4h14a4 4 0 0 0 4-4V12H2v16ZM16 4h-6V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1Zm8 0h-6V2a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v2a2 2 0 0 0 1.999 2h22.003A2 2 0 0 0 26 8V6a2 2 0 0 0-2-2Z" />
        </svg>
    )
}

export default TrashIcon