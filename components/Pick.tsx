import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Base } from '../styles';
import OrderList from './OrderList';
import PickList from './PickList';

const Stack = createNativeStackNavigator();

export default function Pick(props) {
    return <Stack.Navigator initialRouteName="List" screenOptions={{...Base.navigationContainerStyle}}>
        <Stack.Screen name="Orders ready to pick" component={OrderList} />
        <Stack.Screen name="Order details" style={Base.base} >
            {(screenProps) => <PickList {...screenProps} setProducts={props.setProducts} />}
        </Stack.Screen>
    </Stack.Navigator>;
};
