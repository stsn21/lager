import { useState, useEffect } from 'react';
import { ScrollView, View, Button, Text } from "react-native";
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

    const listOfDeliveries = allDeliveries //TODO: sort by date?
        // .filter(delivery => Date.parse(delivery.delivery_date) < Date.now())
        .map((delivery, index) => {
            return <View key={index} style={Base.multilineMenuContainer}>
                <Text>{delivery.product_name}</Text>
                <Text>{delivery.amount}</Text>
                <Text>{delivery.delivery_date}</Text>
                <Text>{delivery.comment}</Text>
            </View>;
        });

    return <ScrollView style={Base.base}>
        <Text style={Typography.header2}>Inleveranser</Text>
        {listOfDeliveries}
        <Button
            title="Skapa ny inleverans"
            onPress={() => {
                navigation.navigate('Form');
            }}
        />
    </ScrollView>;
};
