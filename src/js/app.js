import "../css/index.css";
import { submitCount } from "./submitCount";
import { submitName } from "./submitName";
import {
  settingCountButton,
  settingCountInput,
  settingNameButton,
  settingNameInput,
} from "./variables";

const initListeners = () => {
  settingNameInput && settingNameInput.addEventListener("keydown", submitName);
  settingNameButton && settingNameButton.addEventListener("click", submitName);
  settingCountInput &&
    settingCountInput.addEventListener("keydown", submitCount);
  settingCountButton &&
    settingCountButton.addEventListener("click", submitCount);
};

const init = () => {
  initListeners();
};

init();
