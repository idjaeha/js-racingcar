/// <reference types="cypress" />

Cypress.Commands.add("setCorrectCarName", () => {
  cy.get(".__setting_name_input").type("EAST, WEST, SOUTH, NORTH{enter}");
  cy.get(".__setting_count_fieldset").should("not.have.class", "d-none");
});

Cypress.Commands.add("setCorrectCarCount", () => {
  cy.get(".__setting_count_input").type("10{enter}");
  cy.get(".__process_section").should("not.have.class", "d-none");
});

const ALERT_MSG_DUPLICATE_NAME = "자동차 이름은 중복될 수 없습니다.";
const ALERT_MSG_INVALID_NAME = "자동차 이름은 1자 이상, 5자 이하여야합니다.";
const ALERT_MSG_NAN_COUNT = "시도할 횟수는 숫자만 입력할 수 있습니다.";
const ALERT_MSG_INVALID_COUNT = "시도할 횟수는 0이상이여야합니다.";

describe("게임 설정 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("올바른 입력을 주지 않으면 다음 창이 보이지 않는다.", () => {
    cy.get(".__setting_count_fieldset").should("have.class", "d-none");
  });

  it("공백을 입력했을 때 경고창이 나타난다.", () => {
    cy.get(".__setting_name_input").type("{enter}");
    cy.on("window:alert", (text) => {
      expect(text).to.contains(ALERT_MSG_INVALID_NAME);
    });
  });

  it("올바르지 못한 입력을 입력하면 경고창이 나타난다.", () => {
    cy.get(".__setting_name_input").type(",,,{enter}");
    cy.on("window:alert", (text) => {
      expect(text).to.contains(ALERT_MSG_INVALID_NAME);
    });
  });

  it("자동차 이름의 조건에 맞지 않으면 경고창이 나타난다.", () => {
    cy.get(".__setting_name_input").type("555555,6666,777,9{enter}");
    cy.on("window:alert", (text) => {
      expect(text).to.contains(ALERT_MSG_INVALID_NAME);
    });
  });

  it("중복된 이름을 입력했을 때 경고창이 나타난다.", () => {
    cy.get(".__setting_name_input").type("1, 1{enter}");
    cy.on("window:alert", (text) => {
      expect(text).to.contains(ALERT_MSG_DUPLICATE_NAME);
    });
  });

  it("올바른 입력을 입력하면 시도할 횟수를 입력받는 창이 나타난다.", () => {
    cy.setCorrectCarName();
  });

  it("공백을 입력했을 때 경고창이 나타난다.", () => {
    cy.setCorrectCarName();
    cy.get(".__setting_count_input").type("{enter}");
    cy.on("window:alert", (text) => {
      expect(text).to.contains(ALERT_MSG_NAN_COUNT);
    });
  });

  it("0이하의 숫자를 입력했을 때 경고창이 나타난다.", () => {
    cy.setCorrectCarName();
    cy.get(".__setting_count_input").type("-1{enter}");
    cy.on("window:alert", (text) => {
      expect(text).to.contains(ALERT_MSG_INVALID_COUNT);
    });
  });

  it("올바르지 못한 숫자를 입력했을 때 경고창이 나타난다.", () => {
    cy.setCorrectCarName();
    cy.get(".__setting_count_input").type("-{enter}");
    cy.on("window:alert", (text) => {
      expect(text).to.contains(ALERT_MSG_NAN_COUNT);
    });
  });

  it("올바른 숫자를 입력하면 다음 창으로 이동한다.", () => {
    cy.setCorrectCarName();
    cy.setCorrectCarCount();
  });
});
