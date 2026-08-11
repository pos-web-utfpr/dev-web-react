import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { DashboardHeader } from "./dashboard-header";

describe("DashboardHeader", () => {
  it("deve renderizar o título e o badge do sistema operacional", () => {
    render(
      <MantineProvider>
        <DashboardHeader />
      </MantineProvider>
    );

    expect(screen.getByText("Painel Administrativo")).toBeInTheDocument();
    expect(screen.getByText("Sistema Operacional")).toBeInTheDocument();
  });
});
