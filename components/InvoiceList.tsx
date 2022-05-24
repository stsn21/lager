import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, Button, View, Text } from "react-native";
import { Base } from "../styles/index";

import authModel from '../models/auth';

// TODO: list of invoices, reload invoices
export default function InvoiceList({ route, navigation, setIsLoggedIn }) {
    // useFocusEffect(
    //     useCallback(() => {
    //         reloadInvoices();
    //     }, [])
    // );

    async function doLogout() {
        await authModel.logout();
        setIsLoggedIn(false);
        navigation.navigate("Log in", {screen: "Login"});
    }

    return <ScrollView style={Base.base}>
        <View style={Base.base}>
            <Text>Placeholder!</Text>
        </View>
        <Button
            title="New invoice"
            onPress={() => {
                navigation.navigate("Orders ready to invoice");
            }}
            color={Base.accentColor}
        />
        <Button
            title="Log out"
            onPress={doLogout}
            color={Base.accentColor}
        />
    </ScrollView>;
};
