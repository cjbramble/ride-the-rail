/// <reference types="cypress" />


const departureStation = "Lagos"
const arrivalStation = "Porto - Campanha"

describe("Can search for a trip", () => {
    it("can search for a route", () => {
        cy.visit("/")

        // TODO: Find better element to select
        cy.get(':nth-child(2) > .btn > .desc-menu')
          .click()

        cy.get('[name="textBoxPartida"]')
          .type(departureStation)

          cy.get('[name="textBoxChegada"]')
          .type(arrivalStation)
    })
})