import { Text, Button, Platform, View, ScrollView } from "react-native";
import { useState, useEffect } from 'react';
import { DataTable } from "react-native-paper";
import { Base, Typography, Tables } from '../styles';

import orderModel from "../models/orders";

// for DateDropDown component
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Invoice from "../interfaces/invoice";

function nowPlus30Days(): Date {
    let date = new Date();
    date.setDate(date.getDate() + 30);
    return date;
}

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(nowPlus30Days());
    const [show, setShow] = useState<Boolean>(false);

    useEffect(async () => {
        const formattedDate = moment(dropDownDate).format("YYYY-MM-DD");
        props.setInvoice({
            ...props.invoice,
            due_date: formattedDate,
        });
    }, [dropDownDate]);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View style={{marginBottom: 12}}>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker}
                    title="Show due date picker"
                    color={Base.accentColor}
                />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);
                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}

export default function InvoiceOrder({ route, navigation }) {
    const { order } = route.params;
    const [invoice, setInvoice] = useState<Partial<Invoice>>({
        creation_date: moment().format("YYYY-MM-DD")
    });

    async function doInvoice() {
        await orderModel.invoiceOrder(order, invoice);
        navigation.navigate("All invoices");
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
            </DataTable.Header>
            {orderItemsList}
        </DataTable>
        <Text style={{ ...Typography.label }}>Due date</Text>
        <DateDropDown invoice={invoice} setInvoice={setInvoice} />
        <Button title="Invoice this order" color={Base.accentColor} onPress={doInvoice}/>
    </ScrollView>;
};
