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
  show: jest.fn(),
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
    GateService.show.mockResolvedValueOnce([
      {floor_number: '10', gate_number: '17'},
    ]);
    const gateDetails = render(<GateDetails route={mockRoute} />);
    expect(gateDetails).toMatchSnapshot();
  });

  it('should render an Gate Details page along with the values', async () => {
    useIsFocused.mockReturnValue(true);

    GateService.show.mockResolvedValueOnce({
      id: '1',
      floor_number: '6',
      gate_number: '7',
    });

    const {getByText} = render(<GateDetails route={mockRoute} />);

    await waitFor(() => {
      expect(getByText('Floor Number : 6')).toBeTruthy();
      expect(getByText('Gate Number : 7')).toBeTruthy();
    });
  });
});
