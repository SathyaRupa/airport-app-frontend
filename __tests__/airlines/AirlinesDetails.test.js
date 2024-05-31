import React from 'react';
import {fireEvent, render, waitFor, debug} from '@testing-library/react-native';
import {haveTextContent} from '@testing-library/jest-dom';
import AirlineService from '../../helpers/AirlineService';
import {useIsFocused} from '@react-navigation/native';
import AirlinesHome from '../../screens/Airlines/AirlinesHome';
import AirlineDetails from '../../screens/Airlines/AirlineDetails';

jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(),
}));
jest.mock('../../helpers/AirlineService', () => ({
  fetchAll: jest.fn(),
  fetchAirlineDetails: jest.fn(),
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
    AirlineService.fetchAirlineDetails.mockResolvedValueOnce([
      {id: '1', name: 'Jet Airways', count: '6'},
    ]);
    const airlineDetails = render(<AirlineDetails route={mockRoute} />);
    expect(airlineDetails).toMatchSnapshot();
  });

  it('should render an item card and navigate to Airline Details page when item card is pressed', async () => {
    useIsFocused.mockReturnValue(true);
    AirlineService.fetchAll.mockResolvedValueOnce([
      {id: '1', name: 'Jet Airways', count: '6'},
      {id: '2', name: 'Kingfisher Airways', count: '7'},
    ]);

    AirlineService.fetchAirlineDetails.mockResolvedValueOnce([
      {id: '1', name: 'Jet Airways', count: '6'},
    ]);

    const {getAllByTestId, getByText} = render(
      <AirlinesHome navigation={mockNavigation} />,
    );

    await waitFor(() => {
      const cardButton = getAllByTestId('item-card-0');
      expect(cardButton).toBeTruthy();
      expect(getByText('Jet Airways')).toBeTruthy();
      expect(mockNavigation.push).not.toHaveBeenCalled();
      fireEvent.press(cardButton[0]);
    });
    expect(mockNavigation.push).toHaveBeenCalledWith('Airline Details', {
      id: '1',
    });
    const mockDetails = {
      name: 'Jet Airways',
      count: 6,
    };

    const {getByTestId} = render(<AirlineDetails route={mockRoute} />);

    await waitFor(() => {
      getByTestId('airline-name');
      getByTestId('airline-count');
    });

    const airlineNameText = getByTestId('airline-name');
    expect(airlineNameText).toBeTruthy();
    expect(`Name: ${mockDetails.name}`).toEqual('Name: Jet Airways');

    const airlineNameCount = getByTestId('airline-count');
    expect(airlineNameCount).toBeTruthy();
    expect(`Name: ${mockDetails.count}`).toEqual('Name: 6');
  });
});
