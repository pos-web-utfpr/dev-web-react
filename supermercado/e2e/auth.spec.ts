import { test, expect } from "@playwright/test";

test.describe("Fluxo de Autenticação e Login", () => {
  test("deve realizar login com sucesso informando credenciais válidas", async ({
    page,
  }) => {
    await page.goto("/login");

    // Preenche o formulário de login
    await page.fill('input[type="email"]', "fulano@qa.com");
    await page.fill('input[type="password"]', "teste");
    await page.click('button[type="submit"]');

    // Validação de redirecionamento e visibilidade do painel principal
    await expect(page).toHaveURL(/\/app/);
    await expect(
      page.getByRole("heading", { name: "ServeRest ERP" }),
    ).toBeVisible();
    await expect(page.getByText("Dashboard")).toBeVisible();
  });

  test("deve exibir notificação de erro ao informar senha incorreta", async ({
    page,
  }) => {
    await page.goto("/login");

    await page.fill('input[type="email"]', "fulano@qa.com");
    await page.fill('input[type="password"]', "senha_errada");
    await page.click('button[type="submit"]');

    // Valida mensagem de erro da API/notificação e que a URL permanece no login
    await expect(page.getByText("Email e/ou senha inválidos")).toBeVisible();
    await expect(page).toHaveURL(/\/login/);

    // Captura screenshot demonstrativo da notificação de erro de login
    await page.screenshot({
      path: "e2e/screenshots/login-invalido.png",
      fullPage: true,
    });
  });

  test("deve permitir realizar logout e retornar para a página de login", async ({
    page,
  }) => {
    // Efetua login
    await page.goto("/login");
    await page.fill('input[type="email"]', "fulano@qa.com");
    await page.fill('input[type="password"]', "teste");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/app/);

    // Clica no botão de logout
    await page.getByRole("button", { name: "Sair" }).click();

    // Valida retorno ao login
    await expect(page).toHaveURL(/\/login/);
    await expect(
      page.getByRole("heading", { name: "ServeRest ERP" }),
    ).toBeVisible();
  });
});
