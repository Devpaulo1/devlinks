# Evidência — Playwright

## O que é

O **Playwright** é a ferramenta de testes que abre a aplicação em um navegador
real, simula cliques e digitação e verifica o resultado. "Registrar uma evidência
do Playwright" significa guardar a **prova de que os testes foram executados**:
o comando usado, a saída do terminal com o resultado e, de preferência, capturas
geradas pelo próprio teste.

## Execução registrada

| Item | Valor |
|---|---|
| Ferramenta | Playwright Test `1.65.0` |
| Comando | `npm run test:e2e` |
| Data | 2026-11-10 (UTC-03:00) |
| Navegador | Chrome instalado na máquina (`channel: 'chrome'`) |
| Viewports | `1440 × 1024` (desktop) e `360 × 800` (mobile) |
| Resultado | **6 testes aprovados** (3 cenários × 2 viewports) |
| Saída completa | [`playwright-run.txt`](./playwright-run.txt) |
| Arquivo de testes | [`tests/devlinks.spec.js`](../../tests/devlinks.spec.js) |
| Configuração | [`playwright.config.js`](../../playwright.config.js) |

## Cenários testados

1. **Carregamento** — título `DevLinks`, idioma `pt-BR`, avatar e `@usuário`
   visíveis, nenhum erro no console e zero rolagem horizontal.
2. **Links** — os 4 botões e as 4 redes sociais apontam para os destinos
   corretos, abrem em nova aba com `rel="noopener noreferrer"` e não existe
   nenhum `href="#"`.
3. **Tema** — começa em escuro, alterna para claro pelo botão, grava `light` no
   `localStorage` e mantém a preferência após recarregar a página.

## Prints gerados pelo Playwright

- [`playwright-desktop-dark.png`](./playwright-desktop-dark.png)
- [`playwright-desktop-light.png`](./playwright-desktop-light.png)
- [`playwright-mobile-dark.png`](./playwright-mobile-dark.png)
- [`playwright-mobile-light.png`](./playwright-mobile-light.png)

## Como reproduzir

```bash
npm install
npm run test:e2e
```

O `playwright.config.js` usa `channel: 'chrome'`, então o Chrome já instalado no
computador é reaproveitado e **não é necessário baixar navegadores** com
`npx playwright install`. O Vite sobe automaticamente durante o teste.

## Limitação

O ambiente não possui o MCP do Playwright configurado no OpenCode. Por isso os
testes foram executados pelo pacote oficial `@playwright/test`, instalado como
dependência de desenvolvimento do próprio projeto — o mesmo motor usado pelo MCP.
