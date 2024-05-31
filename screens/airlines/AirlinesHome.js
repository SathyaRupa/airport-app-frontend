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
import AirlineService from '../../helpers/AirlineService';
import {SuccessToast, ErrorToast} from '../../components/ToastMessage';
import {
  Avatar,
  PaperProvider,
  Portal,
  Text,
  Modal,
  Button,
} from 'react-native-paper';
import CreateButton from '../../components/CreateButton';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

function AirlinesHome({navigation}) {
  const [airlines, setAirlines] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [fetchedPages, setFetchedPages] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedAirline, setSelectedAirline] = useState({
    id: null,
    name: '',
  });
  const isFocused = useIsFocused();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    async function fetchData() {
      if (!allDataLoaded && isFocused && !fetchedPages.includes(page)) {
        const response = await AirlineService.fetchAll(page);
        setFetchedPages(prevPages => [...prevPages, page]);
        if (response.length === 0) {
          setAllDataLoaded(true);
        } else {
          setAirlines(prevAirlines => [...prevAirlines, ...response]);
        }
      }
      setLoading(false);
    }
    fetchData();
  }, [page, allDataLoaded, isFocused]);

  const loadMoreAirlines = () => {
    if (!allDataLoaded) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setAirlines([]);
      setPage(0);
      setAllDataLoaded(false);
      setLoading(true);
      setFetchedPages([]);
    }
  }, [isFocused]);

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" color="#4D869C" /> : null;
  };

  const handlePress = id => {
    navigation.push('Airline Details', {id});
  };
  const handleUpdate = (id, name) => {
    setSelectedAirline({id, name});
    navigation.push('Update Airline', {id});
  };

  const handleDelete = (id, name) => {
    setSelectedAirline({id, name});
    showModal();
  };

  const deleteById = async () => {
    try {
      const response = await AirlineService.delete(selectedAirline.id);
      if (response.status === 200) {
        SuccessToast(response.data);
      } else {
        ErrorToast(response.data);
      }
      setAirlines(prevAirlines =>
        prevAirlines.filter(airline => airline.id !== selectedAirline.id),
      );
      hideModal();
    } catch (error) {
      ErrorToast();
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
    <PaperProvider>
      <SafeAreaView style={styles.mainContainer}>
        <CreateButton
          handleOnPress={() => {
            navigation.push('Create Airline');
          }}
          testId="create-button"
        />

        <FlatList
          data={airlines}
          renderItem={itemData => (
            <ItemCard
              id={itemData.item.id}
              value={itemData.item.name}
              icon={icon}
              onPress={() => handlePress(itemData.item.id)}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              testId={`item-card-${itemData.index}`}
            />
          )}
          onEndReached={loadMoreAirlines}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />

        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalContent}>
            <View>
              <Text style={styles.modalText}>
                Are you sure you want to delete the airline "
                {selectedAirline.name}"?
              </Text>
              <View style={styles.modalButtons}>
                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={deleteById}
                  testID="yes-button">
                  Yes
                </Button>
                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={hideModal}
                  testID="no=button">
                  No
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>
        <Toast />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    flex: 1,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    margin: 10,
    backgroundColor: '#7AB2B2',
    width: 100,
    height: 40,
  },
});

export default AirlinesHome;
