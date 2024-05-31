import React from 'react';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {FlatList, ActivityIndicator, View, StyleSheet} from 'react-native';
import {Avatar, Chip} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import SlotService from '../../helpers/SlotService';
import SlotCard from './SlotCard';

function SlotsHome({navigation}) {
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [fetchedPages, setFetchedPages] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [available, setAvailable] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function fetchData() {
      if (!allDataLoaded && isFocused && !fetchedPages.includes(page)) {
        const response = await SlotService.fetchAll(page, available);
        setFetchedPages(prevPages => [...prevPages, page]);
        if (response.length === 0) {
          setAllDataLoaded(true);
        } else {
          setSlots(prevGates => [...prevGates, ...response]);
        }
      }
      setLoading(false);
    }
    fetchData();
  }, [page, allDataLoaded, isFocused, available]);

  const loadMoreSlots = () => {
    if (!allDataLoaded) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" color="#4D869C" /> : null;
  };

  const formatData = slotData => {
    const DATE_TIME_FORMAT = 'HH:mm DD-MM-YYYY';
    const formatedData = {
      startTime: moment(slotData.start_time).format(DATE_TIME_FORMAT),
      endTime: moment(slotData.end_time).format(DATE_TIME_FORMAT),
      available: slotData.status,
    };
    return formatedData;
  };

  const icon = (
    <Avatar.Image
      style={{backgroundColor: 'transparent'}}
      size={50}
      source={require('../../assets/icons/slots.png')}
    />
  );

  return (
    <View>
      <View style={styles.chipContainer}>
        <Chip
          style={[styles.chip, !available ? styles.checked : styles.unchecked]}
          icon="check"
          textStyle={styles.text}
          onPress={() => {
            setSlots([]);
            setFetchedPages([]);
            setPage(0);
            setAvailable(!available);
            setAllDataLoaded(false);
          }}>
          Display all
        </Chip>
      </View>

      <FlatList
        data={slots}
        renderItem={itemData => (
          <SlotCard
            id={itemData.item.id}
            value={formatData(itemData.item)}
            icon={icon}
            testId={`slot-card-${itemData.index}`}
          />
        )}
        onEndReached={loadMoreSlots}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

export default SlotsHome;

const styles = StyleSheet.create({
  chipContainer: {
    padding: 12,
    flexDirection: 'row-reverse',
  },
  chip: {
    width: 140,
    backgroundColor: '#7AB2B2',
  },
  checked: {
    borderWidth: 2,
    borderColor: 'black',
  },
  text: {
    color: 'white',
  },
});
