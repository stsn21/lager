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

    // Emils kmom02-föreläsning, vet inte vad detta gör än
    const productsHash = productsList.reduce((hash, current) => ({ ...hash, [current.id]: current.stock }), {});

    let allInStock = true;

    const orderItemsList = order.order_items.map((item, index) => {
        if (productsHash[item.product_id] < item.amount) {
            allInStock = false;
        };
        return <Text key={index}>
                    {item.name} - {item.amount} - {item.location}
            </Text>;
    });

    return <View>
        <Text>{order.name}</Text>
        <Text>{order.address}</Text>
        <Text>{order.zip} {order.city}</Text>

        <Text>Produkter:</Text>

        {orderItemsList}

        <Button title="Plocka order" onPress={pick} />
    </View>;
};
