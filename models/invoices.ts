// TODO: functions to get and update invoices

import config from "../config/config.json";
import Invoice from "../interfaces/invoice";
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
};

export default invoices;
