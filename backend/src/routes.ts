import { ProductController } from "./controller/ProductController"
import { CategoryController } from "./controller/CategoryController"
import { OrderStatusController } from "./controller/OrderStatusController"
import { OrderController } from "./controller/OrderController"

export const Routes = [
    {
        method: "post",
        route: "/categories",
        controller: CategoryController,
        action: "addCategory",
        validation: []
    }, {
        method: "get",
        route: "/categories/:id",
        controller: CategoryController,
        action: "getCategoryById",
        validation: []
    }
    , {
        method: "get",
        route: "/products",
        controller: ProductController,
        action: "getAllProducts",
        validation: []
    }, {
        method: "get",
        route: "/products/:id",
        controller: ProductController,
        action: "getProduct",
        validation: []
    }, {
        method: "post",
        route: "/products",
        controller: ProductController,
        action: "addProduct",
        validation: []
    }, {
        method: "put",
        route: "/products/:id",
        controller: ProductController,
        action: "updateProduct",
        validation: []
    }, {
        method: "get",
        route: "/categories",
        controller: CategoryController,
        action: "getAllCategories",
        validation: []
    }, {
        method: "get",
        route: "/status",
        controller: OrderStatusController,
        action: "getAllOrderStatus",
        validation: []
    }, {
        method: "get",
        route: "/orders",
        controller: OrderController,
        action: "getAllOrders",
        validation: []
    }, {
        method: "get",
        route: "/orders/status/:status",
        controller: OrderController,
        action: "getOrdersByState",
        validation: []
    }, {
        method: "post",
        route: "/orders",
        controller: OrderController,
        action: "addOrder",
        validation: []
    }, {
        method: "patch",
        route: "/orders/:id",
        controller: OrderController,
        action: "updateOrder",
        validation: []
    }, {
        method: "get",
        route: "/orders/:id",
        controller: OrderController,
        action: "getOrderById"
    }
]