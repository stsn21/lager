import { StatusBar } from 'expo-status-bar';
import { Image, Text, ScrollView, View } from 'react-native';
import styles from './components/Styles';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import sauceShelfImg from './assets/sauceshelf.jpg';
import Stock from './components/Stock';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.base}>
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Sauce Emporium</Text>
            <Image source={sauceShelfImg} style={{ width: 320, height: 240, borderRadius: 20, alignSelf: 'center' }} />
            <Stock />
            <StatusBar style='auto' />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
