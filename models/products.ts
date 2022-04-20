import config from '../config/config.json'

const products = {
    // updateProduct: async function updateProduct() {}, //TODO
    getProducts: async function getProducts() {
        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
};

export default products;
