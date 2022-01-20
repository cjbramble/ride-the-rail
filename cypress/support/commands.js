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

Cypress.Commands.add('setDepartureDate', (input) => {
    // document and namespace
    const date = new Date();
    const dayOfMonth = date.getDate();
    const departureDay = dayOfMonth + input;
    const year = date.getFullYear();
    const month = date.getMonth();
    const departureDateTUC = new Date(Date.UTC(year, month, departureDay, 0, 0, 0));
    const departureDate = departureDateTUC.valueOf();
    return cy.get("#datepicker-first_table").find(`[data-pick="${departureDate}"]`).click();
})
Cypress.Commands.add('setReturnDate', (input) => {
    // document and namespace
    const date = new Date();
    const dayOfMonth = date.getDate();
    const returnDay = dayOfMonth + input;
    const year = date.getFullYear();
    const month = date.getMonth();
    const returnDateUTC = new Date(Date.UTC(year, month, returnDay, 0, 0, 0));
    const returnDate = returnDateUTC.valueOf();
    return cy.get("#datepicker-second_table").find(`[data-pick="${returnDate}"]`).click();
})