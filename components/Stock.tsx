import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import config from "../config/config.json";
import styles from './Styles';

function StockList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${config.base_url}/products?api_key=${config.api_key}`)
      .then(response => response.json())
      .then(result => setProducts(result.data));
  }, []);

  const list = products.map((product, index) =>
    <DataTable.Row key={index}>
    <View style={styles.cell}><Text style={styles.infoText}>{ product['name'] }</Text></View>
    <DataTable.Cell style={styles.cell} numeric><Text style={styles.infoText}>{ product['stock'] }</Text></DataTable.Cell>
    </DataTable.Row>);

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={styles.cell}>Name</DataTable.Title>
          <DataTable.Title style={styles.cell} numeric>Qty</DataTable.Title>
        </DataTable.Header>
        {list}
      </DataTable>
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
