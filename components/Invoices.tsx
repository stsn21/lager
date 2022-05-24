import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InvoiceList from "./InvoiceList";
import ToInvoiceList from "./ToInvoiceList";
import InvoiceOrder from "./InvoiceOrder";

const Stack = createNativeStackNavigator();

export default function Invoices(props) {
    return <Stack.Navigator initialRouteName="Invoices">
        <Stack.Screen name="All invoices">
            {(screenProps) => <InvoiceList {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="Orders ready to invoice">
            {(screenProps) => <ToInvoiceList {...screenProps} />}
        </Stack.Screen>
        <Stack.Screen name="Invoice order">
            {(screenProps) => <InvoiceOrder {...screenProps} />}
        </Stack.Screen>
    </Stack.Navigator>;
};
