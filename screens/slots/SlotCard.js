import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Card, Text} from 'react-native-paper';
import UpdateButton from '../../components/UpdateButton';
import DeleteButton from '../../components/DeleteButton';

function SlotCard({
  id,
  value,
  icon,
  handleDelete,
  handleUpdate,
  onPress,
  testId,
}) {
  const SlotText = ({text}) => {
    return (
      <View>
        <Text variant="bodyMedium" style={styles.text} numberOfLines={1}>
          {text}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.mainCard}>
      <TouchableOpacity onPress={onPress} testID={testId}>
        <Card style={styles.slotCard}>
          <LinearGradient
            colors={['#4D869C', '#7AB2B2']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.gradient}>
            <View style={styles.cardContent}>
              <Card.Content>
                <View style={styles.content}>
                  <View style={styles.icon}>{icon}</View>
                  <View style={styles.textContent}>
                    <SlotText text={`Start: ${value.startTime}`} />
                    <SlotText text={`End: ${value.endTime}`} />
                    <SlotText text={`${value.available}`} />
                  </View>
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
export default SlotCard;

const styles = StyleSheet.create({
  mainCard: {
    padding: 7,
  },
  slotCard: {
    backgroundColor: '#4D869C',
  },
  text: {
    color: 'white',
    padding: 2,
    marginRight: 0,
    fontWeight: 'bold',
  },
  content: {
    flex: 3,
    height: 100,
    alignContent: 'flex-start',
    flexDirection: 'row',
  },
  textContent: {
    flexDirection: 'column',
    padding: 15,
    width: 300,
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
  icon: {
    paddingTop: 25,
  },
});
