class TicketOfficePage {
  cancelOrder() {
    cy.get('#exitButton').click();
    return this
  }
}

export default TicketOfficePage