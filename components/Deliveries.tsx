import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DeliveriesList from './DeliveriesList';
import DeliveryForm from './DeliveryForm';

const Stack = createNativeStackNavigator();

export default function Deliveries(props) {
    return <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="List">
            {(screenProps) => <DeliveriesList {...screenProps} products={props.products} setProducts={props.setProducts} />}
        </Stack.Screen>
        <Stack.Screen name="Form">
            {(screenProps) => <DeliveryForm {...screenProps} products={props.products} setProducts={props.setProducts} />}
        </Stack.Screen>
    </Stack.Navigator>;
};
