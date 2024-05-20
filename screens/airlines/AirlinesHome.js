import {StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import ItemCard from '../../components/ItemCard';
import {useEffect, useState} from 'react';
import airlinesService from '../../helpers/airlinesService';
import {Avatar} from 'react-native-paper';

function AirlinesHome() {
  const [airlines, setAirlines] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    {
      airlinesService
        .fetchAllAirlines(page)
        .then(response => {
          setAirlines(prevAirlines => [...prevAirlines, ...response]);
        })
        .catch(error => {
          console.error('Error fetching airlines:', error);
        })
        .finally(() => setLoading(false));
    }
  }, [page]);

  const loadMoreAirlines = () => {
    setPage(prevPage => prevPage + 1);
  };

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" color="#4D869C" /> : null;
  };
  const icon = (
    <Avatar.Image
    style={{backgroundColor:'#4D869C'}}
      size={50}
      source={require('../../assets/icons/airlines.png')}

    />
  );
  return (
    <FlatList
      data={airlines}
      renderItem={itemData => (
        <ItemCard  key={itemData.item.id} name={itemData.item.name} icon={icon} />
      )}
      onEndReached={loadMoreAirlines}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
  },
});

export default AirlinesHome;
