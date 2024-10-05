import { StyleSheet, Text, View, Alert, FlatList, Image, TouchableOpacity} from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/NavType';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

interface ProductsList {
  id:number;
  name: string;
  price: string;
  description: string;
  image: string;
}

export default function ProductsScreen() {

const navigation = useNavigation<HomeScreenNavigationProp>();

const goToEvaluation = () => {
  console.log('funciona')
  navigation.navigate('EvaluationScreen')
}
const goToHome = () => {
  console.log('funciona')
  navigation.navigate('HomeScreen')
}

  const [ productsList, setProductsList ] = useState<ProductsList[]>([])

  useEffect(() => {
    axios.get('http://10.0.0.113:3000/products')
    .then((response) => {
      setProductsList(response.data)
      console.log(response.data)
    })
    .catch(() =>{
      Alert.alert("Não foi possível obter os dados.")
    })
}, [])

  const renderItem = ({item} : {item:ProductsList}) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
        data={productsList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.goToEvaluate} onPress={goToEvaluation}><Text style={styles.buttonText}>Avaliar</Text></TouchableOpacity>
          <TouchableOpacity style={styles.goToHome} onPress={goToHome}><Text style={styles.buttonText}>Home</Text></TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemPrice: {
    color: 'green',
    fontSize: 16,
  },
  itemDescription: {
    fontSize: 14,
    color: '#555',
  },
  itemImage: {
    width: 300,
    height: 350,
    marginTop: 5,
    borderRadius: 10
  },
  buttonContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    borderColor: '#999',
    borderWidth: 1
  },
  buttonText: {
    color: '#fff',
    fontSize: 20
  },
  goToEvaluate: {
    width: 125,
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#d7526f',
    elevation: 3
  },
  goToHome: {
    width: 125,
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#639d70',
    elevation: 3
  }
});
