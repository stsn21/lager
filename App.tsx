import { StatusBar } from 'expo-status-bar';
import styles from './components/Styles';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Home from "./components/Home";
import Pick from "./components/Pick";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const routeIcons = {
    "Lager": "home",
    "Plock": "list",
  };

export default function App() {
    return (
        <SafeAreaProvider>
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
                    <Tab.Screen name="Lager" component={Home} />
                    <Tab.Screen name="Plock" component={Pick} />
                </Tab.Navigator>
            </NavigationContainer>
            <StatusBar style='auto' />
        </SafeAreaProvider>
    );
};
