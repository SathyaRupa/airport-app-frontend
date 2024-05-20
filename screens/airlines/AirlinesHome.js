import {StyleSheet, Text, View} from 'react-native';
import ItemCard from '../../components/ItemCard';
import {useEffect, useState} from 'react';
import airlinesService from '../../helpers/airlinesService';

function AirlinesHome() {
  const [airlines, setAirlines] = useState([]);
  useEffect(() => {
    {
      airlinesService
        .fetchAllAirlines()
        .then(response => {
          setAirlines(response);
        })
        .catch(error => {
          console.error('Error fetching airlines:', error);
        });
    }
  }, []);
  return (
    <View style={styles.mainContainer}>
      {airlines.map((airline) => (
        <ItemCard name={airline.name} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
  },
});

export default AirlinesHome;
