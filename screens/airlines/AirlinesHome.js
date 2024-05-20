import {StyleSheet, Text, View} from 'react-native';
import ItemCard from '../../components/ItemCard';
import airlinesService from '../../helpers/airlinesService';

function AirlinesHome() {
  // Dummy Data
  airlinesService.fetchAllAirlines(1)
  .then(airlines => {
    console.log(airlines);
  })
  .catch(error => {
    console.error('Error fetching airlines:', error);
  });
  return (
    <Text>Hello</Text>
    // <View style={styles.mainContainer}>
    //   {airlines.map((airline) => (
    //     <ItemCard name={airline} />
    //   ))}
    // </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10
  },
});

export default AirlinesHome;
