// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("setCorrectCarName", () => {
  cy.get(".__setting_name_input").type("EAST, WEST, SOUTH, NORTH{enter}");
  cy.get(".__setting_count_fieldset").should("not.have.class", "d-none");
});

Cypress.Commands.add("setCorrectCarCount", () => {
  cy.get(".__setting_count_input").type("3{enter}");
  cy.get(".__process_section").should("not.have.class", "d-none");
});
