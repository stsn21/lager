import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from "./components/Home";
import Pick from "./components/Pick";
import Deliveries from './components/Deliveries';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Base } from './styles/index';

const routeIcons = {
    "Stock": "home",
    "Pick": "list",
    "Deliveries": "list",
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
                    tabBarActiveTintColor: Base.accentColor,
                    tabBarInactiveTintColor: 'black',
                    tabBarActiveBackgroundColor: Base.navigationContainerBg,
                    tabBarInactiveBackgroundColor: Base.navigationContainerBg,
                    ...Base.navigationContainerStyle,
                    tabBarStyle: {padding: 3, backgroundColor: Base.navigationContainerBg}
            })}
            >
                <Tab.Screen name="Stock">
                    {() => <Home products={products} setProducts={setProducts} />}
                </Tab.Screen>
                <Tab.Screen name="Pick" options={{ headerShown: false }}>
                    {() => <Pick setProducts={setProducts} />}
                </Tab.Screen>
                <Tab.Screen name="Deliveries" options={{ headerShown: false }}>
                    {() => <Deliveries setProducts={setProducts} />}
                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
    </SafeAreaProvider>;
};
