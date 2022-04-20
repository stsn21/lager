import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import orderModel from '../models/orders';
import config from "./../config/config.json";

export default function OrderList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);

    if (reload) {
        reloadOrders();
    };

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    };

    useEffect(() => {
        reloadOrders();
    }, []);
    
    // Unsure when this part appeared or if it conflicts with above
/*     useEffect(() => {
        fetch(`${config.base_url}/orders?api_key=${config.api_key}`)
          .then(response => response.json())
          .then(result => setAllOrders(result.data));
    }, []); */

    const listOfOrders = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return <Button
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Order details', {
                        order: order
                    });
                }}
            />;
        });

    return <View>
        <Text>Orders ready to pick</Text>
        {listOfOrders}
    </View>;
};
