import { gameInstance } from "./game";
import {
  settingCountFieldset,
  settingNameFieldset,
  settingNameInput,
} from "./variables";

/*
1. value를 "," 로 분리한다.
2. 분리한 value를 trim한다.
3. 조건에 맞게 검사를 진행한다.
	1. 글자 수 검사
	2. 중복 검사
	3. 0개 이상인지 검사
*/
const verifyName = (rawString) => {
  const values = rawString.split(",").map((value) => value.trim());

  // 글자 수 검사
  if (values.some((value) => !(0 < value.length && value.length <= 5))) {
    window.alert("자동차 이름은 1자 이상, 5자 이하여야합니다.");
    return;
  }

  // 중복 검사
  if (values.length !== new Set(values).size) {
    window.alert("자동차 이름은 중복될 수 없습니다.");
    return;
  }

  // 다음 행동 진행
  settingNameFieldset && settingNameFieldset.setAttribute("disabled", true);
  settingCountFieldset && settingCountFieldset.classList.remove("d-none");

  // 자동차 이름 정보 저장
  gameInstance.setCars(values);
};

export const submitName = (event) => {
  if (event.key === "Enter" || event.type === "click") {
    verifyName(settingNameInput.value);
  }
};
