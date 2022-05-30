import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Button } from "react-native";
import { DataTable } from 'react-native-paper';
import { Base } from '../styles/index';

import orderModel from '../models/orders';

export default function ToShipList({ route, navigation, allOrders, setAllOrders }) {

    useFocusEffect(
        useCallback(() => {
            reloadOrders();
        }, [])
    );

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    };

    const listOfOrders = allOrders
        .filter(order => order.status === "Packad")
        .map((order, index) => {
            return <DataTable.Row key={index}>
                <DataTable.Cell style={Base.container}>
                    <Button
                        title={`${order.name} (${order.id})`}
                        key={index}
                        color={Base.accentColor}
                        onPress={() => {
                            navigation.navigate('Ship order', {
                                order: order
                            });
                        }}
                    />
                </DataTable.Cell>
            </DataTable.Row>;
        });

    return <View style={Base.base}>
        <DataTable>
            {listOfOrders}
        </DataTable>
    </View>;
};
