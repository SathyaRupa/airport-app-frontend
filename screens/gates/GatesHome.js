import ItemCard from '../../components/ItemCard';
import * as React from 'react';
import {useEffect, useState} from 'react';
import GateService from '../../helpers/GateService';
import {
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import CreateButton from '../../components/CreateButton';
import {Avatar, PaperProvider} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

function GatesHome({navigation}) {
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [fetchedPages, setFetchedPages] = useState([]);
  const [gates, setGates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [selectedGate, setSelectedGate] = useState({
    id: null,
    name: '',
  });
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchData() {
      if (!allDataLoaded && isFocused && !fetchedPages.includes(page)) {
        const response = await GateService.fetchAll(page);
        setFetchedPages(prevPages => [...prevPages, page]);
        if (response.length === 0) {
          setAllDataLoaded(true);
        } else {
          setGates(prevGates => [...prevGates, ...response]);
        }
      }
      setLoading(false);
    }
    fetchData();
  }, [page, allDataLoaded, isFocused]);

  const loadMoreGates = () => {
    if (!allDataLoaded) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setGates([]);
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
    navigation.push('Gate Details', {id});
  };

  const handleUpdate = (id, name) => {
    setSelectedGate({id, name});
    navigation.push('Update Gate', {id});
  };

  const icon = (
    <Avatar.Image
      style={{backgroundColor: 'transparent'}}
      size={50}
      source={require('../../assets/icons/gates.png')}
    />
  );

  return (
    <PaperProvider>
      <SafeAreaView style={styles.mainContainer}>
        <CreateButton
          handleOnPress={() => {
            navigation.push('Create Gate');
          }}
          testId="create-button"
        />

        <FlatList
          data={gates}
          renderItem={itemData => (
            <ItemCard
              id={itemData.item.id}
              value={'Gate ' + itemData.item.gate_number}
              icon={icon}
              onPress={() => handlePress(itemData.item.id)}
              handleUpdate={handleUpdate}
              testId={`item-card-${itemData.index}`}
              showDeleteButton={false}
            />
          )}
          onEndReached={loadMoreGates}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
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
});
export default GatesHome;
