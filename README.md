# 🚀 Cypress 테스트 자동화 프로젝트 설정 가이드
이 문서는 Cypress를 활용한 E2E 테스트 자동화 프로젝트를 GitHub와 CI/CD 환경(Cypress Cloud + GitHub Actions)으로 연동하는 전체 절차를 정리한 것입니다.

## 1️⃣ 프로젝트 초기화 및 Cypress 설치

1. 프로젝트 폴더 생성 및 진입
```
mkdir cypress_gogo && cd cypress_gogo
```
2. Node 프로젝트 초기화
```
npm init -y
```
3. Cypress 설치
```
npm install cypress --save-dev
```

## 2️⃣ Cypress 폴더 구조 생성 및 실행
```
# Cypress 실행 (초기 폴더 구조 자동 생성)
npx cypress open
```
실행 후 cypress/, cypress.config.js, node_modules, package-lock.json 등이 생성됩니다.

## 3️⃣ 명령어 등록 (커맨드 재사용)
cypress/support/commands.js에 공통 명령어 등록:
```
Cypress.Commands.add('login', () => {
  cy.visit('https://practicetestautomation.com/practice-test-login/')
  cy.get('#username').type('student')
  cy.get('#password').type('Password123')
  cy.get('button.btn').click()
  cy.contains('Logged In Successfully').should('be.visible')
})

Cypress.Commands.add('logout', () => {
  cy.contains('Log out').should('be.visible').click()
  cy.url().should('include', '/practice-test-login')
  cy.get('h2').should('contain', 'Test login')
})
```
cypress/support/e2e.js에서 불러오기:
```
import './commands'
```

## 4️⃣ 테스트 파일 생성
예: cypress/e2e/login.cy.js

```
describe('로그인/로그아웃 테스트', () => {
  beforeEach(() => {
    cy.login()
  })

  it('로그아웃 테스트', () => {
    cy.logout()
  })
})
```

## 5️⃣ GitHub 저장소 연동
```
# 1. Git 초기화 및 커밋
git init
git add .
git commit -m "Initial Cypress Setup"

# 2. GitHub에 저장소 생성 후 연동
git remote add origin https://github.com/사용자명/저장소명.git
git branch -M main
git push -u origin main
```

## 6️⃣ Cypress Cloud 연동
https://cloud.cypress.io/ 접속 → 로그인

“Add new project” → GitHub 저장소와 연결

projectId가 생성됨 → cypress.config.js에 추가
```
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://practicetestautomation.com',
  },
  projectId: '여기에-발급받은-프로젝트-ID'
})
```
Cypress Cloud 대시보드에서 Record Key 복사

## 7️⃣ GitHub Actions (CI/CD) 설정
📁 .github/workflows/cypress.yml 파일 생성
```
name: Cypress Tests

on: [push]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        containers: [1, 2]
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Cypress run
        uses: cypress-io/github-action@v6
        with:
          record: true
          parallel: true
          publish-summary: true
        env:
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## 8️⃣ GitHub Secrets 등록
GitHub → 저장소 → Settings → Secrets and variables → Actions:
```
CYPRESS_RECORD_KEY: Cypress Cloud에서 복사한 Record Key

GITHUB_TOKEN: 자동 설정되어 있음 (별도 발급 필요 없음)
```

## 9️⃣ GitHub Actions 실행 확인
커밋 후 push하면 GitHub → Actions 탭에서 워크플로우가 자동 실행됩니다.

✅ 마무리 체크리스트
- [x] Cypress 설치 및 기본 테스트 실행
- [x] 공통 명령어 등록 (`commands.js`)
- [x] GitHub 저장소 및 초기 커밋 완료
- [x] Cypress Cloud 연동 및 Record Key 설정
- [x] GitHub Actions 자동 실행 확인
