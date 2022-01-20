/// <reference types="cypress" />

const departureStation = "Lagos";
const arrivalStation = "Porto - Campanha";
const departDateElement = "#datepicker-first_table";
const returnDateElement = "#datepicker-second_table";
const departureDelay = 3;
const returnDelay = 6;

function travelDate(input) {
    const date = new Date();
    const dayOfMonth = date.getDate();
    const departureDay = dayOfMonth + input;
    const year = date.getFullYear();
    const month = date.getMonth();
    const departureDateTUC = new Date(
        Date.UTC(year, month, departureDay, 0, 0, 0)
    );
    const departureDate = departureDateTUC.valueOf();
    const departureDateObj = new Date(departureDate);
    const departureISOstring = departureDateObj.toISOString();
    return departureISOstring.slice(0, 10);
}

describe("Can search for a trip", () => {
    it("redirects to Buy Tickets interface", () => {
        cy.visit("/");

        cy.get(":nth-child(2) > .btn > .desc-menu").click();
        cy.url().should("contain", "/passageiros/en/buy-tickets");
    });

    it("selects departure and arrival locations", () => {
        cy.get('[name="textBoxPartida"]').type(departureStation).click();
        cy.get(
            "#searchTimetableForm > .col-md-12 > :nth-child(1) > :nth-child(3)"
        ).should("contain.text", departureStation);
        cy.get('[name="textBoxChegada"]').type(arrivalStation).click();
        cy.get(
            "#searchTimetableForm > .col-md-12 > :nth-child(1) > :nth-child(4)"
        ).should("contain.text", arrivalStation);
    });

    it("selects departure and arrival dates", () => {
        // TODO: add validation
        cy.get('[name="departDate"]').click();
        cy.setTravelDate(departDateElement, departureDelay);
        cy.get('[name="returnDate"]').click();
        cy.setTravelDate(returnDateElement, returnDelay);
    });

    it("selects seating class", () => {
        cy.get("#option1Label").click().should("have.class", "active"); // TODO: add validation
    });

    it("redirects to confirmation page", () => {
        cy.get("p > .btn").click();
        cy.url().should("contain", "/bilheteira/comprar"); // TODO: validate locations

        // Validation of outward schedule
        cy.get(
            ".info-geral > .row > .col-md-12 > .table > tbody > :nth-child(1) > :nth-child(1)"
        ).should("contain", `Outward: ${travelDate(departureDelay)}`);
        cy.get(
            ".info-geral > .row > .col-md-12 > .table > tbody > :nth-child(1) > :nth-child(2)"
        ).should("contain", departureStation);
        cy.get(
            ".info-geral > .row > .col-md-12 > .table > tbody > :nth-child(1) > :nth-child(3)"
        ).should("contain", arrivalStation);

        // Validation of inward schedule
        cy.get(
            ".info-geral > .row > .col-md-12 > .table > tbody > :nth-child(2) > :nth-child(1)"
        ).should("contain", `Inward: ${travelDate(returnDelay)}`);
        cy.get(
            ".info-geral > .row > .col-md-12 > .table > tbody > :nth-child(2) > :nth-child(2)"
        ).should("contain", arrivalStation);
        cy.get(
            ".info-geral > .row > .col-md-12 > .table > tbody > :nth-child(2) > :nth-child(3)"
        ).should("contain", departureStation);
    });

    it("cancels order and redirects to Buy Tickets page", () => {
        cy.get("#exitButton").click();
        cy.url().should("contain", "/passageiros/en/buy-tickets");

        cy.document().should(
            "contain.text",
            `departEscapeXml = '${departureStation}';`
        );
        cy.document().should(
            "contain.text",
            `arrivalEscapeXml = '${arrivalStation}';`
        );
        cy.document().should(
            "contain.text",
            `departDateEscapeXml = '${travelDate(departureDelay)}';`
        );
        cy.document().should(
            "contain.text",
            `returnDateEscapeXml = '${travelDate(returnDelay)}';`
        );
        cy.document().should("contain.text", `passengerClassSubmit = '1';`);
        cy.document().should("contain.text", `passengersEscapeXml = '1';`);
    });
});
