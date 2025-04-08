describe('로그인/로그아웃 테스트', () => {
  beforeEach('로그인 테스트', () => {
    cy.login();
  })

  it('로그아웃 테스트', () => {
    cy.logout();
  })
})