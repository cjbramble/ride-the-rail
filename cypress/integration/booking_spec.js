/// <reference types="cypress" />

const departureStation = "Lagos";
const arrivalStation = "Porto - Campanha";

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
        // cy.get('[name="departDate"]').clear().type(departure, `{enter}`); // TODO: stop field from clearing
        // cy.get('[name="returnDate"]').clear().type(arrival, `{enter}`); // TODO: this isn't typing
        // TODO: find dynamic method for the following or make above work
        cy.get('[name="departDate"]').click();
        cy.get("#datepicker-first_table")
            .find(`[data-pick="${1642636800000}"]`)
            .click();
        cy.get('[name="returnDate"]').click();
        cy.get("#datepicker-second_table")
            .find(`[data-pick="${1643760000000}"]`)
            .click();
    });

    it("selects seating class", () => {
        cy.get("#option1Label").click(); // TODO: validate selection is active
    });

    it("redirects to confirmation page", () => {
        cy.get("p > .btn").click();
        cy.url().should("contain", "/bilheteira/comprar"); // TODO: validate locations and dates too

        // Validation of outward schedule
        cy.get(
            ".info-geral > .row > .col-md-12 > .table > tbody > :nth-child(1) > :nth-child(1)"
        ).should("contain", "Outward: 2022-01-20"); // TODO: make date dynamic
        cy.get(
            ".info-geral > .row > .col-md-12 > .table > tbody > :nth-child(1) > :nth-child(2)"
        ).should("contain", departureStation);
        cy.get(
            ".info-geral > .row > .col-md-12 > .table > tbody > :nth-child(1) > :nth-child(3)"
        ).should("contain", arrivalStation);

        // Validation of inward schedule
        cy.get(
            ".info-geral > .row > .col-md-12 > .table > tbody > :nth-child(2) > :nth-child(1)"
        ).should("contain", "Inward: 2022-02-02"); // TODO: make date dynamic
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
