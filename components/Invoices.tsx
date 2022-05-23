// TODO: INVOICE SCREEN!

import { ScrollView, Button } from "react-native";
import { Base } from "../styles/index";

import authModel from '../models/auth';

export default function Invoices ({ route, navigation, setIsLoggedIn }) {
    async function doLogout() {
        await authModel.logout();
        setIsLoggedIn(false);
        navigation.navigate("Logga in", {screen: "Login"});
    }

    return <ScrollView style={Base.base}>
        <Button
            title="Log out"
            onPress={doLogout}
            color={Base.accentColor}
        />
    </ScrollView>;
};
