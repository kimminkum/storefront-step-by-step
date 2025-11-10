import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order, ShippingInfo, OrderItem } from "@/types";

interface OrderStore {
  orders: Order[];
  currentOrder: Order | null;
  createOrder: (
    items: OrderItem[],
    shippingInfo: ShippingInfo,
    totalPrice: number
  ) => Order;
  getOrderById: (id: string) => Order | undefined;
  cancelOrder: (id: string) => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      currentOrder: null,

      createOrder: (items, shippingInfo, totalPrice) => {
        const order: Order = {
          id: `ORDER-${Date.now()}`,
          items,
          shippingInfo,
          totalPrice,
          status: "pending",
          createdAt: new Date().toISOString()
        };

        set((state) => ({
          orders: [order, ...state.orders],
          currentOrder: order
        }));

        return order;
      },

      getOrderById: (id) => {
        return get().orders.find((order) => order.id === id);
      },

      cancelOrder: (id) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, status: "cancelled" as const } : order
          )
        }));
      }
    }),
    { name: "order-storage" }
  )
);
