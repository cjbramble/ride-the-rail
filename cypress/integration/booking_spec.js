/// <reference types='cypress' />

import { 
  departureStation,
  arrivalStation,
  departDateElement,
  returnDateElement,
  departureDelay,
  returnDelay
} from '../exports/constants.js'

import travelDate from '../exports/functions.js'

describe('Can search for a trip', () => {
  it('redirects to Buy Tickets interface', () => {
      
    cy
      .visit('/');

    cy
      .get(':nth-child(2) > .btn > .desc-menu')
      .click();

    // Validates redirect url
    cy
      .url()
      .should('contain', '/passageiros/en/buy-tickets');
  });

  it('selects departure and arrival locations', () => {
      
    cy
      .get('[name="textBoxPartida"]')
      .type(departureStation)
      .click();
    
    cy
      .get('#searchTimetableForm > .col-md-12 > :nth-child(1) > :nth-child(3)')
      .should('contain.text', departureStation);
    
    cy
      .get('[name="textBoxChegada"]')
      .type(arrivalStation)
      .click();
    
    cy
      .get('#searchTimetableForm > .col-md-12 > :nth-child(1) > :nth-child(4)')
      .should('contain.text', arrivalStation);
  });

  it('selects departure and arrival dates', () => {
      
    cy
      .get('[name="departDate"]')
      .click();
    
    cy
      .setTravelDate(departDateElement, departureDelay);
    
    cy
      .get('[name="returnDate"]')
      .click();
    
    cy
      .setTravelDate(returnDateElement, returnDelay);
  });

  it('selects seating class', () => {
      
    cy
      .get('#option1Label')
      .click()
      .should('have.class', 'active');
  });

  it('selects number of passengers', () => {
      
    cy
      .get('.filter-option')
      .click();

    cy
      .get('[data-original-index="2"] > a > .text')
      .click();
  });

  it('redirects to confirmation page upon submit', () => {
      
    cy
      .get('p > .btn')
      .click();
    
    // Validates redirect url
    cy
      .url()
      .should('contain', '/bilheteira/comprar');
    
    // Validates the number of passengers
    cy
      .get('.reserveDiv')
      .should('contain.text', '3 Passenger(s)')

    // Validation of outward schedule
    cy
      .get('.info-geral > .row > .col-md-12 > .table > tbody > :nth-child(1) > :nth-child(1)')
      .should('contain', `Outward: ${travelDate(departureDelay)}`);
    
    cy
      .get('.info-geral > .row > .col-md-12 > .table > tbody > :nth-child(1) > :nth-child(2)')
      .should('contain', departureStation);
    
    cy
      .get('.info-geral > .row > .col-md-12 > .table > tbody > :nth-child(1) > :nth-child(3)')
      .should('contain', arrivalStation);

    // Validation of return schedule
    cy
      .get('.info-geral > .row > .col-md-12 > .table > tbody > :nth-child(2) > :nth-child(1)')
      .should('contain', `Inward: ${travelDate(returnDelay)}`);
    
    cy
      .get('.info-geral > .row > .col-md-12 > .table > tbody > :nth-child(2) > :nth-child(2)')
      .should('contain', arrivalStation);
    
    cy
      .get('.info-geral > .row > .col-md-12 > .table > tbody > :nth-child(2) > :nth-child(3)')
      .should('contain', departureStation);
  });

  it('cancels order and redirects to Buy Tickets page with previous data visible', () => {
      
    cy
      .get('#exitButton')
      .click();
    
    // Validates redirect url
    cy
      .url()
      .should('contain', '/passageiros/en/buy-tickets');

    // Validates times, stations, class, and passenger
    cy
      .document()
      .should('contain.text', `departEscapeXml = '${departureStation}';`)
      .should('contain.text', `arrivalEscapeXml = '${arrivalStation}';`)
      .should('contain.text', `departDateEscapeXml = '${travelDate(departureDelay)}';`)
      .should('contain.text', `returnDateEscapeXml = '${travelDate(returnDelay)}';`)
      .should('contain.text', `passengerClassSubmit = '1';`)
      .should('contain.text', `passengersEscapeXml = '3';`);
  });
});
