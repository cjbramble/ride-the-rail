import { 
  departureStation,
  arrivalStation
} from '../../exports/constants.js'

class BuyTicketsPage {
  navigateToBuyTickets() {
    cy.get('.title-menu').contains('Tickets').click();
    return this
  }

  selectDepartureStation() {
    cy.get('[name="textBoxPartida"]').type(departureStation).click();
    return this
  }

  selectArrivalStation() {
    cy.get('[name="textBoxChegada"]').type(arrivalStation).click();
    return this
  }

  selectDepartureDatePicker() {
    cy.get('[name="departDate"]').click();
    return this
  }

  selectArrivalDatePicker() {
    cy.get('[name="returnDate"]').click();
    return this
  }
  
  selectSeatClass() {
    cy.get('#option1Label').click()
    return this
  }

  selectPassengerCountDropdown() {
    cy.get('.filter-option').click();
    cy.get('.text').contains('3 Passengers').click();
    return this
  }

  submitsToTicketOffice() {
    cy.get('.btn').contains('Submit').click();
    return this
  }
}

export default BuyTicketsPage
