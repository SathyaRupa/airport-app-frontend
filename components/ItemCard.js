import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Card, Text} from 'react-native-paper';
import UpdateButton from './UpdateButton';
import DeleteButton from './DeleteButton';

function ItemCard({
  id,
  value,
  icon,
  handleDelete,
  handleUpdate,
  onPress,
  testId,
}) {
  return (
    <View style={styles.mainCard}>
      <TouchableOpacity onPress={onPress} testID={testId}>
        <Card style={styles.itemCard}>
          <LinearGradient
            colors={['#4D869C', '#7AB2B2']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.gradient}>
            <View style={styles.cardContent}>
              <Card.Content>
                <View style={styles.content}>
                  {icon}
                  <Text
                    style={styles.text}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {value}
                  </Text>
                </View>
              </Card.Content>
              <Card.Actions>
                <View style={styles.buttonContainer}>
                  <UpdateButton onPress={() => handleUpdate(id, value)} />
                  <DeleteButton onPress={() => handleDelete(id, value)} />
                </View>
              </Card.Actions>
            </View>
          </LinearGradient>
        </Card>
      </TouchableOpacity>
    </View>
  );
}
export default ItemCard;

const styles = StyleSheet.create({
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
    fontSize: 20,
    maxWidth: '75%',
    marginRight: 0,
  },
  content: {
    flex: 3,
    height: 100,
    alignContent: 'flex-start',
    flexDirection: 'row',
    paddingTop: 25,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flex: 2,
    flexDirection: 'row',
    marginLeft: -114,
  },
  gradient: {
    borderRadius: 12,
    overflow: 'hidden',
  },
});
