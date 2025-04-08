// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', () => {
    cy.visit('https://practicetestautomation.com/practice-test-login/');

    // 로그인 입력
    cy.get('#username').type('student');
    cy.get('#password').type('Password123');
    cy.get('button.btn').click();

    // 로그인 성공 확인
    cy.contains('Logged In Successfully').should('be.visible');
 })

 Cypress.Commands.add('logout', () => {
    cy.contains('Log out').should('be.visible'); // 로그아웃 버튼확인
    cy.contains('Log out').click(); // 로그아웃 클릭
    cy.url().should('include', '/practice-test-login'); // 로그아웃 이후 url
    cy.get('h2').should('contain', 'Test login'); // 로그인 페이지 확인
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })