// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { CartItem, Product, QuantityOption } from '@/types/product';

// interface CartStore {
//   items: CartItem[];
//   promoCode: string | null;
//   discount: number;
//   addItem: (product: Product, quantity: QuantityOption) => void;
//   removeItem: (productId: string, quantityValue: number) => void;
//   updateItemCount: (productId: string, quantityValue: number, count: number) => void;
//   clearCart: () => void;
//   applyPromoCode: (code: string, discount: number) => void;
//   removePromoCode: () => void;
//   getTotalPrice: () => number;
//   getTotalItems: () => number;
// }

// export const useCart = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       items: [],
//       promoCode: null,
//       discount: 0,
      
//       addItem: (product, quantity) => {
//         const items = get().items;
//         const existingItem = items.find(
//           item => item.product.id === product.id && 
//           item.quantity.value === quantity.value
//         );
        
//         if (existingItem) {
//           set({
//             items: items.map(item =>
//               item.product.id === product.id && item.quantity.value === quantity.value
//                 ? { ...item, count: item.count + 1 }
//                 : item
//             ),
//           });
//         } else {
//           set({ items: [...items, { product, quantity, count: 1 }] });
//         }
//       },
      
//       removeItem: (productId, quantityValue) => {
//         set({
//           items: get().items.filter(
//             item => !(item.product.id === productId && item.quantity.value === quantityValue)
//           ),
//         });
//       },
      
//       updateItemCount: (productId, quantityValue, count) => {
//         if (count <= 0) {
//           get().removeItem(productId, quantityValue);
//           return;
//         }
        
//         set({
//           items: get().items.map(item =>
//             item.product.id === productId && item.quantity.value === quantityValue
//               ? { ...item, count }
//               : item
//           ),
//         });
//       },
      
//       clearCart: () => {
//         set({ items: [], promoCode: null, discount: 0 });
//       },
      
//       applyPromoCode: (code, discount) => {
//         set({ promoCode: code, discount });
//       },
      
//       removePromoCode: () => {
//         set({ promoCode: null, discount: 0 });
//       },
      
//       getTotalPrice: () => {
//         const items = get().items;
//         const subtotal = items.reduce(
//           (total, item) => total + item.quantity.price * item.count,
//           0
//         );
//         const discount = get().discount;
//         return subtotal * (1 - discount / 100);
//       },
      
//       getTotalItems: () => {
//         return get().items.reduce((total, item) => total + item.count, 0);
//       },
//     }),
//     {
//       name: 'cart-storage',
//     }
//   )
// );
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, QuantityOption } from '@/types/product';

interface CartStore {
  items: CartItem[];
  promoCode: string | null;
  discountType: 'percent' | 'amount' | null; // NEW: Track type
  discountValue: number; // NEW: Renamed from 'discount' to be generic
  
  addItem: (product: Product, quantity: QuantityOption) => void;
  removeItem: (productId: string, quantityValue: number) => void;
  updateItemCount: (productId: string, quantityValue: number, count: number) => void;
  clearCart: () => void;
  
  // Updated signature to accept type
  applyPromoCode: (code: string, type: 'percent' | 'amount', value: number) => void;
  removePromoCode: () => void;
  
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      discountType: null,
      discountValue: 0,
      
      addItem: (product, quantity) => {
        const items = get().items;
        const existingItem = items.find(
          item => item.product.id === product.id && 
          item.quantity.value === quantity.value
        );
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.product.id === product.id && item.quantity.value === quantity.value
                ? { ...item, count: item.count + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { product, quantity, count: 1 }] });
        }
      },
      
      removeItem: (productId, quantityValue) => {
        set({
          items: get().items.filter(
            item => !(item.product.id === productId && item.quantity.value === quantityValue)
          ),
        });
      },
      
      updateItemCount: (productId, quantityValue, count) => {
        if (count <= 0) {
          get().removeItem(productId, quantityValue);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.product.id === productId && item.quantity.value === quantityValue
              ? { ...item, count }
              : item
          ),
        });
      },
      
      clearCart: () => {
        set({ items: [], promoCode: null, discountType: null, discountValue: 0 });
      },
      
      applyPromoCode: (code, type, value) => {
        set({ promoCode: code, discountType: type, discountValue: value });
      },
      
      removePromoCode: () => {
        set({ promoCode: null, discountType: null, discountValue: 0 });
      },
      
      getTotalPrice: () => {
        const { items, discountType, discountValue } = get();
        
        const subtotal = items.reduce(
          (total, item) => total + item.quantity.price * item.count,
          0
        );

        if (!discountType) return subtotal;

        if (discountType === 'percent') {
          return subtotal * (1 - discountValue / 100);
        } 
        
        // Fixed Amount Logic
        // Ensure total doesn't go below zero
        return Math.max(0, subtotal - discountValue);
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.count, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
