import { useState } from 'react';
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

function ProductDropDown(props) {
    const [products, setProducts] = useState<Product[]>([]);
    let productsHash: any = {};

    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);

    const itemsList = products.map((prod, index) => {
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
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: date.toLocaleDateString('se-SV'),
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
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});

    async function addDelivery() {
        await deliveryModel.addDelivery(delivery);

        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0)
        };

        await productModel.updateProduct(updatedProduct);

        navigation.navigate("List", { reload: true }); // TODO: is "List" right?
    }

    // TODO: Fill in missing form fields

    return (
        <ScrollView style={{ ...Base.base }}>
            <Text style={{ ...Typography.header2 }}>Ny inleverans</Text>

            <Text style={{ ...Typography.label }}>Kommentar</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content })
                }}
                value={delivery?.comment}
            />

            <Text style={{ ...Typography.label }}>Produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />

            <Text style={{ ...Typography.label }}>Antal</Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, amount: parseInt(content) })
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
            />

            <Button
                title="Gör inleverans"
                onPress={() => {
                    addDelivery();
                }}
            />
        </ScrollView>
    );
};
