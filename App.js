import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Homepage from './screens/Homepage';
import AirlinesHome from './screens/airlines/AirlinesHome';
import AirlineDetails from './screens/airlines/AirlineDetails';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const stack = createNativeStackNavigator();
function App() {
  return (
    <>
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen name="Home" component={Homepage} />
          <stack.Screen name="Airlines" component={AirlinesHome} />
          <stack.Screen name="Airline Details" component={AirlineDetails} />
        </stack.Navigator>
      </NavigationContainer>
    </>
  );
}
export default App;
