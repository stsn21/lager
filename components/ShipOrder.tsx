import { Text, View, Button, StyleSheet } from "react-native";
import { Base, Typography, Tables } from "../styles/index";
import { DataTable } from "react-native-paper";

import orderModel from "../models/orders";

export default function ShipOrder({ route, navigation }) {
    const { order } = route.params;

    async function doShip() {
        await orderModel.shipOrder(order);
        navigation.navigate("Orders ready to ship");
    }

    const orderItemsList = order.order_items.map((item, index) => {
        return <DataTable.Row key={index}>
            <View style={Tables.orderItemsColumnFlex.name}>
                <Text style={Typography.infoText}>{ item['name'] }</Text>
            </View>
            <DataTable.Cell style={Tables.orderItemsColumnFlex.qty} numeric>
                <Text style={Typography.infoText}>{ item['amount'] }</Text>
            </DataTable.Cell>
        </DataTable.Row>;
    });

    return <View style={Base.base}>
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
            </DataTable.Header>
            {orderItemsList}
        </DataTable>
        <Text style={{ ...Typography.label }}>Due date</Text>
        <Button title="Ship this order" color={Base.accentColor} onPress={doShip}/>
    </View>;
};
