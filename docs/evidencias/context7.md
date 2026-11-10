# Evidência — Context7

## O que é

O **Context7** é um servidor de documentação que entrega trechos atualizados das
bibliotecas usadas no projeto (React, Vite, etc.). "Registrar uma evidência do
Context7" significa guardar a **prova de que uma consulta real foi feita**: qual
biblioteca, qual assunto, quando, e o trecho de documentação devolvido.

## Consulta registrada

| Item | Valor |
|---|---|
| Ferramenta | Context7 (API pública de documentação) |
| Biblioteca | `/reactjs/react.dev` — documentação oficial do React |
| Assunto | `useState`, `useEffect` e `localStorage` |
| Data | 2026-11-10 16:54 (UTC-03:00) |
| Status HTTP | `200 OK` |
| Resposta completa | [`context7-react-raw.txt`](./context7-react-raw.txt) |

Endpoint consultado:

```text
https://context7.com/api/v1/reactjs/react.dev?type=txt&topic=useState%20useEffect%20localStorage&tokens=1200
```

## Como reproduzir

```bash
curl "https://context7.com/api/v1/reactjs/react.dev?type=txt&topic=useState%20useEffect%20localStorage&tokens=1200"
```

## O que foi aplicado no projeto

- `useState` controla o tema atual (`dark` / `light`) em `src/App.jsx`.
- `useEffect` aplica `data-theme` no `<html>` e grava a preferência em
  `localStorage` na chave `devlinks-theme`.
- A leitura do `localStorage` também acontece antes do React montar, por meio do
  script inline em `index.html`, evitando o flash de tema errado.

## Limitação

O ambiente não possui o MCP do Context7 configurado no OpenCode, por isso a
consulta foi feita diretamente na API pública do serviço, que é a mesma fonte
usada pelo MCP. A resposta bruta foi salva em `context7-react-raw.txt` para
auditoria.
