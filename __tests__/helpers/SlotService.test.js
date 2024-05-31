import {waitFor} from '@testing-library/react-native';
import axios from 'axios';
import SlotService from '../../helpers/SlotService';
jest.mock('axios');

const slot1 = {
  id: '1',
  start_time: '2024-05-11T07:19:27.265575Z',
  end_time: '2024-05-31T13:08:03.019702Z',
  status: 'Booked',
  aircraft_id: '2',
  gate_id: '1',
};
const slot2 = {
  id: '2',
  start_time: '2024-05-26T01:13:28.813964Z',
  end_time: '2024-05-31T13:25:29.923002Z',
  status: 'Reserved',
  aircraft_id: '4',
  gate_id: '5',
};
const slot3 = {
  id: '3',
  start_time: '2024-05-26T01:13:28.813964Z',
  end_time: '2024-05-25T04:25:29.923002Z',
  status: 'Available',
  aircraft_id: '',
  gate_id: '',
};

describe('Slots api services', () => {
  it('fetch all should return list of slots', async () => {
    axios.get.mockResolvedValueOnce({
      data: [slot1, slot2, slot3],
    });
    const response = await SlotService.fetchAll();
    await waitFor(() => {
      expect(response).toHaveLength(3);
    });
  });
  it('fetch all should handle error', async () => {
    axios.get.mockRejectedValueOnce(new Error('Request failed'));
    const response = await SlotService.fetchAll();
    await waitFor(() => {
      expect(response).toBeUndefined();
    });
  });
});
