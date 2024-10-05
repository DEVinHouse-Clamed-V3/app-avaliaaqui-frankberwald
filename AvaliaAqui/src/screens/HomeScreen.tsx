import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/NavType';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

export default function HomeScreen() {

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const goToProducts = () => {
    console.log('funciona')
    navigation.navigate('ProductsScreen')
  }

  return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.imageFlex}>
        <Image source={{uri: 'https://br.web.img3.acsta.net/pictures/19/04/26/17/30/2428965.jpg'}} style={styles.image}/>
        <Image source={{uri: 'https://m.media-amazon.com/images/I/71+YcLO29uL._AC_UF1000,1000_QL80_.jpg'}} style={styles.image}/>
        <Image source={{uri: 'https://br.web.img3.acsta.net/medias/nmedia/18/90/95/62/20122008.jpg'}} style={styles.image}/>
        <Image source={{uri: 'https://m.media-amazon.com/images/I/81l3pUGbT8L._AC_UF1000,1000_QL80_.jpg'}} style={styles.image}/>
        <Image source={{uri: 'https://comicboom.com.br/loja/wp-content/uploads/2018/09/cavaleiro-das-trevas-iii-1.jpg'}} style={styles.image}/>
        <Image source={{uri: 'https://cdn.awsli.com.br/2500x2500/84/84034/produto/259881494/harry-123-6hbqk9rlap.jpg'}} style={styles.image}/>
        </View>

          <Text style={styles.title}>Avalie Aqui</Text>
          <Text style={styles.subtitle}>Escolha o produto que deseja avaliar e compartilhe sua experiência com outros consumidores.</Text>
          <TouchableOpacity style={styles.enterButton} onPress={goToProducts}><Text style={styles.buttonText}>Entrar</Text></TouchableOpacity>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f3ee',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageFlex: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 5,
    padding: 10,
    gap: 5
  },
  image: {
    width: 100,
    height: 150,
    margin: 5,
    borderRadius: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  subtitle: {
    textAlign: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 22
  },
  enterButton: {
    marginTop: 15,
    width: 125,
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: '#639d70',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 10

  }
});
