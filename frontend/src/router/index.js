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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
  
export default router;