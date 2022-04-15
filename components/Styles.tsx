import { StyleSheet } from 'react-native';

const bg = 'coral';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: bg,
    },
    innerContainer: {
        flex: 1,
        backgroundColor: bg,
        borderWidth: 1,
        borderRadius: 20,
        padding: 20,
        marginTop: 12,
        marginBottom: 12,
    },
    base: {
        flex: 1,
        alignItems: 'center',
        paddingRight: 12,
        paddingLeft: 12,
        textAlign: 'center',
        backgroundColor: bg,
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
        paddingBottom: 12
    },
    infoTable: {
        fontWeight: '300',
        fontSize: 16,
    },
});

export default styles;
