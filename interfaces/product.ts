export default interface Product {
    id: number,
    article_number: string,
    name: string,
    description: string,
    specifiers: object,
    stock: number,
    location: string,
    price: number,
};
