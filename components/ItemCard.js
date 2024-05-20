import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';

function ItemCard({name}) {
  return (
    <View style={styles.mainCard}>
      <Card style={styles.itemCard}>
        <Card.Content>
          <Text style= {styles.text}variant="titleLarge">{name}</Text>
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
    backgroundColor: "#4D869C",
  },
  text:{
    color: 'white'
  }
});
