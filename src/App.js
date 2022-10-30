import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './pages/Main';
import Login from './pages/Login';
import Sign from './pages/Sign';
import FindInfo from './pages/FindInfo';
import SearchDrug from './pages/SearchDrug';
import SearchResult from './pages/SearchResult';
import DrugDetail from './pages/DrugDetail';
import SearchStore from './pages/SearchStore';
import MyPage from './pages/MyPage';
import MyDrug from './pages/MyDrug';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Sign"
          component={Sign}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FindInfo"
          component={FindInfo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchDrug"
          component={SearchDrug}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchResult"
          component={SearchResult}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DrugDetail"
          component={DrugDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchStore"
          component={SearchStore}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyPage"
          component={MyPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyDrug"
          component={MyDrug}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
