import { ScrollView, View, Text, Button } from "react-native";
import { useEffect, useState } from 'react';
import { DataTable } from "react-native-paper";
import { Base, Typography, Tables } from '../styles';

import productModel from '../models/products';
import orderModel from "../models/orders";

export default function PickOrder({ route, navigation, setProducts }) {
    const { order } = route.params;
    const [productsList, setProductsList] = useState([]);

    useEffect(async () => {
        setProductsList(await productModel.getProducts());
    }, []);

    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("Orders ready to pick");
    }

    // Reduces productsList to an object of format product_id: stock
    const productsHash = productsList.reduce((hash, current) => ({ ...hash, [current.id]: current.stock }), {});

    let allInStock = true;

    const orderItemsList = order.order_items.map((item, index) => {
        let qtyInStockStyle = {};
        if (productsHash[item.product_id] < item.amount) {
            allInStock = false;
            qtyInStockStyle = Base.invalidContainer;
        };

        return <DataTable.Row key={index}>
            <View style={Tables.orderItemsColumnFlex.name}>
                <Text style={Typography.infoText}>{ item['name'] }</Text>
            </View>
            <DataTable.Cell style={[Tables.orderItemsColumnFlex.qty, qtyInStockStyle]} numeric>
                <Text style={Typography.infoText}>{ item['amount'] }</Text>
            </DataTable.Cell>
            <DataTable.Cell style={Tables.orderItemsColumnFlex.location}>
                <Text style={Typography.infoText}>{ item['location'] }</Text>
            </DataTable.Cell>
        </DataTable.Row>;
    });

    return <ScrollView style={Base.base}>
        <Text style={ Typography.label }>Order { order['id'] }</Text>
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

        <Text style={ Typography.label }>Items</Text>
        <DataTable>
            <DataTable.Header>
                <DataTable.Title style={Tables.orderItemsColumnFlex.name}>Name</DataTable.Title>
                <DataTable.Title style={Tables.orderItemsColumnFlex.qty} numeric>Qty</DataTable.Title>
                <DataTable.Title style={Tables.orderItemsColumnFlex.location} numeric>Location</DataTable.Title>
            </DataTable.Header>
            {orderItemsList}
        </DataTable>

        <Button title="Pack order" color={Base.accentColor} onPress={pick} disabled={!allInStock} />
    </ScrollView>;
};
