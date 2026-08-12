# Supermercado ServeRest ERP

Aplicação Web ERP desenvolvida em React + TypeScript + Vite, integrada à API local ServeRest para controle de catálogo, estoque e relatórios de produtos.

---

## 🛠️ Scripts e Comandos

### Desenvolvimento

```bash
yarn dev       # Inicia o servidor de desenvolvimento Vite (http://localhost:5173)
yarn build     # Compila a aplicação para produção
```

### 🧪 Testes Unitários (Vitest)

```bash
yarn test      # Executa os testes unitários em modo watch
yarn test:run  # Executa todos os testes unitários uma vez (CI/CD)
yarn test:ui   # Abre a interface visual do Vitest
```

### 🎭 Testes End-to-End / E2E (Playwright + ServeRest Local)

```bash
yarn test:e2e        # Executa os testes E2E em modo headless
yarn test:e2e:ui     # Executa os testes E2E na interface visual interativa
yarn test:e2e:report # Abre o relatório HTML detalhado com capturas de tela
yarn db:reset        # Reseta os arquivos do banco (.db) do ServeRest local
```
