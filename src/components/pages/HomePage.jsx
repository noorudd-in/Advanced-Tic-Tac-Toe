import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const redirectToBasic = () => navigate("/players?mode=basic");
  const redirectToAdvanced = () => navigate("/players?mode=advance");
  const redirectToAI = () => navigate("/ai");
  const redirectToOnline = () => navigate("/online");
  return (
    <>
      <div className="my-10">
        <div className="flex justify-center text-4xl font-mono">
          Tic Tac Toe
        </div>

        <div className="flex justify-center mt-10">
          <div>
            <div className="flex">
              <div
                className="px-20 py-10 bg-red-600 rounded-lg"
                onClick={redirectToBasic}
              >
                <h1 className="absolute -mx-[65px] -my-[15px] font-bold text-xl">
                  Basic Version
                </h1>
              </div>
              <div className="px-1 py-10"></div>
              <div
                className="p-10 bg-red-600 rounded-t-lg"
                onClick={redirectToAdvanced}
              >
                <h1 className="absolute font-bold text-xl rotate -mx-[40px] ">
                  Version
                </h1>
              </div>
            </div>
            <div className="flex">
              <div className="px-[84px] py-1"></div>
              <div
                className="px-10 py-1 bg-red-600 m-0"
                onClick={redirectToAdvanced}
              ></div>
            </div>
            <div className="flex">
              <div
                className="px-10 py-10 bg-red-600 rounded-lg"
                onClick={redirectToAI}
              >
                <h1 className="absolute -mx-[20px] -my-[25px] font-bold text-xl">
                  Play
                </h1>
                <h1 className="absolute -mx-[30px] font-bold text-xl">
                  with AI
                </h1>
              </div>
              <div className="px-1 py-10"></div>
              <div
                className="px-20 py-10 bg-red-600 rounded-l-lg rounded-br-lg"
                onClick={redirectToAdvanced}
              >
                <h1 className="absolute -mx-[65px] -my-[20px] font-bold text-xl">
                  Advance
                </h1>
              </div>
            </div>
            <div className="py-1"></div>
            <div className="flex">
              <div
                className="px-[124px] py-10 bg-red-600 rounded-lg"
                onClick={redirectToOnline}
              >
                <h1 className="absolute -mx-[115px] -my-[15px] font-bold text-xl">
                  Play Online With Friends
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
