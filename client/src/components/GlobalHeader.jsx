import { useEffect, useState } from "react";
import SoundOnIcon from "../assets/SoundOnIcon";
import SoundOffIcon from "../assets/SoundOffIcon";
import SettingIcon from "../assets/SettingIcon";
import { clickSound } from "../sound";
import { useNavigate } from "react-router-dom";

const GlobalHeader = () => {
  const [soundOn, setSoundOn] = useState(false);
  const navigate = useNavigate();

  const handleSound = () => {
    if (soundOn) {
      localStorage.removeItem("gameSound");
      setSoundOn(false);
    } else {
      localStorage.setItem("gameSound", true);
      setSoundOn(true);
      clickSound.play();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("gameSound") != null) {
      setSoundOn(true);
    }
  }, []);

  return (
    <div className="flex justify-between mx-5 mt-2">
      <span onClick={handleSound}>
        {soundOn ? (
          <SoundOnIcon className="w-10 h-10" />
        ) : (
          <SoundOffIcon className="w-10 h-10" />
        )}
      </span>
      <span onClick={() => navigate("/setting")}>
        <SettingIcon className="w-8 h-8" />
      </span>
    </div>
  );
};

export default GlobalHeader;
