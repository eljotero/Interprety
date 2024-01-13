import { createWebHistory, createRouter } from "vue-router";


const routes = [
    {
        path: "/shop",
        name: "Shop",
        component: () => import("../views/ShopView.vue")
    },
    {
        path: "/manager",
        name: "Manager",
        component: () => import("../views/ManagerView.vue")
    },
    {
        path: "/checkout",
        name: "Checkout",
        component: () => import("../views/CheckoutView.vue"),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
  
export default router;