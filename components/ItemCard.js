import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';

function ItemCard({name}) {
  return (
    <View style={styles.mainCard}>
      <Card >
        <Card.Content>
          <Text variant="titleLarge">{name}</Text>
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
});
