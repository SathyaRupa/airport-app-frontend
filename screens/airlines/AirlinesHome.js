import {StyleSheet, Text, View} from 'react-native';
import ItemCard from '../../components/ItemCard';

function AirlinesHome() {
  // Dummy Data
  const airlines = ['ABS', 'Air India', 'Jet Airways'];
  return (
    <View style={styles.mainContainer}>
      {airlines.map((airline) => (
        <ItemCard name={airline} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10
  },
});

export default AirlinesHome;
