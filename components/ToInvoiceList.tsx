import { useEffect, useCallback } from "react";
import { ScrollView, Button, View } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import { Base } from "../styles/index";

import orderModel from '../models/orders';

export default function ToInvoiceList({ route, navigation, allOrders, setAllOrders }) {

    useFocusEffect(
        useCallback(() => {
            reloadOrders();
        }, [])
    );

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    };

    useEffect(() => {
        reloadOrders();
    }, []);

    const listOfOrdersToInvoice = allOrders
        .filter(order => order.status === "Packad") // Skips shipping step for now
        .map((order, index) => {
            return <DataTable.Row key={index}>
                <DataTable.Cell style={Base.container}>
                    <Button title={`${order.name} (${order.id})`} key={index} color={Base.accentColor} onPress={() => {
                        navigation.navigate('Invoice order', {
                            order: order
                        });
                    }}/>
                </DataTable.Cell>
            </DataTable.Row>;
        });

    return <ScrollView style={Base.base}>
        <View style={Base.base}>
            <DataTable>
                {listOfOrdersToInvoice}
            </DataTable>
        </View>
    </ScrollView>;
};
