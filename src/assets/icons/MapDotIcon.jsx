const MapDotIcon = (props) => {
    return (

        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            height={props.size || 24}
            width={props.size || 24}
            {...props}
            viewBox="0 0 24 24">
            <path fill="currentColor"
                fillRule="evenodd" d="M12.574 21.819a1 1 0 0 1-1.149 0l-.002-.002-.006-.004-.018-.014a9.569 9.569 0 0 1-.305-.225A25.152 25.152 0 0 1 7.757 18.5C5.964 16.508 4 13.61 4 10.364c0-2.203.831-4.324 2.325-5.896C7.821 2.894 9.861 2 12 2s4.179.894 5.674 2.468C19.17 6.04 20 8.16 20 10.364c0 3.246-1.964 6.144-3.757 8.135a25.156 25.156 0 0 1-3.337 3.075 15.301 15.301 0 0 1-.305.225l-.018.014-.006.004h-.002v.002ZM9 10a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z"
                clipRule="evenodd" />
        </svg>
    );
};
export default MapDotIcon;
