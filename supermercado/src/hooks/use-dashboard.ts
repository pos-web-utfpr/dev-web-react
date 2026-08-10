import { useState, useMemo } from "react";
import { z } from "zod";
import { api } from "../services/api";
import { useAsyncData } from "./use-async-data";
import { ProductSchema } from "../schemas/product-schema";
import { CartSchema } from "../schemas/cart-schema";

export function useDashboard() {
  // Fetch real products from API
  const { data: products } = useAsyncData(async () => {
    const response = await api.get("/produtos");
    return z.array(ProductSchema).parse(response.data.produtos);
  }, []);

  // Fetch real cart/orders from API
  const { data: carts } = useAsyncData(async () => {
    try {
      const response = await api.get("/carrinhos");
      if (response.data?.carrinhos) {
        return z.array(CartSchema).parse(response.data.carrinhos);
      }
      return [];
    } catch {
      return [];
    }
  }, []);

  const totalProducts = products?.length ?? 0;

  const defaultStart = new Date(2026, 6, 21);
  const defaultEnd = new Date(2026, 7, 31);

  const [dateValue, setDateValue] = useState<[Date | null, Date | null]>([
    defaultStart,
    defaultEnd,
  ]);

  // Aggregate daily revenue filtered by date range
  const { chartData, totalRevenue, totalSales } = useMemo(() => {
    const [startDate, endDate] = dateValue;
    const list = carts ?? [];

    const filteredCarts = list.filter((cart) => {
      if (!cart.data) return true;
      const cartDate = new Date(`${cart.data}T00:00:00`);

      if (
        startDate &&
        cartDate < new Date(startDate.setHours(0, 0, 0, 0))
      ) {
        return false;
      }
      if (
        endDate &&
        cartDate > new Date(endDate.setHours(23, 59, 59, 999))
      ) {
        return false;
      }
      return true;
    });

    const revenueByDate: Record<string, number> = {};

    filteredCarts.forEach((cart) => {
      if (cart.data) {
        const parts = cart.data.split("-");
        const formattedDate =
          parts.length === 3 ? `${parts[2]}/${parts[1]}` : cart.data;
        revenueByDate[formattedDate] =
          (revenueByDate[formattedDate] || 0) + cart.precoTotal;
      }
    });

    const data = Object.entries(revenueByDate).map(
      ([date, faturamento]) => ({
        date,
        faturamento: Number(faturamento.toFixed(2)),
      })
    );

    const totalFaturado = filteredCarts.reduce(
      (acc, cart) => acc + cart.precoTotal,
      0
    );

    return {
      chartData: data,
      totalRevenue: totalFaturado,
      totalSales: filteredCarts.length,
    };
  }, [dateValue, carts]);

  return {
    totalProducts,
    totalRevenue,
    totalSales,
    dateValue,
    setDateValue,
    chartData,
  };
}
