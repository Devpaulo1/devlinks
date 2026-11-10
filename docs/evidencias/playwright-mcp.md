# Evidência — Playwright MCP

## Configuração

O servidor MCP do Playwright foi configurado no agente em
[`opencode.json`](../../opencode.json):

```json
{
  "mcp": {
    "servers": {
      "playwright": {
        "type": "local",
        "command": ["npx", "-y", "@playwright/mcp@latest", "--browser", "chrome"]
      }
    }
  }
}
```

Conexão verificada:

```text
$ opencode mcp list
✓ context7    connected
✓ playwright  connected
```

## Aplicação testada

- URL: `http://127.0.0.1:5174/` (Vite dev server local)
- Título: `DevLinks`
- Ferramenta: Playwright MCP (agente), navegador Chrome

## Roteiro executado pelo agente

| # | Ação (ferramenta do MCP) | Resultado |
|---|---|---|
| 1 | `browser_navigate` | página abriu com título `DevLinks` |
| 2 | `browser_resize` 1440 × 1024 | `overflowX = 0` |
| 3 | `browser_snapshot` | avatar, `@seu.perfil`, switch, 4 links, 4 redes e rodapé presentes |
| 4 | `browser_take_screenshot` | `mcp-desktop-dark.png` |
| 5 | `browser_click` no switch | `theme: light`, `localStorage: light`, `aria-checked: true` |
| 6 | `browser_take_screenshot` | `mcp-desktop-light.png` |
| 7 | `browser_navigate` (recarregar) | `theme: light` e `stored: light` mantidos |
| 8 | `browser_press_key` `Tab` × 10 | ordem de foco correta (tabela abaixo) |
| 9 | `browser_press_key` `Enter` no switch | tema mudou de `light` para `dark` e gravou `dark` |
| 10 | `browser_console_messages` | 6 mensagens, **0 erros, 0 avisos** |
| 11 | `browser_network_requests` | todas as requisições `200`, nenhuma falha |
| 12 | `browser_click` no link "Veja meu portfólio" | abriu nova aba em `https://github.com/Devpaulo1` |
| 13 | `browser_resize` 360 × 800 | `overflowX = 0`, fundo `bg-mobile.png` |
| 14 | `browser_click` no switch + screenshot | `mcp-mobile-light.png`, fundo `bg-mobile-light.png` |

## Tema e persistência

```text
inicial (desktop):  theme=dark   stored=dark    aria-checked=false
após clique:        theme=light  stored=light   aria-checked=true
após recarregar:    theme=light  stored=light   aria-checked=true   bg=bg-desktop-light.png
após Enter:         theme=dark   stored=dark    aria-checked=false
mobile 360x800:     theme=dark   stored=dark    overflowX=0  bg=bg-mobile.png
```

## Navegação por teclado

Ordem observada ao pressionar `Tab` a partir do topo da página:

```text
1  button.theme-toggle        (Tema claro)
2  a  Inscreva-se no Curso
3  a  Baixe meu e-book
4  a  Veja meu portfólio
5  a  Conheça meu curso
6  a  GitHub
7  a  Instagram
8  a  YouTube
9  a  LinkedIn
10 a  Rocketseat (rodapé)
```

Todos os elementos apresentaram foco visível
(`outline: solid 1.6px`, com a cor do tema ativo). O switch respondeu ao
`Enter`, confirmando que é operável só pelo teclado.

## Console e rede

- Console: `Total messages: 6 (Errors: 0, Warnings: 0)`.
  A única mensagem é o aviso informativo do React DevTools, que aparece apenas
  em modo de desenvolvimento.
- Rede: nenhuma requisição com falha. Fonte Inter, avatar e imagens de fundo
  carregados com `200`.

## Imagens capturadas

- [`mcp-desktop-dark.png`](./mcp-desktop-dark.png)
- [`mcp-desktop-light.png`](./mcp-desktop-light.png)
- [`mcp-mobile-dark.png`](./mcp-mobile-dark.png)
- [`mcp-mobile-light.png`](./mcp-mobile-light.png)

Artefatos brutos do MCP:

- [`playwright-mcp/accessibility-snapshot.yml`](./playwright-mcp/accessibility-snapshot.yml)
- [`playwright-mcp/console.log.txt`](./playwright-mcp/console.log.txt)

## Correções registradas

1. **`.playwright-mcp/` no `.gitignore`** — o servidor MCP grava snapshots e
   logs na raiz do projeto; a pasta passou a ser ignorada para não entrar no
   repositório.
2. **Nenhuma correção visual foi necessária** nesta rodada: espaçamentos,
   botões de 56 px, ícones de 24 px e rodapé já estavam conforme o Figma.

Observação (não corrigida de propósito): o `aria-label` do switch é fixo
(`"Tema claro"`) e o estado é comunicado por `aria-checked`, enquanto o
`title` descreve a ação (`"Ativar tema escuro"`). O comportamento está correto
para leitores de tela, mas os dois textos poderiam ser unificados numa próxima
iteração.
