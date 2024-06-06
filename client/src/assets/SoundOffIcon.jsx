import React from "react";

const SoundOffIcon = (props) => {
  return (
    <svg
      fill="#000000"
      viewBox="0 0 24 24"
      id="sound-mute-alt"
      data-name="Flat Line"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <path
          id="secondary"
          d="M11,5V19L7,15H4a1,1,0,0,1-1-1V10A1,1,0,0,1,4,9H7Z"
          style={{
            fill: "#F97316",
            strokeWidth: 2,
          }}
        />
        <path
          id="primary"
          d="M16,14.5l5-5m-5,0,5,5M7,9H4a1,1,0,0,0-1,1v4a1,1,0,0,0,1,1H7l4,4V5Z"
          style={{
            fill: "none",
            stroke: "#F97316",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
          }}
        />
      </g>
    </svg>
  );
};

export default SoundOffIcon;
