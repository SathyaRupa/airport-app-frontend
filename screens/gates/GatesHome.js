import ItemCard from '../../components/ItemCard';
import * as React from 'react';
import {useEffect, useState} from 'react';
import gatesService from '../../helpers/GateService';
import {FlatList, ActivityIndicator} from 'react-native';
import {Avatar} from 'react-native-paper';

function GatesHome({navigation}) {
  const [gates, setGates] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  useEffect(() => {
    {
      if (!allDataLoaded) {
        gatesService
          .fetchAll(page)
          .then(response => {
            if (response.length === 0) {
              setAllDataLoaded(true);
            }
            setGates(prevGates => [...prevGates, ...response]);
          })
          .catch(error => {
            console.error('Error fetching gates:', error);
          })
          .finally(() => setLoading(false));
      }
    }
  }, [page, allDataLoaded]);

  const loadMoreGates = () => {
    if (!allDataLoaded) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" color="#4D869C" /> : null;
  };

  const icon = (
    <Avatar.Image
      style={{backgroundColor: 'transparent'}}
      size={50}
      source={require('../../assets/icons/gates.png')}
    />
  );

  return (
    <FlatList
      data={gates}
      renderItem={itemData => (
        <ItemCard
          id={itemData.item.id}
          value={'Gate ' + itemData.item.gate_number}
          icon={icon}
        />
      )}
      onEndReached={loadMoreGates}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
}

export default GatesHome;
