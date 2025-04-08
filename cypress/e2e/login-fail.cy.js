describe('잘못된 로그인 시도 테스트', () => {
    beforeEach(() => {
      cy.visit('https://practicetestautomation.com/practice-test-login/')
    })
  
    it('password 잘못 입력 시,', () => {
      cy.get('#username').type('student')
      cy.get('#password').type('wrongPassword')
      cy.get('button.btn').click()
      cy.get('#error').should('contain', 'Your password is invalid!')
    })

    it('username 잘못 입력 시,', () => {
        cy.get('#username').type('incorrectUser')
        cy.get('#password').type('Password123 ')
        cy.get('button.btn').click()
        cy.get('#error').should('contain', 'Your username is invalid!')
    })
  })