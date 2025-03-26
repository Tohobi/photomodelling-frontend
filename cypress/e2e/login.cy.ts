import {beforeEach} from 'mocha';

describe('Benutzer kann sich einloggen und eigene Projekte bearbeiten und löschen', () => {
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
    //cy.get('#photoUpload').attachFile('kueche.jpg');
  });
});

