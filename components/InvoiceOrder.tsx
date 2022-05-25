// TODO?: much of this and PickList might be put into a common import

import { ScrollView, Text, TextInput, Button, Platform, View } from "react-native";
import { useState, useEffect } from 'react';
import { DataTable } from "react-native-paper";
import { Base, Typography, Forms } from '../styles';

import orderModel from "../models/orders";

// for DateDropDown component
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Invoice from "../interfaces/invoice";

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

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker}
                    title="Show date picker"
                    color={Base.accentColor}
                />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setInvoice({
                            ...props.invoice,
                            due_date: moment(dropDownDate).format("YYYY-MM-DD"),
                        });

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
            <View style={columnStyles.name}>
                <Text style={Typography.infoText}>{ item['name'] }</Text>
            </View>
            <DataTable.Cell style={columnStyles.qty} numeric>
                <Text style={Typography.infoText}>{ item['amount'] }</Text>
            </DataTable.Cell>
        </DataTable.Row>;
    });

    return <View style={Base.base}>
        <Text style={ Typography.label }>Info</Text>
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
                <DataTable.Title style={columnStyles.name}>Name</DataTable.Title>
                <DataTable.Title style={columnStyles.qty} numeric>Qty</DataTable.Title>
            </DataTable.Header>
            {orderItemsList}
        </DataTable>
        <Text style={{ ...Typography.label }}>Due date</Text>
        <DateDropDown invoice={invoice} setInvoice={setInvoice} />
        <Button title="Invoice this order" color={Base.accentColor} onPress={doInvoice}/>
    </View>;
};
