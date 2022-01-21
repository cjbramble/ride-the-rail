/// <reference types="cypress" />


declare namespace Cypress {
    interface Chainable {
    /**
     * Sets a future travel date.
     * @example cy.setTravelDate(returnDateElement, returnDelay)
     */
    setTravelDate()
    }
}