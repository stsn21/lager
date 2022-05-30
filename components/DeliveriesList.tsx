import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, View, Button, Text } from "react-native";
import Delivery from '../interfaces/delivery';
import deliveryModel from "../models/deliveries"
import { Base, Typography } from "../styles/index";

export default function DeliveriesList ({ route, navigation }) {
    const [allDeliveries, setAllDeliveries] = useState([]);

    useFocusEffect(
        useCallback(() => {
            reloadDeliveries();
        }, [])
    );

    async function reloadDeliveries() {
        setAllDeliveries(await deliveryModel.getDeliveries());
    }

    function sortByDateDescending (a: Partial<Delivery>, b: Partial<Delivery>): number {
        if (a.delivery_date !== undefined && b.delivery_date !== undefined) {
            if (a.delivery_date > b.delivery_date) {
                return -1;
            };
            if (a.delivery_date < b.delivery_date) {
                return 1;
            };
        };
        return 0;
    }

    let listOfDeliveries: JSX.Element[] = [
        <View key={-1} style={Base.multilineMenuContainer}>
            <Text style={{
                ...Typography.infoText,
                textAlign: 'center'
            }}>
                No deliveries to display... 😰
            </Text>
        </View>
    ];
    if (allDeliveries.length > 0) {
        listOfDeliveries = allDeliveries
        // .filter(delivery => Date.parse(delivery.delivery_date) < Date.now())
        .sort(sortByDateDescending)
        .map((delivery: Partial<Delivery>, index: number) => {
            return <View key={index} style={Base.multilineMenuContainer}>
                <Text>{delivery.delivery_date}</Text>
                <Text>{delivery.product_name}</Text>
                <Text>Qty: {delivery.amount}</Text>
                <Text>Comment: {delivery.comment}</Text>
            </View>;
        });
    };

    return <ScrollView style={Base.base}>
        <Button
            title="Create new delivery..."
            onPress={() => {
                navigation.navigate("New delivery");
            }}
            color={Base.accentColor}
        />
        {listOfDeliveries}
    </ScrollView>;
};
