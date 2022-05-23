// TODO?: much of this and PickList might be put into a common import

import { View, Text, Button } from "react-native";
import { Base, Typography } from '../styles';
import orderModel from "../models/orders";
import { useEffect, useState } from 'react';
import productModel from '../models/products';
import { DataTable } from "react-native-paper";

// TODO: move this to styles (this one lacks location property though)
const columnStyles = {
    name: [
        Base.cell,
        {
            flexBasis: 10,
            flexGrow: 2,
            flexShrink: 10,
        }
    ],
    qty: [
        Base.cell,
        {
            flexBasis: 1,
            flexGrow: 0.5,
            flexShrink: 0,
        }
    ]
};

export default function InvoiceOrder({ route, navigation, setProducts }) {
    const { order } = route.params;

    async function invoice() {
        await orderModel.invoiceOrder(order);
        navigation.navigate("Orders ready to invoice", { reload: true });
    }

    const orderItemsList = order.order_items.map((item, index) => {
        return <DataTable.Row key={index}>
            <View style={columnStyles.name}>
                <Text style={Typography.infoText}>{ item['name'] }</Text>
            </View>
            <DataTable.Cell style={columnStyles.qty} numeric>
                <Text style={Typography.infoText}>{ item['amount'] }</Text>
            </DataTable.Cell>
        </DataTable.Row>;
    });

    return <View style={Base.base}>
        <Text style={Typography.header2}>Info</Text>
        <DataTable>
            <DataTable.Row>
                <View style={[Base.cell, {flexBasis: 2, flexShrink: 1}]}>
                    <Text style={[Typography.infoText, { textAlign: "left" }]}>Name:</Text>
                </View>
                <View style={Base.cell}>
                    <Text style={[Typography.infoText, { textAlign: "right" }]}>
                        { order['name'] }
                    </Text>
                </View>
            </DataTable.Row>
            <DataTable.Row style={{height: 72}}>
                <View style={[Base.cell, {flexBasis: 2, flexShrink: 1}]}>
                    <Text style={[Typography.infoText, { textAlign: "left" }]}>Address:</Text>
                </View>
                <View style={Base.cell}>
                    <Text style={[Typography.infoText, { textAlign: "right" }]}>
                        { order['address'] }{"\n"}{ order['zip'] } { order['city'] }{"\n"}{ order['country'] }
                    </Text>
                </View>
            </DataTable.Row>
        </DataTable>

        <Text style={Typography.header2}>Items</Text>
        <DataTable>
            <DataTable.Header>
                <DataTable.Title style={columnStyles.name}>Name</DataTable.Title>
                <DataTable.Title style={columnStyles.qty} numeric>Qty</DataTable.Title>
            </DataTable.Header>
            {orderItemsList}
        </DataTable>
        {/* TODO: Add date picker */}
        <Button title="Invoice order" color={Base.accentColor} onPress={invoice}/>
    </View>;
};
