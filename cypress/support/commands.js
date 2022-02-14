/// <reference types='cypress' />

import { dayOfMonth, year, month } from "../exports/constants.js";

Cypress.Commands.add("setTravelDate", (element, input) => {
    const departureDay = dayOfMonth + input;
    const departureDateTUC = new Date(
        Date.UTC(year, month, departureDay, 0, 0, 0)
    );
    const departureDate = departureDateTUC.valueOf();
    return cy.get(element).find(`[data-pick="${departureDate}"]`).click();
});
