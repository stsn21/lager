import { useState, useEffect, useCallback } from "react";
import { ScrollView, Button, View } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import { Base } from "../styles/index";

import orderModel from '../models/orders';

// TODO: This should be a subscreen of the list of invoices
// TODO: This should also add to the list of invoices, not just the order
export default function ToInvoiceList({ route, navigation }) {
    const [allOrders, setAllOrders] = useState([]);

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
                    <Button title={order.name} key={index} color={Base.accentColor} onPress={() => {
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
