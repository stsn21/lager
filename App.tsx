// TODO: fix unhandled promise rejection on start
// TODO: should orders state be lifted up?

import { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Base } from './styles/index';

import Home from "./components/Home";
import Pick from "./components/Pick";
import Deliveries from './components/Deliveries';
import Auth from './components/auth/Auth';
import Invoices from './components/Invoices';

import authModel from './models/auth'

const routeIcons = {
    "Stock": "home",
    "Pick": "file-tray-stacked",
    "Deliveries": "arrow-down",
    "Logga in": "log-in",
    "Faktura": "receipt",
};

const Tab = createBottomTabNavigator();

export default function App() {
    const [products, setProducts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    useEffect(async () => {
        setIsLoggedIn(await authModel.loggedIn());
    }, []);

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
                {/* TODO?: Clean up redundant/unecessary prop passing, but for now if it ain't broke don't fix it */}
                <Tab.Screen name="Stock">
                    {(props) => <Home {...props} products={products} setProducts={setProducts} />}
                </Tab.Screen>
                <Tab.Screen name="Pick" options={{ headerShown: false }}>
                    {(props) => <Pick {...props} products={products} setProducts={setProducts} />}
                </Tab.Screen>
                <Tab.Screen name="Deliveries" options={{ headerShown: false }}>
                    {(props) => <Deliveries {...props} products={products} setProducts={setProducts} />}
                </Tab.Screen>
                {isLoggedIn ?
                    <Tab.Screen name="Faktura">
                        {(props) => <Invoices {...props} setIsLoggedIn={setIsLoggedIn} />}
                    </Tab.Screen> :
                    <Tab.Screen name="Logga in">
                        {(props) => <Auth {...props} setIsLoggedIn={setIsLoggedIn} />}
                    </Tab.Screen>
                }
            </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
    </SafeAreaProvider>;
};
