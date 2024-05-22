import {StyleSheet, FlatList, ActivityIndicator, View} from 'react-native';
import ItemCard from '../../components/ItemCard';
import {useEffect, useState} from 'react';
import airlinesService from '../../helpers/airlinesService';
import {Avatar, Button} from 'react-native-paper';
import CreateButton from '../../components/CreateButton';

function AirlinesHome({navigation}) {
  const [airlines, setAirlines] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  useEffect(() => {
    {
      if (!allDataLoaded) {
        airlinesService
          .fetchAllAirlines(page)
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
    }
  }, [page]);

  const loadMoreAirlines = () => {
    setPage(prevPage => prevPage + 1);
  };

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" color="#4D869C" /> : null;
  };

  const handlePress = id => {
    navigation.push('Airline Details', {id});
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
      <CreateButton  handleOnPress={() => navigation.push('Create Airline')}/>
      <FlatList
        data={airlines}
        renderItem={itemData => (
          <ItemCard
            key={itemData.item.id}
            name={itemData.item.name}
            icon={icon}
            onPress={() => handlePress(itemData.item.id)}
        />
        )}
        onEndReached={loadMoreAirlines}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
  },
});

export default AirlinesHome;
