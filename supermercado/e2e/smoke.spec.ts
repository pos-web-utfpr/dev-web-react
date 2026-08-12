import { test, expect } from "@playwright/test";

test.describe("Fluxos E2E - Integração Frontend e Backend ServeRest Local", () => {
  test("deve carregar a landing page pública com sucesso", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL("/");
  });

  test("deve realizar login com credenciais do ServeRest local", async ({ page }) => {
    await page.goto("/login");

    // Preenche credenciais do usuário padrão inicial do ServeRest
    await page.fill('input[type="email"]', "fulano@qa.com");
    await page.fill('input[type="password"]', "teste");
    await page.click('button[type="submit"]');

    // Valida redirecionamento para o app protegido
    await expect(page).toHaveURL(/\/app/);
  });
});
