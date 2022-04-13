/// <reference types="cypress" />

const ALERT_MSG_DUPLICATE_NAME = "자동차 이름은 중복될 수 없습니다.";
const ALERT_MSG_INVALID_NAME = "자동차 이름은 1자 이상, 5자 이하여야합니다.";
const ALERT_MSG_NAN_COUNT = "시도할 횟수는 숫자만 입력할 수 있습니다.";
const ALERT_MSG_INVALID_COUNT = "시도할 횟수는 0이상이여야합니다.";

describe("게임 실행 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.setCorrectCarName();
    cy.setCorrectCarCount();
  });

  it("가장 많은 화살표를 가진 플레이어가 우승한다.", () => {});
});
