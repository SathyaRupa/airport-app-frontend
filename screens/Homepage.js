import Primarybutton from '../components/PrimaryButton';
import {View, Text, StyleSheet} from 'react-native';
function Homepage({navigation}) {
  return (
    <View style={styles.homepageContainer}>
      <Text style={styles.header}>Airport App</Text>
      <View>
        <Primarybutton
          title="Airlines"
          handleOnPress={() => navigation.push('Airline')}
        />
        <Primarybutton title="Aircrafts"/>
        <Primarybutton title="Gates" />
        <Primarybutton title="Slots" />
      </View>
    </View>
  );
}

export default Homepage;

const styles = StyleSheet.create({
  homepageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 30,
  },
});
