import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Homepage from './screens/Homepage';
import AirlinesHome from './screens/airlines/AirlinesHome';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const stack = createNativeStackNavigator();
function App() {
  return (
    <>
      <NavigationContainer>
      <stack.Navigator>
          <stack.Screen name="homepage" component={Homepage} />
          <stack.Screen name="AirlinesHome" component={AirlinesHome} />
        </stack.Navigator>
      </NavigationContainer>
    </>
  );
}
export default App;
