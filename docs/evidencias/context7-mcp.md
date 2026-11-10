# Evidência — Context7 MCP

## Configuração

O servidor MCP do Context7 foi configurado no agente pelo arquivo
[`opencode.json`](../../opencode.json) na raiz do projeto:

```json
{
  "mcp": {
    "servers": {
      "context7": {
        "type": "remote",
        "url": "https://mcp.context7.com/mcp"
      }
    }
  }
}
```

Verificação da conexão:

```text
$ opencode mcp list
✓ context7    connected
✓ playwright  connected
```

## Consultas realizadas pelo agente

As duas consultas abaixo foram feitas **pelo agente**, usando as ferramentas do
MCP (`resolve-library-id` e `query-docs`), não por requisição manual.

### 1. `resolve-library-id`

```json
{
  "libraryName": "React",
  "query": "useState and useEffect with localStorage to persist theme preference"
}
```

Resultado (trecho):

```text
- Title: React
- Context7-compatible library ID: /reactjs/react.dev
- Description: React.dev is the official documentation website for React...
- Code Snippets: 5038
- Benchmark Score: 85.67
```

### 2. `query-docs` — useState

```json
{
  "libraryId": "/reactjs/react.dev",
  "query": "How to use the useState hook, including lazy initial state and updating state on click",
  "language": "JavaScript"
}
```

Trecho devolvido (documentação oficial do React):

```js
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>You pressed me {count} times</button>;
}
```

```js
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos);
  // ...
}
```

### 3. `query-docs` — useEffect + localStorage

```json
{
  "libraryId": "/reactjs/react.dev",
  "query": "How to synchronize a component with an external system using useEffect, for example reading and writing localStorage",
  "language": "JavaScript"
}
```

Trecho devolvido:

```js
function Component({ theme }) {
  useEffect(() => {
    localStorage.setItem('preferredTheme', theme);
    document.body.className = theme;
  }, [theme]);

  return <div>Current theme: {theme}</div>;
}
```

## Como isso foi aplicado no projeto

| O que a documentação diz | Onde está no DevLinks |
|---|---|
| `useState` guarda o estado e o setter dispara nova renderização | `src/App.jsx`: `const [theme, setTheme] = useState(...)` |
| `useEffect` sincroniza o componente com um sistema externo | `src/App.jsx`: efeito que grava o tema no `localStorage` e aplica `data-theme` |
| A dependência do efeito é o valor usado dentro dele | o efeito depende de `theme`, como no exemplo acima |
| Inicialização pode vir de uma função | o tema inicial é lido do `localStorage` |

## Arquivos

- [`context7-react-raw.txt`](./context7-react-raw.txt) — resposta bruta da API
  pública do Context7 (consulta equivalente, salva como texto para auditoria).
- [`context7.md`](./context7.md) — primeira evidência, feita pela API pública
  antes do MCP estar configurado.
