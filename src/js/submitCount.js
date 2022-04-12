import {
  processSection,
  settingCountFieldset,
  settingCountInput,
} from "./variables";

/*
1. 받은 문자열을 검증한다.
	1. 0 이상인지 확인한다.
	2. NaN인지 확인한다.
*/
const verifyCount = (rawString) => {
  const num = Number.parseInt(rawString, 10);
  if (num <= 0) {
    window.alert("시도할 횟수는 0이상이여야합니다.");
    return;
  }
  if (isNaN(num)) {
    window.alert("시도할 횟수는 숫자만 입력할 수 있습니다.");
    return;
  }
  settingCountFieldset && settingCountFieldset.setAttribute("disabled", true);
  processSection && processSection.classList.remove("d-none");
};

export const submitCount = (event) => {
  if (event.key === "Enter" || event.type === "click") {
    verifyCount(settingCountInput.value);
  }
};
