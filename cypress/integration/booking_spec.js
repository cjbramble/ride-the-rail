/// <reference types="cypress" />

const departureStation = "Lagos";
const arrivalStation = "Porto - Campanha";

describe("Can search for a trip", () => {
    it("redirects to Buy Tickets interface", () => {
        cy.visit("/");

        // TODO: Find better element to select
        cy.get(":nth-child(2) > .btn > .desc-menu").click();
        cy.url().should("contain", "/passageiros/en/buy-tickets");
    });

    it("selects departure and arrival dates", () => {
        /* TODO: Handle future date calculations
        edge cases:
        overlap to upcoming month
        months have different number of days
        leap year
        */
        cy.get('[name="departDate"]').click();
        cy.get('[name="returnDate"]').type("31 January, 2022").click();
    });

    it("selects departure and arrival locations", () => {
        // TODO: fix the flakiness by making sure dropdown goes away and move these above date pickers
        cy.get('[name="textBoxPartida"]').type(departureStation).click();
        cy.get("ul.typeahead.dropdown-menu")
            .children()
            .should("contain.text", departureStation);
        // TODO: fix below validation possibly by iterating down through ul>li of parent classes
        cy.get('[name="textBoxChegada"]').type(arrivalStation).click();
        // cy.get('ul.typeahead.dropdown-menu').children().should('contain.text', arrivalStation)
    });

    it("selects seating class", () => {
        cy.get("#option1Label").click();
    });

    it("redirects to confirmation page", () => {
        cy.get("p > .btn").click(); // TODO: find better selector
        cy.url().should("contain", "/bilheteira/comprar/sem-viagens"); // TODO: validate locations and dates too
    });

    it("cancels order and redirects to Buy Tickets page", () => {
        cy.get("#exitButton").click();
        cy.url().should("contain", "/passageiros/en/buy-tickets");

        // TODO: Validates selections persist after cancel and redirect
    })
});
