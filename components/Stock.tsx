import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import config from "../config/config.json";
import styles from './Styles';

function StockList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${config.base_url}/products?api_key=${config.api_key}`)
      .then(response => response.json())
      .then(result => setProducts(result.data));
  }, []);

  const list = products.map((product, index) => <Text style={styles.infoTable} key={index}>{ product['name'] } - { product['stock'] }</Text>);

  return (
    <View>
      {list}
    </View>
  );
};

export default function Stock() {
  return (
    <View style={styles.innerContainer}>
      <Text style={styles.heading2}>Inventory</Text>
      <StockList />
    </View>
  );
};
