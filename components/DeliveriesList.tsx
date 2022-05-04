// del av components/DeliveriesList.tsx
return (
    <View style={Base.base}>
        <Text style={Typography.header2}>Inleveranser</Text>
        {listOfDeliveries}
        <Button
            title="Skapa ny inleverans"
            onPress={() => {
                navigation.navigate('Form');
            }}
        />
    </View>
);
