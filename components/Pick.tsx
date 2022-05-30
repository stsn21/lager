import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Base } from '../styles';
import ToPickList from './ToPickList';
import PickOrder from './PickOrder';

const Stack = createNativeStackNavigator();

export default function Pick(props) {
    return <Stack.Navigator initialRouteName="List" screenOptions={{...Base.navigationContainerStyle}}>
        <Stack.Screen name="Orders ready to pick">
            {(screenProps) => <ToPickList {...screenProps} allOrders={props.allOrders} setAllOrders={props.setAllOrders} />}
        </Stack.Screen>
        <Stack.Screen name="Pick order" style={Base.base}>
            {(screenProps) => <PickOrder {...screenProps} setProducts={props.setProducts} />}
        </Stack.Screen>
    </Stack.Navigator>;
};
