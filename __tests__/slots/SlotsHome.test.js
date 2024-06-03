import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import SlotsHome from '../../screens/slots/SlotsHome';
import SlotService from '../../helpers/SlotService';
import {useIsFocused} from '@react-navigation/native';

jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(),
}));
jest.mock('../../helpers/SlotService', () => ({
  fetchAll: jest.fn(),
}));

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

describe('SlotsHome page', () => {
  let mockNavigaton;

  beforeEach(() => {
    mockNavigaton = {
      push: jest.fn(),
    };
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  it('snapshot test', () => {
    const slotsHome = render(<SlotsHome navigation={mockNavigaton} />);

    expect(slotsHome).toMatchSnapshot();
  });

  it('should render slot-card when data is recieved', () => {
    SlotService.fetchAll.mockResolvedValueOnce([slot1, slot2, slot3]);
    useIsFocused.mockReturnValue(true);

    const {queryByTestId} = render(<SlotsHome navigation={mockNavigaton} />);

    waitFor(() => {
      expect(queryByTestId('slot-card-0')).toBeTruthy();
      expect(queryByTestId('slot-card-1')).toBeTruthy();
      expect(queryByTestId('slot-card-2')).toBeTruthy();
      expect(SlotService.fetchAll).toHaveBeenCalledWith(0, true);
    });
  });

  it('should render call api again when checkbox is clicked', () => {
    SlotService.fetchAll.mockReturnValue([slot1, slot2, slot3]);
    useIsFocused.mockReturnValue(true);

    const {queryByTestId} = render(<SlotsHome navigation={mockNavigaton} />);
    const chip = queryByTestId('display-all');

    expect(chip).toBeTruthy();

    fireEvent.press(chip);
    waitFor(() => {
      expect(queryByTestId('slot-card-0')).toBeTruthy();
      expect(queryByTestId('slot-card-1')).toBeTruthy();
      expect(queryByTestId('slot-card-2')).toBeTruthy();
      expect(SlotService.fetchAll).toHaveBeenCalledWith(0, true);
      expect(SlotService.fetchAll).toHaveBeenCalledWith(0, false);
    });
  });
});
