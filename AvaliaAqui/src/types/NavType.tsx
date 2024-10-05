import { StackNavigationProp } from '@react-navigation/stack';

// Define a lista de parametros do nav stack
export type RootStackParamList = {
  // nenhuma das telas recebem parametros
  HomeScreen: undefined;
  ProductsScreen: undefined;
  EvaluationScreen: undefined;
};

// define a propriedade de nav pra MainScreen
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;
