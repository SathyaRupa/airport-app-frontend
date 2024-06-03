import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {Avatar, PaperProvider} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import ItemCard from '../../components/ItemCard';
import GateService from '../../helpers/GateService';
import CreateButton from '../../components/CreateButton';
import FilterButton from '../../components/FilterButton';
import FilterDialog from '../../components/FilterDialog';

function GatesHome({navigation}) {
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [fetchedPages, setFetchedPages] = useState([]);
  const [gates, setGates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [floor, setFloor] = useState('');
  const [filterRender, setFilterRender] = useState(false);
  const [visible, setVisible] = useState(false);

  const showDialog = () => {
    setVisible(true);
  };
  const hideDialog = () => setVisible(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchData() {
      if (!allDataLoaded && isFocused && !fetchedPages.includes(page)) {
        const response = await GateService.fetchAll(page, floor);
        setFetchedPages(prevPages => [...prevPages, page]);
        if (response.length === 0) {
          setAllDataLoaded(true);
          setFilterRender(true);
        } else {
          setGates(prevGates => [...prevGates, ...response]);
        }
      }
      setLoading(false);
    }
    fetchData();
  }, [page, allDataLoaded, isFocused, filterRender]);

  const loadMoreGates = () => {
    if (!allDataLoaded) {
      setPage(prevPage => prevPage + 1);
    }
  };
  function handleFilter() {
    if (isFocused) {
      setGates([]);
      setPage(0);
      setAllDataLoaded(false);
      setLoading(true);
      setFetchedPages([]);
    }
    setFilterRender(true);
    hideDialog();
  }

  function handleFilter() {
    if (isFocused) {
      setGates([]);
      setPage(0);
      setAllDataLoaded(false);
      setLoading(true);
      setFetchedPages([]);
    }
    setFilterRender(true);
    hideDialog();
  }

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
        <View style={styles.headerContainer}>
          <FilterButton handleOnPress={showDialog} />
          <FilterDialog
            visible={visible}
            dismiss={hideDialog}
            setFloor={setFloor}
            onClick={handleFilter}
          />
          <CreateButton
            handleOnPress={() => {
              navigation.push('Create Airline');
            }}
            testId="create-button"
          />
        </View>

        <FlatList
          data={gates}
          renderItem={itemData => (
            <ItemCard
              id={itemData.item.id}
              value={'Gate ' + itemData.item.gate_number}
              icon={icon}
              testId={`item-card-${itemData.index}`}
              onPress={() => handlePress(itemData.item.id)}
            />
          )}
          onEndReached={loadMoreGates}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      </SafeAreaView>
    </PaperProvider>
  );
}

export default GatesHome;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    width: 300,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
