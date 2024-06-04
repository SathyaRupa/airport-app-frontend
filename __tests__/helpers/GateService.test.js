import {waitFor} from '@testing-library/react-native';
import axios from 'axios';
import GateService from '../../helpers/GateService';
jest.mock('axios');

describe('gates api services', () => {
  it('fetch all should return list of gates', async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        {id: 1, gate_number: '13', floor_number: '1'},
        {id: 2, gate_number: '6', floor_number: '9'},
      ],
    });
    const response = await GateService.fetchAll(0);
    await waitFor(() => {
      expect(response).toEqual([
        {id: 1, gate_number: '13', floor_number: '1'},
        {id: 2, gate_number: '6', floor_number: '9'},
      ]);
    });
  });

  it('fetch-gate-detail should return gate details', async () => {
    axios.get.mockResolvedValueOnce({
      data: [{id: 1, gate_number: '13', floor_number: '1'}],
    });
    const response = await GateService.show(1);
    await waitFor(() => {
      expect(response).toEqual([{id: 1, gate_number: '13', floor_number: '1'}]);
    });
  });

  it('create should return success message for valid data', async () => {
    axios.post.mockResolvedValueOnce({
      data: 'Created a new gate successfully',
      status: 200,
    });
    const payload = {id: 1, gate_number: '13', floor_number: '1'};
    const response = await GateService.create(payload);
    await waitFor(() => {
      expect(response).toEqual({
        data: 'Created a new gate successfully',
        status: 200,
      });
    });
  });
});
