import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import AirlinesHome from '../../screens/airlines/AirlinesHome';
import airlinesService from '../../helpers/airlinesService';
import {useIsFocused} from '@react-navigation/native';

jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('react-native-toast-message', () => 'Toast');
jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(),
}));
jest.mock('../../helpers/airlinesService', () => ({
  fetchAll: jest.fn(),
}));

describe('Airlines home - get all airlines', () => {
  let mockNavigation;

  beforeEach(() => {
    mockNavigation = {
      push: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it('snapshot test', () => {
    const airlinesHome = render(<AirlinesHome navigation={mockNavigation} />);

    expect(airlinesHome).toMatchSnapshot();
  });

  it('should render an item card', async () => {
    useIsFocused.mockReturnValue(true);

    airlinesService.fetchAll.mockResolvedValue([
      {name: 'Jet Airways', count: '6'},
    ]);
    const airlinesHome = render(<AirlinesHome navigation={mockNavigation} />);
    const itemCard = airlinesHome.queryAllByTestId('item-card');

    expect(itemCard).toBeTruthy();
    await waitFor(() => {
      expect(airlinesHome.getByText('Jet Airways')).toBeTruthy();
    });
  });

  it('should not render an item card when no data is recieved', async () => {
    airlinesService.fetchAll.mockResolvedValue([]);

    const airlinesHome = render(<AirlinesHome navigation={mockNavigation} />);
    expect(airlinesHome.queryByTestId('item-card')).toBeNull();
    await waitFor(() =>
      expect(airlinesHome.queryByText('Jet Airways')).toBeNull(),
    );
  });

  it('should navigate to Create Airlines page when clicked on create', () => {
    const {getByText} = render(<AirlinesHome navigation={mockNavigation} />);
    const createButton = getByText('Create');
    expect(createButton).toBeTruthy();
    fireEvent.press(createButton);
    expect(mockNavigation.push).toHaveBeenCalledWith('Create Airline');
  });

  it('should handle error when fetchAll throws an error', async () => {
    useIsFocused.mockReturnValue(true);

    airlinesService.fetchAll.mockRejectedValue(new Error('Failed to fetch'));

    const {queryByTestId} = render(
      <AirlinesHome navigation={mockNavigation} />,
    );

    await waitFor(() => {
      expect(queryByTestId('item-card')).toBeNull();
    });
  });
});
