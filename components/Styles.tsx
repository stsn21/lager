import { StyleSheet } from 'react-native';

const bg = '#ffcd9e';

const styles = StyleSheet.create({
    container: {
        backgroundColor: bg,
    },
    innerContainer: {
        backgroundColor: bg,
        borderWidth: 1,
        borderRadius: 20,
        margin: 10,
    },
    base: {
        backgroundColor: bg,
        flexGrow: 1,
        flexShrink: 2,
    },
    heading: {
        alignSelf: 'center',
        fontWeight: '200',
        fontSize: 38,
        padding: 12,
    },
    heading2: {
        alignSelf: 'center',
        fontWeight: '200',
        fontSize: 32,
        padding: 8,
    },
    infoText: {
        fontWeight: '400',
        fontSize: 15,
        textAlign: 'left',
    },
    cell: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 3,
        paddingTop: 3,
    }
});

export default styles;
