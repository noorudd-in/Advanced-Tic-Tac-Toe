import { useSelector } from "react-redux";

const Basic = () => {
  const state = useSelector((state) => state.gameState);
  console.log(state);
  return <div>Basic</div>;
};

export default Basic;
