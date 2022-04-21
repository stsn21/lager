import { Image, Text, ScrollView } from 'react-native';
import { Typography, Base } from '../styles/index'
import sauceShelfImg from '../assets/sauceshelf.jpg';
import Stock from './Stock';

export default function Home({products, setProducts}) {
    return <ScrollView style={Base.base}>
        <Text style={Typography.header1}>Sauce Emporium</Text>
        <Image source={sauceShelfImg} style={Base.imgContainer} />
        <Stock products={products} setProducts={setProducts} />
    </ScrollView>;
};
