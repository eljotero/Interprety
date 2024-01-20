import "reflect-metadata"
import { DataSource } from "typeorm"
import { Category } from "./entity/Category"
import { Product } from "./entity/Product"
import { Order } from "./entity/Order"
import { OrderStatus } from "./entity/OrderStatus"
import { OrderedProduct } from "./entity/OrderedProduct"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "shop",
    synchronize: true,
    logging: false,
    entities: [Category, Product, Order, OrderStatus, OrderedProduct],
    migrations: [],
    subscribers: [],
})
