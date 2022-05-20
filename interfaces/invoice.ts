export default interface Invoice {
    id: number,
    order_id: number,
    total_price: number,
    creation_date: string,
    due_date: string,
    api_key: string
};
