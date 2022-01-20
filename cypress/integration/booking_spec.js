/// <reference types="cypress" />

const departureStation = "Lagos";
const arrivalStation = "Porto - Campanha";
const departureDelay = 3;
const arrivalDelay = 6;

// Move date picker logic to custom command and paramterize.
const date = new Date();
const dayOfMonth = date.getDate();
const departureDay = dayOfMonth + departureDelay;
const returnDay = dayOfMonth + arrivalDelay;
const year = date.getFullYear();
const month = date.getMonth();
const departureDateTUC = new Date(Date.UTC(year, month, departureDay, 0, 0, 0));
const departureDate = departureDateTUC.valueOf();
const returnDateUTC = new Date(Date.UTC(year, month, returnDay, 0, 0, 0));
const returnDate = returnDateUTC.valueOf();

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
        // TODO: find dynamic method for the following or make above work
        cy.get('[name="departDate"]').click();
        cy.get("#datepicker-first_table")
            .find(`[data-pick="${departureDate}"]`)
            .click();
        cy.get('[name="returnDate"]').click();
        cy.get("#datepicker-second_table")
            .find(`[data-pick="${returnDate}"]`)
            .click();
    });

    it("selects seating class", () => {
        cy.get("#option1Label").click().should("have.class", "active");
    });

    it("redirects to confirmation page", () => {
        cy.get("p > .btn").click();
        cy.url().should("contain", "/bilheteira/comprar"); // TODO: validate locations and dates too

        // Validation of outward schedule
        cy.get(
            ".info-geral > .row > .col-md-12 > .table > tbody > :nth-child(1) > :nth-child(1)"
        ).should("contain", `Outward: ${year}`); // TODO: handle month being represented as single digit to validate entire string
        cy.get(
            ".info-geral > .row > .col-md-12 > .table > tbody > :nth-child(1) > :nth-child(2)"
        ).should("contain", departureStation);
        cy.get(
            ".info-geral > .row > .col-md-12 > .table > tbody > :nth-child(1) > :nth-child(3)"
        ).should("contain", arrivalStation);

        // Validation of inward schedule
        cy.get(
            ".info-geral > .row > .col-md-12 > .table > tbody > :nth-child(2) > :nth-child(1)"
        ).should("contain", `Inward: ${year}`); // TODO: handle month being represented as single digit to validate entire string
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

        // TODO: Validates selections persist after cancel and redirect
    });
});
