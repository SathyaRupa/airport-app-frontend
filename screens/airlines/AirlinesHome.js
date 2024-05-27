import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  SafeAreaView,
} from 'react-native';
import ItemCard from '../../components/ItemCard';
import * as React from 'react';
import {useEffect, useState} from 'react';
import airlinesService from '../../helpers/airlinesService';
import {
  Avatar,
  PaperProvider,
  Portal,
  Modal,
  Button,
  IconButton,
} from 'react-native-paper';
import CreateButton from '../../components/CreateButton';

function AirlinesHome({navigation}) {
  const [airlines, setAirlines] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  useEffect(() => {
    {
      airlinesService
        .fetchAll(page)
        .then(response => {
          if (response.length === 0) {
            setAllDataLoaded(true);
          }
          if (!allDataLoaded) {
            setAirlines(prevAirlines => [...prevAirlines, ...response]);
          }
        })
        .catch(error => {
          console.error('Error fetching airlines:', error);
        })
        .finally(() => setLoading(false));
    }
  }, [page, allDataLoaded]);

  const loadMoreAirlines = () => {
    if (!allDataLoaded) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" color="#4D869C" /> : null;
  };

  const handlePress = id => {
    navigation.push('Airline Details', {id});
  };

  const handleDelete = (id, name) => {
    setSelectedAirline({id, name});
    showModal();
  };
  function deleteAirlineById() {
    const response = airlinesService.deleteAirline(selectedAirline.id);
    setAirlines(prevAirlines =>
      prevAirlines.filter(airline => airline.id !== selectedAirline.id),
    );
    hideModal();
  }

  const handlePress = id => {
    navigation.push('Airline Details', {id});
  };

  const handleDelete = (id, name) => {
    setSelectedAirline({id, name});
    showModal();
  };

  const deleteAirlineById = async () => {
    try {
      await airlinesService.deleteAirline(selectedAirline.id);
      setAirlines(prevAirlines =>
        prevAirlines.filter(airline => airline.id !== selectedAirline.id),
      );
      hideModal();
    } catch (error) {
      console.error('Error deleting airline:', error);
    }
  };

  const icon = (
    <Avatar.Image
      style={{backgroundColor: 'transparent'}}
      size={50}
      source={require('../../assets/icons/airlines.png')}
    />
  );

  return (
    <View>
      <CreateButton
        handleOnPress={() => {
          setAllDataLoaded(false);
          setAirlines([]);
          setPage(0);
          navigation.push('Create Airline');
        }}
      />
      <SafeAreaView style={styles.mainContainer}>
        <>
      <PaperProvider>
        <FlatList
              data={airlines}
              renderItem={itemData => (
                <ItemCard
                  id={itemData.item.id}
                  name={itemData.item.name}
                  icon={icon}
              onPress={() => handlePress(itemData.item.id)}
                  handleDelete={handleDelete}
            />
              )}
              onEndReached={loadMoreAirlines}
              onEndReachedThreshold={0.5}
              ListFooterComponent={renderFooter}
            />
      </SafeAreaView>
    </View>
        <Portal>
          <Modal
            style={styles.modalBox}
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalStyle}>
            <View>
              <View style={styles.modalTextLine}>
                <IconButton
                  icon="close"
                  size={24}
                  onPress={hideModal}
                  style={styles.closeButton}
                />
                <Text style={styles.modalText}>
                  Are you sure to delete the airlines "{selectedAirline.name}"
                </Text>
              </View>
              <View style={styles.modalButtons}>
                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={deleteAirlineById}>
                  Yes
                </Button>
                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={hideModal}>
                  No
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    marginBottom: 150,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 20,
    paddingTop: 20,
  },
  modalStyle: {
    backgroundColor: 'white',
    padding: 20,
  },
  modalText: {
    fontSize: 18,
    padding: 5,
    color: 'black',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  modalBox: {
    marginLeft: 20,
    width: 380,
    height: 120,
    marginTop: 300,
  },
  closeButton: {
    paddingTop: 15,
    marginLeft: 320,
  },
  button: {
    margin: 10,
    backgroundColor: '#7AB2B2',
    width: 100,
    height: 40,
  },
});

export default AirlinesHome;
