import { ProductController } from "./controller/ProductController"
import { CategoryController } from "./controller/CategoryController"
import { OrderStatusController } from "./controller/OrderStatusController"
import { OrderController } from "./controller/OrderController"

export const Routes = [
    {
        method: "post",
        route: "/categories",
        controller: CategoryController,
        action: "addCategory"
    },
    {
        method: "get",
        route: "/categories",
        controller: CategoryController,
        action: "getAllCategories"
    }, {
        method: "get",
        route: "/categories/:id",
        controller: CategoryController,
        action: "getCategoryById"
    }
    , {
        method: "get",
        route: "/products",
        controller: ProductController,
        action: "getAllProducts"
    }, {
        method: "get",
        route: "/products/:id",
        controller: ProductController,
        action: "getProduct"
    }, {
        method: "post",
        route: "/products",
        controller: ProductController,
        action: "addProduct"
    }, {
        method: "put",
        route: "/products/:id",
        controller: ProductController,
        action: "updateProduct"
    }, {
        method: "get",
        route: "/orders",
        controller: OrderController,
        action: "getAllOrders"
    }, {
        method: "get",
        route: "/orders/status/:status",
        controller: OrderController,
        action: "getOrdersByState"
    }, {
        method: "post",
        route: "/orders",
        controller: OrderController,
        action: "addOrder"
    }, {
        method: "patch",
        route: "/orders/:id",
        controller: OrderController,
        action: "changeOrderStatus"
    }, {
        method: "get",
        route: "/orders/:id",
        controller: OrderController,
        action: "getOrderById"
    }, {
        method: "get",
        route: "/orders/name/:userName",
        controller: OrderController,
        action: "getOrderByUserName"
    }, {
        method: "post",
        route: "/orderStatus/:id",
        controller: OrderStatusController,
        action: "createOrderStatus",
    }, {
        method: "get",
        route: "/status",
        controller: OrderStatusController,
        action: "getAllOrderStatus"
    }
]