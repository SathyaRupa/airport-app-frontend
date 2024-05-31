import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Homepage from './screens/Homepage';
import AirlinesHome from './screens/airlines/AirlinesHome';
import GatesHome from './screens/gates/GatesHome';
import AirlineDetails from './screens/airlines/AirlineDetails';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateAirline from './screens/airlines/CreateAirline';
import UpdateAirline from './screens/airlines/UpdateAirline';
import GateDetails from './screens/gates/GateDetails';

const stack = createNativeStackNavigator();
function App() {
  return (
    <>
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen name="Home" component={Homepage} />
          <stack.Screen name="Airlines" component={AirlinesHome} />
          <stack.Screen name="Airline Details" component={AirlineDetails} />
          <stack.Screen name="Create Airline" component={CreateAirline} />
          <stack.Screen name="Update Airline" component={UpdateAirline} />
          <stack.Screen name="Gates" component={GatesHome} />
          <stack.Screen name="Gate Details" component={GateDetails} />
        </stack.Navigator>
      </NavigationContainer>
    </>
  );
}
export default App;
