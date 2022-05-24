import Auth from '../../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './AuthFields';

export default function Register({navigation, setIsLoggedIn}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doRegister() {
        if (auth.email && auth.password) {
            await AuthModel.register(auth.email, auth.password);
            setIsLoggedIn(true);
            navigation.navigate("Invoices");
        };
    }

    return <AuthFields
        auth={auth}
        setAuth={setAuth}
        submit={doRegister}
        title="Register"
        navigation={navigation}
    />;
};
