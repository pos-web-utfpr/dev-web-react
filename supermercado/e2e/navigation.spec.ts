import { test, expect } from "@playwright/test";

test.describe("Fluxo de Navegação e Proteção de Rotas", () => {
  test("deve navegar da landing page pública para a página de login", async ({ page }) => {
    await page.goto("/");

    // Asserções visuais da página inicial
    await expect(page.getByRole("heading", { name: "Sistema ServeRest ERP" })).toBeVisible();
    await expect(page.getByText("Plataforma de gestão integrada")).toBeVisible();

    // Clica no botão de acesso ao painel
    await page.getByRole("link", { name: "Acessar o Painel" }).click();

    // Valida redirecionamento
    await expect(page).toHaveURL(/\/login/);
  });

  test("deve proteger rotas restritas e redirecionar usuário não autenticado para /login", async ({ page }) => {
    // Tenta acessar /app diretamente sem login
    await page.goto("/app");
    await expect(page).toHaveURL(/\/login/);

    // Tenta acessar /app/produtos diretamente sem login
    await page.goto("/app/produtos");
    await expect(page).toHaveURL(/\/login/);
  });

  test("deve alternar entre Dashboard e Produtos pela barra de navegação", async ({ page }) => {
    // Realiza login inicial
    await page.goto("/login");
    await page.fill('input[type="email"]', "fulano@qa.com");
    await page.fill('input[type="password"]', "teste");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/app/);

    // Navega para Produtos
    await page.getByText("Produtos", { exact: true }).click();
    await expect(page).toHaveURL(/\/app\/produtos/);
    await expect(page.getByRole("heading", { name: "Gestão de Produtos" })).toBeVisible();

    // Volta para Dashboard
    await page.getByText("Dashboard", { exact: true }).click();
    await expect(page).toHaveURL(/\/app/);
    await expect(page.getByRole("heading", { name: "Painel Administrativo" })).toBeVisible();
  });

  test("deve exibir a página 404 ao acessar uma rota inexistente", async ({ page }) => {
    await page.goto("/rota-totalmente-inexistente");
    await expect(page.getByText("Página não encontrada")).toBeVisible();
  });
});
