import { create } from "zustand";

export const useProductStore = create((set) => ({
  // State
  products: [],
  // Action
  setProducts: (products) => set({ products }),
  //  새로운 아이템 만들어주기
  createProduct: async (productInfo) => {
    try {
      const { name, price, image } = productInfo;
      if (!name || !price || !image) {
        console.log("USER Has't fillup the form");
        return { success: false, message: "PLEASE FILL UP THE FORM" };
      }
      const res = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productInfo),
      });
      const data = await res.json();
      set((state) => ({ products: [...state.products, data.item] }));
      console.info("Product Info :", productInfo);
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      console.error("ERROR IN CREATING PRODUCT: ", error.message);
      return { success: false, message: "ERROR in Creating Product " };
    }
  },
  getProducts: async () => {
    try {
      const res = await fetch("/api/product", {
        method: "GET",
      });
      console.log("Fetching the Products");
      const data = await res.json();
      set({ products: data.products });
      return { success: true, message: "Success in Getting Items" };
    } catch (error) {
      console.log("ERROR IN GETTING PRODUCTS: ", error.message);
      return { success: false, message: "Failed in Getting Items" };
    }
  },
  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/product/${pid}`, {
        method: "DELETE",
      });
      if (res.status !== 200) {
        return { success: false, message: "Failed to delete Item" };
      }
      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));
      return { success: true, message: res.message };
    } catch (error) {
      console.error("Failed in Deleting Item: ", error.message);
      return { success: false, error: error.message };
    }
  },
  updateProduct: async (pid, updateInfo) => {
    try {
      // 어떻게 업데이트된 정보를 보내지?
      const res = await fetch(`/api/product/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // 클라이언트에서 서버쪽으로 데이터를 보낼때는 stringfy를 넣어서 보내고
        body: JSON.stringify(updateInfo),
      });
      // 다시 data를 받아왔을때는 json으로
      const data = await res.json();
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.updatedItem : product
        ),
      }));
      return { success: true, message: "ITEM UPDATED" };
    } catch (error) {
      console.error("ERROR IN UPDATING ITEM: ", error.message);
      return { success: false, message: error.message };
    }
  },
}));
