import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import productModel from '../models/products';
import { Typography, Base } from '../styles/index';

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
            <View style={[Base.cell, {flexBasis: 5, flexGrow: 1}]}>
                <Text style={Typography.infoText}>{ product['name'] }</Text>
            </View>
            <DataTable.Cell style={[Base.cell, {flexBasis: 50, flexGrow: 0}]} numeric>
                <Text style={Typography.infoText}>{ product['stock'] }</Text>
            </DataTable.Cell>
        </DataTable.Row>);

    return <View>
        <DataTable>
            <DataTable.Header>
                <DataTable.Title style={[Base.cell, {flexBasis: 5, flexGrow: 1}]}>Name</DataTable.Title>
                <DataTable.Title style={[Base.cell, {flexBasis: 50, flexGrow: 0}]} numeric>Qty</DataTable.Title>
            </DataTable.Header>
            {list}
        </DataTable>
    </View>;
};

export default function Stock({products, setProducts}) {
    return <View style={Base.innerContainer}>
        <Text style={Typography.header2}>Inventory</Text>
        <StockList products={products} setProducts={setProducts} />
    </View>;
};
