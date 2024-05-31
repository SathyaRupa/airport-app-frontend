import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import AirlineService from '../../helpers/AirlineService';
import {useIsFocused} from '@react-navigation/native';
import AirlineDetails from '../../screens/airlines/AirlineDetails';

jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(),
}));
jest.mock('../../helpers/AirlineService', () => ({
  fetchAll: jest.fn(),
  show: jest.fn(),
}));

jest.mock('react-native-toast-message', () => 'Toast');
jest.mock('../../components/ToastMessage', () => ({
  SuccessToast: jest.fn(),
  ErrorToast: jest.fn(),
}));

describe('Airlines home - get all Airlines', () => {
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
    AirlineService.show.mockResolvedValueOnce({
      id: '1',
      name: 'Jet Airways',
      count: '6',
    });
    const airlineDetails = render(<AirlineDetails route={mockRoute} />);
    expect(airlineDetails).toMatchSnapshot();
  });

  it('should render an Gate Details page along with the values', async () => {
    useIsFocused.mockReturnValue(true);

    AirlineService.show.mockResolvedValueOnce({
      id: '1',
      name: 'Jet Airways',
      count: '6',
    });

    const {getByText} = render(<AirlineDetails route={mockRoute} />);

    await waitFor(() => {
      expect(getByText('Name: Jet Airways')).toBeTruthy();
      expect(getByText('Count: 6')).toBeTruthy();
    });
  });
});
