# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

# Husky Configuration

Este projeto usa o Husky para executar hooks do Git que garantem a qualidade do código.

## Hooks Configurados

### pre-commit
- Executa ESLint e Prettier apenas nos arquivos que foram modificados (usando lint-staged)
- Corrige automaticamente problemas de linting e formatação quando possível
- Falha se houver erros de linting que não podem ser corrigidos automaticamente

### commit-msg
- Valida o formato da mensagem de commit seguindo o padrão Conventional Commits
- Formato esperado: `type(scope): description`
- Tipos válidos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

#### Exemplos de mensagens válidas:
```
feat(auth): add login functionality
fix(ui): resolve button styling issue
docs: update README with installation instructions
refactor(api): simplify user service
```

### pre-push
- Executa ESLint em todo o projeto
- Verifica tipos TypeScript
- Executa build para garantir que o projeto compila corretamente

## Scripts Disponíveis

- `npm run lint` - Executa ESLint
- `npm run lint:fix` - Executa ESLint e corrige problemas automaticamente
- `npm run format` - Formata código com Prettier
- `npm run format:check` - Verifica se o código está formatado corretamente
- `npm run type-check` - Verifica tipos TypeScript sem gerar arquivos

## Configuração

### Prettier
Configurado em `.prettierrc` com as seguintes opções:
- 80 caracteres por linha
- 2 espaços para indentação
- Aspas simples
- Trailing commas
- Quebra de linha LF

### ESLint
Configurado seguindo as melhores práticas para React e TypeScript.

## Bypassing Hooks (Não Recomendado)

Em casos excepcionais, você pode pular os hooks:
```bash
git commit -m "message" --no-verify
git push --no-verify
```

**⚠️ Atenção:** Pular hooks pode introduzir código de baixa qualidade no repositório.

