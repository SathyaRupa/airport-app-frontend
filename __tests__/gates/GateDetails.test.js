import React from 'react';
import {fireEvent, render, waitFor, debug} from '@testing-library/react-native';
import GateService from '../../helpers/GateService';
import {useIsFocused} from '@react-navigation/native';
import GatesHome from '../../screens/Gates/GatesHome';
import GateDetails from '../../screens/gates/GateDetails';

jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(),
}));
jest.mock('../../helpers/GateService', () => ({
  fetchAll: jest.fn(),
  fetchGateInfo: jest.fn(),
}));

jest.mock('react-native-toast-message', () => 'Toast');
jest.mock('../../components/ToastMessage', () => ({
  SuccessToast: jest.fn(),
  ErrorToast: jest.fn(),
}));

describe('Gates home - get all Gates', () => {
  let mockNavigation;
  beforeEach(() => {
    mockNavigation = {
      push: jest.fn(),
    };
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  const mockRoute = {
    params: {
      id: 1,
    },
  };

  it('snapshot test', () => {
    GateService.fetchGateInfo.mockResolvedValueOnce([
      {floor_number: '10', gate_number: '17'},
    ]);
    const gateDetails = render(<GateDetails route={mockRoute} />);
    expect(gateDetails).toMatchSnapshot();
  });

  it('should render an item card and navigate to Gate Details page when item card is pressed', async () => {
    useIsFocused.mockReturnValue(true);
    GateService.fetchAll.mockResolvedValueOnce([
      {id: '1', floor_number: '10', gate_number: '17'},
      {id: '2', floor_number: '6', gate_number: '10'},
    ]);

    const {getAllByTestId} = render(<GatesHome navigation={mockNavigation} />);

    await waitFor(() => {
      const cardButton = getAllByTestId('card');
      expect(cardButton[0]).toBeTruthy();
      expect(mockNavigation.push).not.toHaveBeenCalled();
      fireEvent.press(cardButton[0]);
    });
    expect(mockNavigation.push).toHaveBeenCalledWith('Gate Details', {
      id: '1',
    });
  });
});
