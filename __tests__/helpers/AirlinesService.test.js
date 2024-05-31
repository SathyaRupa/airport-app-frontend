import {waitFor} from '@testing-library/react-native';
import axios from 'axios';
import AirlineService from '../../helpers/AirlineService';
jest.mock('axios');

describe('airlines api services', () => {
  it('fetch all should return list of airlines', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        {id: 1, name: 'Jet Airways', count: '6'},
        {id: 2, name: 'Indian Airways', count: '9'},
      ],
    });
    const response = await AirlineService.fetchAll(0);
    await waitFor(() => {
      expect(response).toEqual([
        {id: 1, name: 'Jet Airways', count: '6'},
        {id: 2, name: 'Indian Airways', count: '9'},
      ]);
    });
  });

  it('fetch-airline-detail should return airline details', async () => {
    axios.get.mockResolvedValueOnce({
      data: [{id: 1, name: 'Jet Airways', count: '6'}],
    });
    const response = await AirlineService.show(1);
    await waitFor(() => {
      expect(response).toEqual([{id: 1, name: 'Jet Airways', count: '6'}]);
    });
  });

  it('create should return success message for valid data', async () => {
    axios.post.mockResolvedValueOnce({
      data: 'Created a new airline successfully',
      status: 201,
    });
    const payload = {name: 'Jet Airways', count: '6'};
    const response = await AirlineService.create(payload);
    await waitFor(() => {
      expect(response).toEqual({
        data: 'Created a new airline successfully',
        status: 201,
      });
    });
  });

  it('delete should return success message for successfule deletion', async () => {
    axios.delete.mockResolvedValueOnce({
      data: 'Deleted the airline successfully',
      status: 200,
    });
    const airlineId = 1;
    const response = await AirlineService.delete(airlineId);
    await waitFor(() => {
      expect(response).toEqual({
        data: 'Deleted the airline successfully',
        status: 200,
      });
    });
  });
});
