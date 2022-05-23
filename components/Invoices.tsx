import { useState, useEffect } from "react";
import { ScrollView, Button, View } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DataTable } from 'react-native-paper';
import { Base } from "../styles/index";

import InvoiceOrder from "./InvoiceOrder";
import authModel from '../models/auth';
import orderModel from '../models/orders';

const Stack = createNativeStackNavigator();

// TODO: This should be a subscreen of the list of invoices
// TODO: This should also add to the list of invoices, not just the order
export function ToInvoice({ route, navigation, setIsLoggedIn }) {
    const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);

    async function doLogout() {
        await authModel.logout();
        setIsLoggedIn(false);
        navigation.navigate("Logga in", {screen: "Login"});
    }

    if (reload) {
        reloadOrders();
        route.params = false;
    };

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
        <Button
            title="Log out"
            onPress={doLogout}
            color={Base.accentColor}
        />
    </ScrollView>;
};

export default function Invoices(props) {
    return <Stack.Navigator initialRouteName="Faktura">
        <Stack.Screen name="Orders ready to invoice">
            {(screenProps) => <ToInvoice {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="Invoice order">
            {(screenProps) => <InvoiceOrder {...screenProps} />}
        </Stack.Screen>
    </Stack.Navigator>;
};
