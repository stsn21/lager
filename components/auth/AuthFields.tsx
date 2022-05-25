import { View, Text, TextInput, Button } from "react-native";
import { Typography, Forms, Base } from '../../styles';

export default function AuthFields({ auth, setAuth, title, submit, navigation }) {
    return <View style={Base.base}>
        <Text style={Typography.header2}>{title}</Text>
        <Text style={Typography.label}>E-post</Text>
        <TextInput
            style={Forms.input}
            onChangeText={(content: string) => {
                setAuth({ ...auth, email: content })
            }}
            value={auth?.email}
            keyboardType="email-address"
        />
        <Text style={Typography.label}>Lösenord</Text>
        <TextInput
            style={Forms.input}
            onChangeText={(content: string) => {
                setAuth({ ...auth, password: content })
            }}
            value={auth?.password}
            secureTextEntry={true}
        />
        <Button
            title={title}
            onPress={() => {
                submit();
            }}
            color={Base.accentColor}
        />
        {title === "Log in" &&
            <Button
                title="Register new user..."
                onPress={() => {
                    navigation.navigate("Register");
                }}
                color={Base.accentColor}
            />
        }
    </View>;
};
