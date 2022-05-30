import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Base } from '../styles';
import ToShipList from './ToShipList';
import ShipOrder from './ShipOrder';

const Stack = createNativeStackNavigator();

export default function Shipping(props) {
    return <Stack.Navigator initialRouteName="List" screenOptions={{...Base.navigationContainerStyle}}>
        <Stack.Screen name="Orders ready to ship">
            {(screenProps) => <ToShipList {...screenProps} allOrders={props.allOrders} setAllOrders={props.setAllOrders} />}
        </Stack.Screen>
        <Stack.Screen name="Ship order" style={Base.base}>
            {(screenProps) => <ShipOrder {...screenProps} />}
        </Stack.Screen>
    </Stack.Navigator>;
};
