import { useEffect, useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { Base, Typography, Tables } from "../styles/index";
import { DataTable } from "react-native-paper";

import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';

import orderModel from "../models/orders";
import getCoordinates from "../models/nominatim";

export default function ShipOrder({ route, navigation }) {
    const { order } = route.params;
    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address}, ${order.city}`);

            setMarker(<Marker
                coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
                title={results[0].display_name}
            />);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
    
            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            };
    
            const currentLocation = await Location.getCurrentPositionAsync({});
    
            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);

    // async function doShip() {
    //     await orderModel.shipOrder(order);
    //     navigation.navigate("Orders ready to ship");
    // }

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

        <MapView
            style={styles.map}
            initialRegion={{
                latitude: 56.1612,
                longitude: 15.5869,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            }}>
            {marker}
            {locationMarker}
        </MapView>

        <Text style={ Typography.label }>Items</Text>
        <DataTable>
            <DataTable.Header>
                <DataTable.Title style={Tables.orderItemsColumnFlex.name}>Name</DataTable.Title>
                <DataTable.Title style={Tables.orderItemsColumnFlex.qty} numeric>Qty</DataTable.Title>
            </DataTable.Header>
            {orderItemsList}
        </DataTable>
        {/* <Button title="Ship this order" color={Base.accentColor} onPress={doShip}/> */}
    </View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
