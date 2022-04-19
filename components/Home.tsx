import { Image, Text, ScrollView } from 'react-native';
import styles from './Styles';
import sauceShelfImg from '../assets/sauceshelf.jpg';
import Stock from './Stock';

export default function Home({route, products, setProducts}) {
    return <ScrollView style={styles.base}>
        <Text style={styles.heading}>Lager-Appen</Text>
        <Image source={sauceShelfImg} style={{ width: 320, height: 240, marginBottom: 28 }} />
        <Stock products={products} setProducts={setProducts} />
    </ScrollView>;
};
