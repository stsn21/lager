import config from "../config/config.json";
import productsModel from "./products";
import invoicesModel from "./invoices";
import Order from "../interfaces/order";
import OrderItem from "../interfaces/order_item";
import Invoice from "../interfaces/invoice";

const orders = {
    getOrders: async function getOrders(): Promise<Order[]> {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    pickOrder: async function pickOrder(order: Partial<Order>) {
        await Promise.all(order.order_items.map(async (order_item: Partial<OrderItem>) => {
            const newStock = order_item.stock - order_item.amount;

            const changedProduct = {
                id: order_item.product_id,
                name: order_item.name,
                stock: newStock,
                api_key: config.api_key,
            };

            await productsModel.updateProduct(changedProduct);
        }));

        const changedOrder = {
            id: order.id,
            name: order.name,
            status_id: 200,
            api_key: config.api_key,
        };

        await orders.updateOrder(changedOrder);
    },
    invoiceOrder: async function invoiceOrder(
        order: Partial<Order>,
        invoice: Partial<Invoice>
    ) {
        await invoicesModel.addInvoiceFromOrder(order, invoice);

        const changedOrder = {
            id: order.id,
            name: order.name,
            status_id: 600,
            api_key: config.api_key,
        };

        await orders.updateOrder(changedOrder);
    },
    shipOrder: async function shipOrder(order: Partial<Order>) {
        const changedOrder = {
            id: order.id,
            name: order.name,
            status_id: 400,
            api_key: config.api_key,
        };

        await orders.updateOrder(changedOrder);
    },
    updateOrder: async function updateOrder(order: Partial<Order>): Promise<void> {
        try {
            await fetch(`${config.base_url}/orders?api_key=${config.api_key}`, {
                body: JSON.stringify(order),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'PUT'
            });
        } catch (error) {
            console.log("Could not update order");
        };
    },
};

export default orders;
