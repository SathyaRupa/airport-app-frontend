import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Card, Text, Button, IconButton} from 'react-native-paper';
import airlinesService from '../helpers/airlinesService';

function ItemCard({id, name, icon, handleDelete, onPress}) {
  const airlineName = name.length > 15 ? name.substring(0, 16) + '...' : name;

  return (
    <View style={styles.mainCard}>
      <TouchableOpacity onPress={onPress}>
        <Card style={styles.itemCard}>
          <LinearGradient
            colors={['#4D869C', '#7AB2B2']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{
              borderRadius: 12,
              overflow: 'hidden',
            }}>
            <View style={styles.cardContent}>
              <Card.Content>
                <View style={styles.content}>
                  {icon}
                  <Text style={styles.text} variant="titleLarge">
                    {airlineName}
                  </Text>
                </View>
              </Card.Content>
              <Card.Actions>
                <IconButton
                  icon="delete"
                  size={30}
                  onPress={() => handleDelete(id, name)}
                />
              </Card.Actions>
            </View>
          </LinearGradient>
        </Card>
      </TouchableOpacity>
    </View>
  );
}
export default ItemCard;

styles = StyleSheet.create({
  mainCard: {
    padding: 7,
  },
  itemCard: {
    backgroundColor: '#4D869C',
  },
  text: {
    color: 'white',
    paddingLeft: 20,
    paddingTop: 8,
    fontWeight: 'bold',
  },
  content: {
    height: 100,
    alignContent: 'flex-start',
    flexDirection: 'row',
    paddingTop: 25,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
