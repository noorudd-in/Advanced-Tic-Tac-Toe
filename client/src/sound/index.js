import clicksound from "../assets/click-sound.wav";
import gameoversound from "../assets/game-over-sound.wav";

const clickSoundRaw = new Audio(clicksound);
const gameOverSoundRaw = new Audio(gameoversound);
clickSoundRaw.volume = 0.7;
gameOverSoundRaw.volume = 0.5;

export const clickSound = clickSoundRaw;
export const gameoverSound = gameOverSoundRaw;
