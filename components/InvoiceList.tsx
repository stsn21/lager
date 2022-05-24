import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, Button, View, Text } from "react-native";
import { Base, Typography } from "../styles/index";

import Invoice from '../interfaces/invoice';
import invoicesModel from '../models/invoices';
import authModel from '../models/auth';

// TODO: list of invoices, reload invoices
export default function InvoiceList({ route, navigation, setIsLoggedIn }) {
    const [allInvoices, setAllInvoices] = useState([]);

    useFocusEffect(
        useCallback(() => {
            reloadInvoices();
        }, [])
    );
    
    async function reloadInvoices() {
        setAllInvoices(await invoicesModel.getInvoices());
    };

    // TODO?
    // function sortByDateDescending (a: Partial<Delivery>, b: Partial<Delivery>): number {
    //     if (a.delivery_date !== undefined && b.delivery_date !== undefined) {
    //         if (a.delivery_date > b.delivery_date) {
    //             return -1;
    //         };
    //         if (a.delivery_date < b.delivery_date) {
    //             return 1;
    //         };
    //     };
    //     return 0;
    // }

    // let listOfInvoices: JSX.Element[] = [
    //     <View key={-1} style={Base.multilineMenuContainer}>
    //         <Text style={{
    //             ...Typography.infoText,
    //             textAlign: 'center'
    //         }}>
    //             No Invoices to display... 😰
    //         </Text>
    //     </View>
    // ];

    // if (allInvoices.length > 0) {
    const listOfInvoices = allInvoices
    // .sort(sortByDateDescending)
    .map((invoice: Partial<Invoice>, index: number) => {
        return <View key={index} style={Base.multilineMenuContainer}>
            <Text>Invoice ID: {invoice.id}</Text>
            <Text>Order ID: {invoice.order_id}</Text>
            <View style={{margin: 10}}>
                <Text>{invoice.name}</Text>
                <Text>{invoice.address}</Text>
                <Text>{invoice.zip} {invoice.city}</Text>
                <Text>{invoice.country}</Text>
            </View>
            <Text>Total price: {invoice.total_price}</Text>
            <Text>Created: {invoice.creation_date}</Text>
            <Text>Due: {invoice.due_date}</Text>
        </View>;
    });
    // };

    async function doLogout() {
        await authModel.logout();
        setIsLoggedIn(false);
        navigation.navigate("Log in", {screen: "Login"});
    }

    return <ScrollView style={Base.base}>
        <Button
            title="Log out"
            onPress={doLogout}
            color={Base.accentColor}
        />
        <Button
            title="New invoice..."
            onPress={() => {
                navigation.navigate("Orders ready to invoice");
            }}
            color={Base.accentColor}
        />
        {listOfInvoices}
    </ScrollView>;
};
