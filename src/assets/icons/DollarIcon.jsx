import React from "react";

const DollarIcon = ({ size = 20, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 1 1 0 7H6" />
  </svg>
);

export default DollarIcon;