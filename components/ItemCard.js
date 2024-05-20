import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';

function ItemCard({name, icon}) {
  return (
    <View style={styles.mainCard}>
      <Card style={styles.itemCard}>
        <Card.Content >
          <View style={styles.content}>
            {icon}
            <Text style={styles.text} variant="titleLarge">
              {name}
            </Text>
          </View>
        </Card.Content>
      </Card>
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
    paddingTop:8,
    fontWeight: 'bold'
  },
  content: {
    height: 100,
   alignContent:'flex-start',
    flexDirection: 'row',
    paddingTop: 25
  },
});
