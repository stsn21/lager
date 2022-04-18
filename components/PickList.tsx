import { View, Text, Button } from "react-native";
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

    const orderItemsList = order.order_items.map((item, index) => {
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
