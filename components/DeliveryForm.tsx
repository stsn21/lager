import { useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, Button, Platform, View } from "react-native";
import { Base, Typography, Forms } from '../styles';

import Product from '../interfaces/product';
import Delivery from '../interfaces/delivery';
import deliveryModel from '../models/deliveries';

// for ProductDropDown component
import { Picker } from '@react-native-picker/picker';
import productModel from "../models/products";
import moment from 'moment';

// for DateDropDown component
import DateTimePicker from '@react-native-community/datetimepicker';

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

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Show date picker" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: moment(dropDownDate).format("YYYY-MM-DD"),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}

export default function DeliveryForm({ navigation }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    useEffect(async () => {
        const productChoices = (await productModel.getProducts());
        setProducts(productChoices);
        setDelivery({
            product_id: productChoices[0].id,
            delivery_date: moment(new Date()).format("YYYY-MM-DD"),
        });
    }, []);

    async function addDelivery() {
        await deliveryModel.addDelivery(delivery);

        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0)
        };

        await productModel.updateProduct(updatedProduct);

        navigation.navigate("All deliveries", { reload: true });
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

            <Text style={{ ...Typography.label }}>Amount</Text>
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
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}
            />

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
            />
        </ScrollView>
    );
};
