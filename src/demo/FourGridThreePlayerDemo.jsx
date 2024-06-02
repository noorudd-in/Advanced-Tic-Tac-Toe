import React from "react";

const FourGridThreePlayerDemo = () => {
  return (
    <div className="flex justify-center">
      <div className="grid board-4g-demo relative">
        <div className="tile text-3xl flex justify-center items-center right-border-demo bottom-border-demo bg-orange-400">
          X
        </div>
        <div className="tile text-3xl flex justify-center items-center right-border-demo bottom-border-demo">
          Y
        </div>
        <div className="tile text-3xl flex justify-center items-center right-border-demo bottom-border-demo">
          Z
        </div>
        <div className="tile text-3xl flex justify-center items-center bottom-border-demo"></div>
        <div className="tile text-3xl flex justify-center items-center right-border-demo bottom-border-demo">
          Y
        </div>
        <div className="tile text-3xl flex justify-center items-center right-border-demo bottom-border-demo bg-orange-400">
          X
        </div>
        <div className="tile text-3xl flex justify-center items-center right-border-demo bottom-border-demo"></div>
        <div className="tile text-3xl flex justify-center items-center bottom-border-demo"></div>
        <div className="tile text-3xl flex justify-center items-center right-border-demo bottom-border-demo">
          Z
        </div>
        <div className="tile text-3xl flex justify-center items-center right-border-demo bottom-border-demo"></div>
        <div className="tile text-3xl flex justify-center items-center right-border-demo bottom-border-demo bg-orange-400">
          X
        </div>
        <div className="tile text-3xl flex justify-center items-center bottom-border-demo"></div>
        <div className="tile text-3xl flex justify-center items-center right-border-demo"></div>
        <div className="tile text-3xl flex justify-center items-center right-border-demo"></div>
        <div className="tile text-3xl flex justify-center items-center right-border-demo"></div>
        <div className="tile text-3xl flex justify-center items-center"></div>
      </div>
    </div>
  );
};

export default FourGridThreePlayerDemo;
