/// <reference types="cypress" />

const ALERT_MSG_DUPLICATE_NAME = "자동차 이름은 중복될 수 없습니다.";
const ALERT_MSG_INVALID_NAME = "자동차 이름은 1자 이상, 5자 이하여야합니다.";
const ALERT_MSG_NAN_COUNT = "시도할 횟수는 숫자만 입력할 수 있습니다.";
const ALERT_MSG_INVALID_COUNT = "시도할 횟수는 0이상이여야합니다.";

describe("게임 실행 테스트", () => {
  beforeEach(() => {
    cy.clock();
    cy.visit("/");
    cy.setCorrectCarName();
    cy.setCorrectCarCount();
  });

  it("설정한 이름과 자동차 이름이 같아야한다.", () => {
    cy.get(".__cars_name_div").as("carsNameDiv");

    cy.get(".__setting_name_input").then((input) => {
      input
        .val()
        .split(", ")
        .forEach((name) => {
          cy.get("@carsNameDiv")
            .find(`.__car_${name} > .car-player`)
            .invoke("text")
            .should("eq", name);
        });
    });
  });

  // it("생성된 스피너의 갯수와 시도 횟수가 동일해야한다.", () => {});

  it("가장 많은 화살표를 가진 플레이어가 우승한다.", () => {
    cy.on("window:alert", (text) => {
      expect(text).to.contains("축하");
    });

    cy.get(".__setting_count_input")
      .invoke("val")
      .then((val) => {
        const count = Number.parseInt(val, 10);

        // 입력받은 숫자 * 단위 시간 + t만큼 기다린다. (t는 지연으로 인해 테스트가 종료되지 않았을 경우를 대비한 상수.)
        cy.clock();
        for (let _ = 0; _ < count; _++) cy.tick(1500);
        cy.clock().invoke("restore");

        // 우승자가 누군지 알아내야함.
        // 화살표 개수를 통해 우승자의 이름을 알아낼 수 있음.
        cy.get(".__cars_name_div")
          .children()
          .then((carPlayers) => {
            let max = 0;
            // 가장 많은 화살표 개수의 수
            [...carPlayers].forEach((carPlayer) => {
              max = Math.max(max, carPlayer.children.length);
            });

            // 화살표 개수를 통해 얻은 우승자 명단
            const winners = [...carPlayers]
              .filter((carPlayer) => carPlayer.children.length === max)
              .map((winner) => winner.children[0].innerHTML);

            // result section에서 우승자 이름 비교
            winners.forEach((winner) => {
              cy.get(".__result_section > div > h2")
                .invoke("text")
                .then((result) => {
                  expect(result).to.contains(winner);
                });
            });
          });
      });
  });

  it("다시 시작 버튼을 누르면 초기화가 일어난다.", () => {
    // 게임이 끝날때까지 기다린다.
    cy.on("window:alert", (text) => {
      expect(text).to.contains("축하");
    });

    cy.get(".__setting_count_input")
      .invoke("val")
      .then((val) => {
        const count = Number.parseInt(val, 10);

        // 입력받은 숫자 * 단위 시간 + t만큼 기다린다. (t는 지연으로 인해 테스트가 종료되지 않았을 경우를 대비한 상수.)
        cy.clock();
        for (let _ = 0; _ < count; _++) cy.tick(1500);
        cy.clock().invoke("restore");

        // 다시 시작 버튼을 누른다.
        cy.get(".__reset_button")
          .click()
          .then((btn) => {
            // 시도할 횟수가 사라졌는지 확인한다.
            cy.get(".__setting_count_fieldset").should("have.class", "d-none");
            // 게임 결과판이 사라졌는지 확인한다.
            cy.get(".__result_section>div").should("have.length", 0);
            // 게임 진행판이 사라졌는지 확인한다.
            cy.get(".__cars_name_div>div").should("have.length", 0);
            // 자동차 이름을 적는 칸이 활성화되었는지 확인한다.
            cy.get(".__setting_name_fieldset").should(
              "not.have.attr",
              "disabled"
            );
            // 자동차 이름을 적는 칸이 비어있는지 확인한다.
            cy.get(".__setting_name_input").invoke("val").should("eq", "");
          });
      });
  });
});
