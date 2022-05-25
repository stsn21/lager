import { useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, Button, Platform, View } from "react-native";
import { Base, Typography, Forms } from '../styles';

import Product from '../interfaces/product';
import Delivery from '../interfaces/delivery';
import deliveryModel from '../models/deliveries';

// for ProductDropDown component
import { Picker } from '@react-native-picker/picker';
import productModel from "../models/products";

// for DateDropDown component
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

function ProductDropDown(props) {
    let productsHash: any = {};

    const itemsList = props.products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    return <Picker
        selectedValue={props.delivery?.product_id}
        onValueChange={(itemValue) => {
            props.setDelivery({ ...props.delivery, product_id: itemValue });
            props.setCurrentProduct(productsHash[itemValue]);
        }}>
        {itemsList}
    </Picker>;
}

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    useEffect(async () => {
        const formattedDate = moment(dropDownDate).format("YYYY-MM-DD");
        props.setDelivery({
            ...props.delivery,
            delivery_date: formattedDate,
        });
    }, [dropDownDate]);

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
                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}

export default function DeliveryForm({ navigation, products, setProducts }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({
        delivery_date: moment(new Date()).format("YYYY-MM-DD"),
    });
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);

    useEffect(async () => {
        setCurrentProduct(products[0]);
        setDelivery({
            ...delivery,
            product_id: products[0].id,
        });
    }, [products]);

    async function addDelivery() {
        await deliveryModel.addDelivery(delivery);

        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0)
        };

        await productModel.updateProduct(updatedProduct);

        navigation.navigate("All deliveries");
    }

    return (
        <ScrollView style={{ ...Base.base }}>
            <Text style={{ ...Typography.label }}>Product</Text>
            <ProductDropDown
                products={products}
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />

            <Text style={{ ...Typography.label }}>Quantity</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    const contentInt: number = parseInt(content);
                    if (!Number.isNaN(contentInt) && contentInt >= 0) {
                        setDelivery({ ...delivery, amount: contentInt});
                    } else if (content === "") {
                        setDelivery({...delivery, amount: undefined});
                    };
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
            />

            <Text style={{ ...Typography.label }}>Delivery date</Text>
            <DateDropDown delivery={delivery} setDelivery={setDelivery} />

            <Text style={{ ...Typography.label }}>Comment</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content })
                }}
                value={delivery?.comment}
            />

            <Button title="Create delivery"
                onPress={() => {
                    addDelivery();
                }}
                color={Base.accentColor}
            />
        </ScrollView>
    );
};
