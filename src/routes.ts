import { ProductController } from "./controller/ProductController"
import { CategoryController } from "./controller/CategoryController"
import { OrderStatusController } from "./controller/OrderStatusController"
import { OrderController } from "./controller/OrderController"

export const Routes = [{
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
    route: "/categories",
    controller: CategoryController,
    action: "getAllCategories"
}, {
    method: "get",
    route: "/status",
    controller: OrderStatusController,
    action: "getAllOrderStatus"
}, {
    method: "get",
    route: "/orders",
    controller: OrderController,
    action: "getAllOrders"
}, {
    method: "get",
    route: "/orders/:status/:orderId",
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
    action: "updateOrder"
}]