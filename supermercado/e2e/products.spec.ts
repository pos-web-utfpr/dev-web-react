import { test, expect } from "@playwright/test";

test.describe("Fluxo de Gestão de Produtos (CRUD e Formulários)", () => {
  // Executado antes de cada teste desta suíte para garantir autenticação
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "fulano@qa.com");
    await page.fill('input[type="password"]', "teste");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/app/);
  });

  test("deve listar os produtos cadastrados no catálogo", async ({ page }) => {
    await page.goto("/app/produtos");

    // Asserções visuais da página de catálogo
    await expect(page.getByRole("heading", { name: "Gestão de Produtos" })).toBeVisible();
    await expect(page.getByRole("table").getByText("Logitech MX Vertical")).toBeVisible();
    await expect(page.getByRole("table").getByText("Samsung 60 polegadas")).toBeVisible();
  });

  test("deve realizar o cadastro de um novo produto com sucesso", async ({ page }) => {
    await page.goto("/app/produtos");

    // Clica para abrir o formulário de cadastro
    await page.getByRole("link", { name: "Novo Produto" }).click();
    await expect(page).toHaveURL("/app/produtos/novo");
    await expect(page.getByRole("heading", { name: "Cadastrar Produto" })).toBeVisible();

    // Preenche os campos do formulário
    await page.fill('input[placeholder="Ex: Teclado Mecânico"]', "Monitor Gaming 144Hz");
    await page.fill('input[placeholder="0.00"]', "1250");
    await page.fill('textarea[placeholder="Descrição detalhada do produto"]', "Monitor curvo alta performance");
    await page.fill('input[placeholder="0"]', "15");

    // Submete o formulário
    await page.getByRole("button", { name: "Cadastrar Produto" }).click();

    // Valida redirecionamento e notificação de sucesso na lista
    await expect(page).toHaveURL("/app/produtos");
    await expect(page.getByRole("table").getByText("Monitor Gaming 144Hz")).toBeVisible();
  });

  test("deve visualizar os detalhes de um produto", async ({ page }) => {
    await page.goto("/app/produtos");

    // Clica no botão Detalhes do produto "Logitech MX Vertical"
    const produtoRow = page.getByRole("row", { name: /Logitech MX Vertical/i });
    await produtoRow.getByRole("link", { name: "Detalhes" }).click();

    // Valida que a rota mudou para os detalhes e os dados estão visíveis
    await expect(page).toHaveURL(/\/app\/produtos\/[a-zA-Z0-9]+/);
    await expect(page.getByRole("heading", { name: "Logitech MX Vertical" })).toBeVisible();
    await expect(page.getByText("Mouse").first()).toBeVisible();
  });

  test("deve editar as informações de um produto existente", async ({ page }) => {
    await page.goto("/app/produtos");

    // Clica no botão Editar do produto "Samsung 60 polegadas"
    const produtoRow = page.getByRole("row", { name: /Samsung 60 polegadas/i });
    await produtoRow.getByRole("link", { name: "Editar" }).click();

    await expect(page).toHaveURL(/\/app\/produtos\/[a-zA-Z0-9]+\/editar/);
    await expect(page.getByRole("heading", { name: "Editar Produto" })).toBeVisible();

    // Altera a descrição e submete
    await page.fill('textarea[placeholder="Descrição detalhada do produto"]', "TV Smart 4K UHD 60 polegadas");
    await page.getByRole("button", { name: "Salvar Alterações" }).click();

    // Valida retorno para a lista
    await expect(page).toHaveURL("/app/produtos");
    await expect(page.getByText("TV Smart 4K UHD 60 polegadas")).toBeVisible();
  });

  test("deve excluir um produto do catálogo e confirmar a remoção", async ({ page }) => {
    await page.goto("/app/produtos");

    // Identifica a linha do produto "Tes" para exclusão
    const produtoRow = page.getByRole("row", { name: /Tes/i });
    await produtoRow.getByRole("button", { name: "Excluir" }).click();

    // Valida visibilidade do modal de confirmação e confirma a exclusão
    await expect(page.getByText("Confirmar exclusão de produto")).toBeVisible();
    await page.getByRole("button", { name: "Excluir produto" }).click();

    // Valida que o produto foi removido da interface
    await expect(page.getByRole("row", { name: /Tes/i })).not.toBeVisible();
  });
});
