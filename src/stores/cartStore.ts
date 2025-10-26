import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";

// 장바구니 아이템 타입
interface CartItem {
  product: Product;
  quantity: number;
}

// 장바구니 스토어 타입
interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

// 장바구니 스토어 생성

// export const useCartStore = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       // 초기 상태
//       items: [],

//       // 아이템 추가
//       addItem: (product: Product, quantity = 1) => {
//         set((state) => {
//           const existingItem = state.items.find(
//             (item) => item.product.id === product.id
//           );

//           if (existingItem) {
//             // 이미 있으면 수량 증가
//             return {
//               items: state.items.map((item) =>
//                 item.product.id === product.id
//                   ? { ...item, quantity: item.quantity + quantity }
//                   : item
//               )
//             };
//           } else {
//             // 새로 추가
//             return {
//               items: [...state.items, { product, quantity }]
//             };
//           }
//         });
//       },

//       // 아이템 제거
//       removeItem: (productId: string) => {
//         set((state) => ({
//           items: state.items.filter((item) => item.product.id !== productId)
//         }));
//       },

//       // 수량 업데이트
//       updateQuantity: (productId: string, quantity: number) => {
//         if (quantity <= 0) {
//           get().removeItem(productId);
//           return;
//         }

//         set((state) => ({
//           items: state.items.map((item) =>
//             item.product.id === productId ? { ...item, quantity } : item
//           )
//         }));
//       },

//       // 장바구니 비우기
//       clearCart: () => {
//         set({ items: [] });
//       },

//       // 총 아이템 개수
//       getTotalItems: () => {
//         return get().items.reduce((total, item) => total + item.quantity, 0);
//       },

//       // 총 가격
//       getTotalPrice: () => {
//         return get().items.reduce(
//           (total, item) => total + item.product.price * item.quantity,
//           0
//         );
//       }
//     }),
//     {
//       name: "cart-storage" // LocalStorage 키
//     }
//   )
// );
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      // 아이템 추가
      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: existingItem.quantity + quantity }
                  : item
              )
            };
          } else {
            return {
              items: [...state.items, { product, quantity }]
            };
          }
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId)
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          )
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      }
    }),
    { name: "cart-storage" }
  )
);
