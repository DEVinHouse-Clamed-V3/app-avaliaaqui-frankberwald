import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, TextInput, TouchableOpacity } from 'react-native';
import {useState, useEffect } from 'react';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/NavType';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;

export default function EvaluationScreen() {

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const goToProducts = () => {
    console.log('funciona')
    navigation.navigate('ProductsScreen')
  }

  const [ productsList, setProductsList ] = useState('')
  const [yourName, setYourName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [experience, setExperience] = useState('');
  const [recommend, setRecommend] = useState(false);

  function saveFormData() {
    if( !yourName || !email || !feedback || !experience || !recommend ){
      Alert.alert('Preencha todos os campos para continuar')
    }else {
      const data = new FormData()
      data.append('name', yourName)
      data.append('email', email)
      data.append('feedback', feedback)
      data.append('experience', experience)
      data.append('recommend', recommend)

      axios.post('http://10.0.0.113:3000/evaluations', data)
      .then((response) => {
        Alert.alert('Avaliação enviada com sucesso!');
        setYourName('');
        setEmail('');
        setFeedback('');
        setExperience('');
        setRecommend(false);
      })
      .catch((error) => {
        Alert.alert('Erro ao enviar avaliação, tente novamente em alguns segundos, se o erro persistir contate o administrador da rede');
      })
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

        <TouchableOpacity style={styles.goBack} onPress={goToProducts}><Text>Voltar</Text></TouchableOpacity>

      <Text style={styles.title}>Nos dê seu Feedback</Text>
      <Text style={{color: '#999', padding: 10}}>Sua opinião é importante para nós. Por favor, compartilhe sua experiência.</Text>
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
        <TouchableOpacity style={{...styles.expButton, backgroundColor: '#008265' }}><Text style={styles.buttonText}>Ótimo</Text></TouchableOpacity>
        <TouchableOpacity style={{...styles.expButton, backgroundColor: '#0047ab' }}><Text style={styles.buttonText}>Bom</Text></TouchableOpacity>
        <TouchableOpacity style={{...styles.expButton, backgroundColor: '#ffbc4d' }}><Text style={styles.buttonText}>Regular</Text></TouchableOpacity>
        <TouchableOpacity style={{...styles.expButton, backgroundColor: '#f04d6c' }}><Text style={styles.buttonText}>Ruim</Text></TouchableOpacity>
      </View>
      <View style={styles.checkboxContainer}>
        {/* <CheckBox
          value={recommend}
          onValueChange={setRecommend}
          style={styles.checkbox}
        /> */}
        <Text style={styles.checkboxLabel}>Você recomendaria este produto?</Text>
      </View>
      <TouchableOpacity style={styles.feedbackButton}><Text style={{color: '#f8f8f8', fontSize: 20}}>Enviar Feedback</Text></TouchableOpacity>
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
    top:40,
    left: 20
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
    marginVertical: 15
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
