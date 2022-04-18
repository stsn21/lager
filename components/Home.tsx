import { Image, Text, ScrollView } from 'react-native';
import styles from './Styles';
import sauceShelfImg from '../assets/sauceshelf.jpg';
import Stock from './Stock';

export default function App() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Sauce Emporium</Text>
            <Image source={sauceShelfImg} style={{ width: 320, height: 240, borderRadius: 20, alignSelf: 'center' }} />
            <Stock />
        </ScrollView>
    );
};