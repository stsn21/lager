import { View, Text, Button } from "react-native";
import { Base, Typography } from '../styles';
import orderModel from "../models/orders";
import { useEffect, useState } from 'react';
import productModel from '../models/products';
import { DataTable } from "react-native-paper";

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
    ],
    location: [
        Base.cell,
        {
            flexBasis: 1,
            flexGrow: 0.5,
            flexShrink: 0,
        }
    ]
};

export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;
    const [productsList, setProductsList] = useState([]);

    useEffect(async () => {
        setProductsList(await productModel.getProducts());
    }, []);

    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("Orders ready to pick", { reload: true });
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
            <View style={columnStyles.name}>
                <Text style={Typography.infoText}>{ item['name'] }</Text>
            </View>
            <DataTable.Cell style={[columnStyles.qty, qtyInStockStyle]} numeric>
                <Text style={[Typography.infoText]}>{ item['amount'] }</Text>
            </DataTable.Cell>
            <DataTable.Cell style={columnStyles.location}>
                <Text style={Typography.infoText}>{ item['location'] }</Text>
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
                    <DataTable.Title style={columnStyles.location} numeric>Location</DataTable.Title>
                </DataTable.Header>
                {orderItemsList}
            </DataTable>

        <Button title="Pack order" color={Base.accentColor} onPress={pick} disabled={!allInStock} />
    </View>;
};
