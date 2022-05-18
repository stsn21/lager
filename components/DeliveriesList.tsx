import { useState, useEffect } from 'react';
import { ScrollView, View, Button, Text } from "react-native";
import Delivery from '../interfaces/delivery';
import deliveryModel from "../models/deliveries"
import { Base, Typography } from "../styles/index";

export default function DeliveriesList ({ route, navigation }) {
    const { reload } = route.params || false;
    const [allDeliveries, setAllDeliveries] = useState([]);

    if (reload) {
        reloadDeliveries();
        route.params = false;
    };

    async function reloadDeliveries() {
        setAllDeliveries(await deliveryModel.getDeliveries());
    };

    useEffect(() => {
        reloadDeliveries();
    }, []);

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
        .map((delivery, index) => {
            return <View key={index} style={Base.multilineMenuContainer}>
                <Text>{delivery.product_name}</Text>
                <Text>{delivery.amount}</Text>
                <Text>{delivery.delivery_date}</Text>
                <Text>{delivery.comment}</Text>
            </View>;
        });
    };

    return <ScrollView style={Base.base}>
        <Button
            title="Add new delivery"
            onPress={() => {
                navigation.navigate("New delivery");
            }}
        />
        {listOfDeliveries}
    </ScrollView>;
};
