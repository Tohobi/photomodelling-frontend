import {beforeEach} from 'mocha';

describe('End to End tests for standard user actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');

    cy.get('navbar').should('contain.text', 'Meine Projekte');
    cy.get('.d-flex > [type="text"]').type('Benno3');
    cy.get('.d-flex > [type="password"]').type('Benno3');
    cy.get('.d-flex > .btn').click();
  });

  it('user can sign up', () => {
    cy.url().should('include', '/my-projects'); //
  });

  it('user can create a project', () => {
    cy.get('.justify-content-center > generic-button > .btn').click();
    cy.get('#projectName').type('Testproject Cypress');
    cy.get('#projectDesc').type('example description');
    cy.get('.modal-footer > .btn-primary').click();
    cy.get('.container > :nth-child(3)').should('contain.text', 'Testproject Cypress');
  });

  it('user can edit a project and upload a picture', () => {
    cy.get(':nth-child(3) > .col-3 > [label="Projekt bearbeiten"] > .btn').click();
    cy.url().should('include', '/edit-project/');
    cy.get('#photoUpload').click();
  });

  it('user can delete a project', () => {
    cy.get(':nth-child(3) > .col-3 > [label="Projekt löschen"] > .btn').click();
  });

  it('user can give a rating', () => {
    cy.get('.ms-3 > .btn').click();
    cy.get('navbar').should('contain.text', 'Andere Projekte');
    cy.get('.navbar-nav > :nth-child(2) > .nav-link').click();
    cy.get(':nth-child(3) > .col-3 > .d-flex > generic-button > .btn').click();
    cy.url().should('include', '/other-projects');
    cy.get('.form-select').select(2);
    cy.get('.form-control').type('Das Projekt ist toll');
    cy.get('.modal-footer > .btn-primary').click();
  });
});

