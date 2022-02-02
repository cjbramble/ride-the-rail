/// <reference types='cypress' />

import { 
  departureStation,
  arrivalStation,
  departDateElement,
  returnDateElement,
  departureDelay,
  returnDelay
} from '../exports/constants.js'

import BuyTicketsPage from './PageObject/BuyTicketsPage.js';
import HomePage from './PageObject/HomePage.js';
import TicketOfficePage from './PageObject/TicketOfficePage.js';
import travelDate from '../exports/functions.js'

describe('Can search for a trip, confirm selections, cancel trip, and validate selections were maintained', () => {
  it('persists selections from Buy Tickets to Ticket Office and back to Buy Tickets', () => {
    const homePage = new HomePage();
    const buyTickets = new BuyTicketsPage();
    const ticketOffice = new TicketOfficePage();

    // Root of project (english)
    homePage.loadHomePage();

    // Navigate to Buy Tickets interface
    buyTickets.navigateToBuyTickets();
    cy.url().should('contain', '/passageiros/en/buy-tickets');

    // Select departure station
    buyTickets.selectDepartureStation();
    cy.get(':nth-child(3)').should('contain.text', departureStation);
    
    // Select arrival station
    buyTickets.selectArrivalStation();
    cy.get(':nth-child(4)').should('contain.text', arrivalStation);

    cy.pause()
    
    // Select departure date from datepicker TODO: validate selected date
    buyTickets.selectDepartureDatePicker();
    cy.setTravelDate(departDateElement, departureDelay);
    cy.get('#datepicker-first')
    
    // Select arrival date from datepicker TODO: validate selected date
    buyTickets.selectArrivalDatePicker();
    cy.setTravelDate(returnDateElement, returnDelay);
      
    // Select seat class
    buyTickets.selectSeatClass();
    cy.get('#option1Label').should('have.class', 'active');

    // Select number of passengers
    buyTickets.selectPassengerCountDropdown();
    cy.get('.filter-option').should('contain.text', '3 Passengers ')
      
    // Submit buy tickets and redirects to Ticket Office
    buyTickets.submitsToTicketOffice();
    cy.url().should('contain', '/bilheteira/comprar');
    
    // Validate the number of passengers
    cy.get('.reserveDiv').should('contain.text', '3 Passenger(s)');

    // Validate the seating class
    cy.get('div').should('contain.text', '- 1st Class / Comfort');

    // Validation of outward schedule
    cy.get(':nth-child(1)').should('contain', `Outward: ${travelDate(departureDelay)}`);
    cy.get(':nth-child(2)').should('contain', departureStation);
    cy.get(':nth-child(3)').should('contain', arrivalStation);

    // Validation of return schedule
    cy.get(':nth-child(1)').should('contain', `Inward: ${travelDate(returnDelay)}`);
    cy.get(':nth-child(2)').should('contain', arrivalStation);
    cy.get(':nth-child(3)').should('contain', departureStation);
      
    // Cancel Ticket Office order
    ticketOffice.cancelOrder();
    cy.url().should('contain', '/passageiros/en/buy-tickets');

    // Validates times, stations, class, and passenger
    cy.document()
      .should('contain.text', `departEscapeXml = '${departureStation}';`)
      .should('contain.text', `arrivalEscapeXml = '${arrivalStation}';`)
      .should('contain.text', `departDateEscapeXml = '${travelDate(departureDelay)}';`)
      .should('contain.text', `returnDateEscapeXml = '${travelDate(returnDelay)}';`)
      .should('contain.text', `passengerClassSubmit = '1';`)
      .should('contain.text', `passengersEscapeXml = '3';`);
  });
});
