describe('로그인 테스트', () => {
  it('로그인 성공 확인', () => {
    cy.visit('https://practicetestautomation.com/practice-test-login/')
    cy.get('#username').type('student')
    cy.get('#password').type('Password123')
    cy.get('button.btn').click()
    cy.contains('Log out').should('be.visible')
  })
})