import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Card, Text} from 'react-native-paper';

function ItemCard({name, icon}) {
  return (
    <View style={styles.mainCard}>
      <Card style={styles.itemCard}>
        <LinearGradient colors={['#4D869C', '#7AB2B2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          <Card.Content>
            <View style={styles.content}>
              {icon}
              <Text style={styles.text} variant="titleLarge">
                {name}
              </Text>
            </View>
          </Card.Content>
        </LinearGradient>
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
    paddingTop: 8,
    fontWeight: 'bold',
  },
  content: {
    height: 100,
    alignContent: 'flex-start',
    flexDirection: 'row',
    paddingTop: 25,
  },
});
