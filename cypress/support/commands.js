Cypress.Commands.add("setTravelDate", (element, input) => {
    // TODO: namespace
    const date = new Date();
    const dayOfMonth = date.getDate();
    const departureDay = dayOfMonth + input;
    const year = date.getFullYear();
    const month = date.getMonth();
    const departureDateTUC = new Date(
        Date.UTC(year, month, departureDay, 0, 0, 0)
    );
    const departureDate = departureDateTUC.valueOf();
    return cy.get(element).find(`[data-pick="${departureDate}"]`).click();
});
