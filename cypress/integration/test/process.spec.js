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

  it("설정한 이름과 자동차 이름이 같아야한다.", () => {
    cy.get(".__cars_name_div").as("carsNameDiv");

    cy.get(".__setting_name_input").then((input) => {
      input[0].value.split(", ").forEach((name) => {
        cy.get("@carsNameDiv")
          .find(`.__car_${name} > .car-player`)
          .should("have.text", name);
      });
    });
  });
  it("생성된 스피너의 갯수와 시도 횟수가 동일해야한다.", () => {});

  it.only("가장 많은 화살표를 가진 플레이어가 우승한다.", () => {
    cy.get(".__cars_name_div").as("carsNameDiv");
    const winners = [];
    let max = 0;

    cy.on("window:alert", (text) => {
      expect(text).to.contains("축하");

      console.log(cy.get(".__setting_name_input"));
      console.log(max);
    });
    // 가장 많은 화살표의 개수는 어떻게 구해?
    // 가장 많은 화살표를 가진 명단을 구해야해?
    // 그 명단을 join한 결과가 div에 최종 우승에 포함되어야있어야해...
  });

  it("다시 시작 버튼을 누르면 초기화가 일어난다.", () => {});
});
