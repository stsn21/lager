import { View, Button, Text } from "react-native";
import { Base, Typography } from "../styles/index";

// del av components/DeliveriesList.tsx
export default function DeliveriesList ({ navigation }) {

    const listOfDeliveries = <Text>list of deliveries placeholder</Text>;

    // Template to follow for listOfDeliveries?

    // const listOfOrders = allOrders
    // .filter(order => order.status === "Ny")
    // .map((order, index) => {
    //     return <DataTable.Row key={index}>
    //         <DataTable.Cell style={Base.container}>
    //             <Button title={order.name} key={index} color={Base.accentColor} onPress={() => {
    //                 navigation.navigate('Order details', {
    //                     order: order
    //                 });
    //             }}/>
    //         </DataTable.Cell>
    //     </DataTable.Row>;
    // });

    return <View style={Base.base}>
            <Text style={Typography.header2}>Inleveranser</Text>
            {listOfDeliveries}
            <Button
                title="Skapa ny inleverans"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
        </View>;
};
