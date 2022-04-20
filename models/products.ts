import config from '../config/config.json'
import Product from '../interfaces/product'

const products = {
    updateProduct: async function updateProduct(product: Partial<Product>): Promise<void> {
        try {
            await fetch(`${config.base_url}/products?api_key=${config.api_key}`, {
                body: JSON.stringify(product),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'PUT'
            });
        } catch (error) {
            console.log("Could not update product");
        };
    },
    getProducts: async function getProducts() {
        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
};

export default products;
