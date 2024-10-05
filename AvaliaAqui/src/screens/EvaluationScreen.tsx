import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {useState, useEffect } from 'react';
import Checkbox from 'expo-checkbox';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/NavType';

interface Product {
  id: number;
  productId: number;
  name: string;
  email: string;
  feedback: string;
  experience: string;
  recommend: boolean;
}

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

export default function EvaluationScreen() {

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const goToProducts = () => {
    console.log('funciona')
    navigation.navigate('ProductsScreen')
  }

  const [evaluationId, setEvaluationId] = useState(1);
  const [yourName, setYourName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [experience, setExperience] = useState('');
  const [recommend, setRecommend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://10.0.0.113:3000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    fetchProducts();
  }, []);

  function saveFormData() {
    if( !yourName || !email || !feedback || !experience || !recommend ){
      Alert.alert('Preencha todos os campos para continuar')
    }else {
      setIsLoading(true);
      const data = {
        id: evaluationId,
        productId: selectedProductId,
        name: yourName,
        email: email,
        feedback: feedback,
        experience: experience,
        recommend: recommend ? 'true' : 'false',
      };

      setTimeout(() => {
        axios.post('http://10.0.0.113:3000/evaluations', data)
          .then(() => {
            Alert.alert('Avaliação enviada com sucesso!');
            setYourName('');
            setEmail('');
            setFeedback('');
            setExperience('');
            setRecommend(false);
            setSelectedProductId(null);
            setEvaluationId(prevId => prevId + 1);
          })
          .catch(() => {
            Alert.alert('Erro ao enviar avaliação, tente novamente em alguns segundos.');
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, 5000);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <TouchableOpacity style={styles.goBack} onPress={goToProducts}><Text>Voltar</Text></TouchableOpacity>
      </View>
      <Text style={styles.title}>Nos dê seu Feedback</Text>
      <Text style={{color: '#999', padding: 10}}>Sua opinião é importante para nós. Por favor, compartilhe sua experiência.</Text>

      <Picker
        selectedValue={selectedProductId}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedProductId(itemValue)}
      >
        <Picker.Item label="Selecione um produto" value={null} />
        {products.map((product) => (
          <Picker.Item key={product.id} label={product.name} value={product.id} />
        ))}
      </Picker>

      <TextInput
        placeholder="Seu Nome"
        value={yourName}
        onChangeText={setYourName}
        style={styles.input}
      />
      <TextInput
        placeholder="Seu Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Descreva sua experiência..."
        value={feedback}
        onChangeText={setFeedback}
        style={styles.feedbackInput}
        multiline
      />
        <Text style={{...styles.title, fontSize: 20, left: -50}}>Compartilhe sua experiência</Text>
      <View style={styles.expContainer}>
        <TouchableOpacity style={{...styles.expButton, backgroundColor: '#008265' }} onPress={() => setExperience('Ótimo')} ><Text style={styles.buttonText}>Ótimo</Text></TouchableOpacity>
        <TouchableOpacity style={{...styles.expButton, backgroundColor: '#0047ab' }} onPress={() => setExperience('Bom')}><Text style={styles.buttonText}>Bom</Text></TouchableOpacity>
        <TouchableOpacity style={{...styles.expButton, backgroundColor: '#ffbc4d' }} onPress={() => setExperience('Regular')}><Text style={styles.buttonText}>Regular</Text></TouchableOpacity>
        <TouchableOpacity style={{...styles.expButton, backgroundColor: '#f04d6c' }} onPress={() => setExperience('Ruim')}><Text style={styles.buttonText}>Ruim</Text></TouchableOpacity>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={recommend}
          onValueChange={setRecommend}
          style={styles.checkbox}
          color={recommend ? '#639d70' : undefined}
        />
        <Text>Você recomendaria este produto?</Text>
      </View>
      <TouchableOpacity style={styles.feedbackButton} onPress={saveFormData}>
        {isLoading ? ( // Exibe o indicador de carregamento enquanto isLoading é true
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={{ color: '#f8f8f8', fontSize: 20 }}>Enviar Feedback</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f3ee',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  goBack: {
    width: 80,
    height: 40,
    borderColor: '#999',
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    top:-35,
    left: -180
  },
  picker: {
    height: 50,
    width: 360,
    marginVertical: 10,
  },
  input: {
    width: 360,
    height: 50,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff'
  },
  expContainer: {
    gap: 5,
    flexDirection: 'row'
  },
  expButton: {
    width: 80,
    height: 40,
    borderColor: '#999',
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10
  },
  buttonText: {
    color: '#fff'
  },
  feedbackInput: {
    width: 360,
    height: 125,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 5
  },
  checkbox: {
    alignSelf: 'center',
  },
  feedbackButton: {
    width: 360,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3e71db',
    borderRadius: 10
  },
});
