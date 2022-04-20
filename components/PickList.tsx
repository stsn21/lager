import { View, Text, Button } from "react-native";
import { Base, Typography } from '../styles';
import orderModel from "../models/orders";
import { useEffect, useState } from 'react';
import productModel from '../models/products';

export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;
    const [productsList, setProductsList] = useState([]);

    useEffect(async () => {
        setProductsList(await productModel.getProducts());
    }, []);

    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", { reload: true });
    }

    // Reduces productsList to an object of format product_id: stock
    const productsHash = productsList.reduce((hash, current) => ({ ...hash, [current.id]: current.stock }), {});

    let allInStock = true;

    const orderItemsList = order.order_items.map((item, index) => {
        let notPickableIndicator = "";
        if (productsHash[item.product_id] < item.amount) {
            allInStock = false;
            notPickableIndicator = " ⛔️";
        };
        return <Text key={index}>
                    {item.name} - {item.amount} - {item.location}{notPickableIndicator}
            </Text>;
    });

    return <View>
        <Text>{order.name}</Text>
        <Text>{order.address}</Text>
        <Text>{order.zip} {order.city}</Text>

        <Text>Produkter:</Text>

        {orderItemsList}

        <Button title="Pack order" onPress={pick} disabled={!allInStock} />
    </View>;
};
