import * as React from "react";

export const ViewIcon: React.FC = () => {
  const style: React.CSSProperties = {
    fill: "#000",
    fillOpacity: 1,
    fillRule: "nonzero",
    stroke: "none"
  };

  return(
    <div title={"flaticon from: (attribution) http://www.freepik.com/"}>
      {/* eslint-disable-next-line @typescript-eslint/tslint/config */}
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 932.2 932.2">
        <path d="M466.1 161.5c-205.6 0-382.8 121.2-464.2 296.1 -2.5 5.3-2.5 11.5 0 16.9 81.4 174.9 258.6 296.1 464.2 296.1s382.8-121.2 464.2-296.1c2.5-5.3 2.5-11.5 0-16.9C848.9 282.7 671.7 161.5 466.1 161.5zM466.1 676.2c-116.1 0-210.1-94.1-210.1-210.1 0-116.1 94.1-210.1 210.1-210.1 116.1 0 210.1 94.1 210.1 210.1S582.1 676.2 466.1 676.2z" style={style}/>
        <circle cx="466.1" cy="466" r="134.5" style={style}/>
      </svg>
    </div>
  );
};
