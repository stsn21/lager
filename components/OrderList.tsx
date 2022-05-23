// TODO: Move file contents to Pick and fix imports (confusing name)

import { useState, useEffect } from 'react';
import { View, Button } from "react-native";
import orderModel from '../models/orders';
import { Base } from '../styles/index'
import { DataTable } from 'react-native-paper';

export default function OrderList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);

    if (reload) {
        reloadOrders();
        route.params = false;
    };

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    };

    useEffect(() => {
        reloadOrders();
    }, []);

    // TODO: filter for unpicked orders only
    const listOfOrders = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return <DataTable.Row key={index}>
                <DataTable.Cell style={Base.container}>
                    <Button title={order.name} key={index} color={Base.accentColor} onPress={() => {
                        navigation.navigate('Order details', {
                            order: order
                        });
                    }}/>
                </DataTable.Cell>
            </DataTable.Row>;
        });

    return <View style={Base.base}>
        <DataTable>
            {listOfOrders}
        </DataTable>
    </View>;
};
