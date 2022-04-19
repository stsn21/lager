import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import styles from './Styles';
import productModel from '../models/products';

function StockList({products, setProducts}) {
    useEffect(async () => {
        setProducts(await productModel.getProducts());
      }, []);

/*     Från kmom02-övningen Komponenter och struktur i React
    const list = products.map((product, index) => {
        return <Text
            key={index}
            // style={{ ...Typography.normal }}
            >
                { product.name } - { product.stock }
            </Text>;
      }); */

    // My stuff from kmom01
    const list = products.map((product, index) =>
        <DataTable.Row key={index}>
            <View style={[styles.cell, {flexBasis: 5, flexGrow: 1}]}>
                <Text style={styles.infoText}>{ product['name'] }</Text>
            </View>
            <DataTable.Cell style={[styles.cell, {flexBasis: 50, flexGrow: 0}]} numeric>
                <Text style={styles.infoText}>{ product['stock'] }</Text>
            </DataTable.Cell>
        </DataTable.Row>);

    return <View>
        <DataTable>
            <DataTable.Header>
                <DataTable.Title style={[styles.cell, {flexBasis: 5, flexGrow: 1}]}>Name</DataTable.Title>
                <DataTable.Title style={[styles.cell, {flexBasis: 50, flexGrow: 0}]} numeric>Qty</DataTable.Title>
            </DataTable.Header>
            {list}
        </DataTable>
    </View>;
};

export default function Stock({products, setProducts}) {
    return <View style={styles.innerContainer}>
        <Text style={styles.heading2}>Inventory</Text>
        <StockList products={products} setProducts={setProducts} />
    </View>;
};
