// PLACEHOLDER!!!! TODO: REPLACE!

import { useState, useEffect } from 'react';
import { ScrollView, View, Button, Text } from "react-native";
import { Base, Typography } from "../styles/index";

import authModel from '../models/auth';

export default function Invoices ({ route, navigation }) {
    return <ScrollView style={Base.base}>
        <Button
            title="Log out"
            onPress={authModel.logout}
            color={Base.accentColor}
        />
    </ScrollView>;
};
