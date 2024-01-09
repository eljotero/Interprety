import { createWebHistory, createRouter } from "vue-router";


const routes = [
    {
        path: "/shop",
        name: "Shop",
        component: () => import("../views/ShopView.vue")
    },
    {
        path: "/addCategory",
        name: "AddCategory",
        component: () => import("../views/AddCategoryView.vue")
    },
    {
        path: "/addProduct",
        name: "AddProduct",
        component: () => import("../views/AddProductView.vue")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
  
export default router;