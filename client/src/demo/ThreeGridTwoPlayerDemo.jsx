import React from "react";

const ThreeGridTwoPlayerDemo = () => {
  return (
    <div className="flex justify-center">
      <div className="grid board-3g-demo relative">
        <div className="tile text-3xl flex justify-center items-center right-border-demo bottom-border-demo bg-orange-400">
          X
        </div>
        <div className="tile text-3xl flex justify-center items-center right-border-demo bottom-border-demo">
          O
        </div>
        <div className="tile text-3xl flex justify-center items-center bottom-border-demo">
          O
        </div>
        <div className="tile text-3xl flex justify-center items-center right-border-demo bottom-border-demo"></div>
        <div className="tile text-3xl flex justify-center items-center right-border-demo bottom-border-demo bg-orange-400">
          X
        </div>
        <div className="tile text-3xl flex justify-center items-center bottom-border-demo"></div>
        <div className="tile text-3xl flex justify-center items-center right-border-demo"></div>
        <div className="tile text-3xl flex justify-center items-center right-border-demo"></div>
        <div className="tile text-3xl flex justify-center items-center bg-orange-400">
          X
        </div>
      </div>
    </div>
  );
};

export default ThreeGridTwoPlayerDemo;
