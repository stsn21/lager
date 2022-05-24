import config from "../config/config.json";
import Order from "../interfaces/order";
import Invoice from "../interfaces/invoice";
import OrderItem from "../interfaces/order_item";
import storage from "../models/storage";

const invoices = {
    getInvoices: async function getInvoices(): Promise<Invoice[]> {
        const token = await storage.readToken();
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            method: "GET",
            headers: {
                'x-access-token': token.token
            }
        });
        const result = await response.json();
        return result.data;
    },
    addInvoiceFromOrder: async function addInvoiceFromOrder(
        order: Partial<Order>,
        invoice: Partial<Invoice>
    ) {
        const token = await storage.readToken();

        const newInvoice: Partial<Invoice> = {
            ...invoice,
            order_id: order.id,
            total_price: order.order_items.reduce((sum: number, current: Partial<OrderItem>) =>
                (sum + current.price), 0)
        };

        try {
            await fetch(`${config.base_url}/invoices`, {
                method: "POST",
                body: JSON.stringify({
                    ...newInvoice,
                    api_key: config.api_key
                }),
                headers: {
                    'x-access-token': token.token,
                    'content-type': 'application/json'
                }
            });
        } catch (error) {
            console.log("Could not create invoice");
        };
    },
};

export default invoices;
