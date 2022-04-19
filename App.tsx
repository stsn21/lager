import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from "./components/Home";
import Pick from "./components/Pick";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import OrderList from './components/OrderList';

const routeIcons = {
    "Lager": "home",
    "Plock": "list",
    // TODO: Orders
};

const Tab = createBottomTabNavigator();

export default function App() {
    const [products, setProducts] = useState([]);

    return <SafeAreaProvider>
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = routeIcons[route.name] || "alert";

                    return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'blue',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Lager">
                    {() => <Home products={products} setProducts={setProducts} />}
                </Tab.Screen>
                <Tab.Screen name="Plock">
                    {() => <Pick setProducts={setProducts} />}
                </Tab.Screen>
                {/* <Tab.Screen name="Orders">
                    {() => <OrderList products={products} setProducts={setProducts} />}
                </Tab.Screen> */}
            </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style='auto' />
    </SafeAreaProvider>;
};
