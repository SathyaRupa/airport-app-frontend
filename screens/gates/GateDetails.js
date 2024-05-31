import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GateService from '../../helpers/GateService';
import {Card} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

function GateDetails({route}) {
  const {id} = route.params;
  const [details, setDetails] = useState({});

  useEffect(() => {
    GateService.show(id)
      .then(response => {
        setDetails(response);
      })
      .catch(error => {
        console.error('Error fetching Gate details:', error);
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
              <Text style={styles.info}>
                Gate Number : {details.gate_number}
              </Text>
              <Text style={styles.info}>
                Floor Number : {details.floor_number}
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

export default GateDetails;
