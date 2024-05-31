import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AirlineService from '../../helpers/AirlineService';
import {Card} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

function AirlineDetails({route}) {
  const {id} = route.params;
  const [details, setDetails] = useState({});

  useEffect(() => {
    AirlineService.show(id)
      .then(response => {
        setDetails(response);
      })
      .catch(error => {
        console.error('Error fetching airline details:', error);
      });
  }, [id]);

  return (
    <View style={styles.container}>
      <Card mode="elevated" style={styles.card}>
        <LinearGradient
          colors={['#4D869C', '#7AB2B2']}
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradient}>
          <Card.Content>
            <View style={styles.content}>
              <Text style={styles.info} testID="airline-name">
                Name: {details.name}
              </Text>
              <Text style={styles.info} testID="airline-count">
                Count: {details.count}
              </Text>
            </View>
          </Card.Content>
        </LinearGradient>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 300,
    height: 200,
  },
  gradient: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
    color: 'white',
  },
  default: {
    fontSize: 12,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
});

export default AirlineDetails;
