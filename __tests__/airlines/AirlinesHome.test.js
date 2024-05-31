import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import AirlinesHome from '../../screens/airlines/AirlinesHome';
import AirlineService from '../../helpers/AirlineService';
import {useIsFocused} from '@react-navigation/native';

jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(),
}));
jest.mock('../../helpers/AirlineService', () => ({
  fetchAll: jest.fn(),
  delete: jest.fn(),
}));

jest.mock('react-native-toast-message', () => 'Toast');
jest.mock('../../components/ToastMessage', () => ({
  SuccessToast: jest.fn(),
  ErrorToast: jest.fn(),
}));

describe('Airlines home - get all airlines', () => {
  let mockNavigation;

  beforeEach(() => {
    mockNavigation = {
      push: jest.fn(),
    };
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  it('snapshot test', () => {
    const airlinesHome = render(<AirlinesHome navigation={mockNavigation} />);

    expect(airlinesHome).toMatchSnapshot();
  });

  it('should render an item card', async () => {
    useIsFocused.mockReturnValue(true);

    AirlineService.fetchAll.mockResolvedValueOnce([
      {name: 'Jet Airways', count: '6'},
    ]);
    const airlinesHome = render(<AirlinesHome navigation={mockNavigation} />);
    await waitFor(() => {
      expect(airlinesHome.queryByTestId('item-card-0')).toBeTruthy();
      expect(AirlineService.fetchAll).toHaveBeenCalledWith(0);
      expect(airlinesHome.getByText('Jet Airways')).toBeTruthy();
    });
  });

  it('should render an item card and naviage to update page when update icon is pressed', async () => {
    useIsFocused.mockReturnValue(true);

    AirlineService.fetchAll.mockResolvedValueOnce([
      {id: '1', name: 'Jet Airways', count: '6'},
      {id: '2', name: 'Kingfisher Airways', count: '7'},
    ]);

    const {getAllByTestId} = render(
      <AirlinesHome navigation={mockNavigation} />,
    );

    await waitFor(() => {
      const updateButton = getAllByTestId('update-icon');
      expect(updateButton[0]).toBeTruthy();
      expect(mockNavigation.push).not.toHaveBeenCalled();
      fireEvent.press(updateButton[0]);
    });
    expect(mockNavigation.push).toHaveBeenCalledWith('Update Airline', {
      id: '1',
    });
  });

  it('should render an item card and a model to pop up when delete icon is clicked', async () => {
    useIsFocused.mockReturnValue(true);

    AirlineService.fetchAll.mockResolvedValueOnce([
      {id: '1', name: 'Jet Airways', count: '6'},
      {id: '2', name: 'Kingfisher Airways', count: '7'},
    ]);

    const {getAllByTestId, getByText} = render(
      <AirlinesHome navigation={mockNavigation} />,
    );

    await waitFor(() => {
      const deleteButton = getAllByTestId('delete-icon');
      expect(deleteButton[0]).toBeTruthy();
      expect(mockNavigation.push).not.toHaveBeenCalled();
      fireEvent.press(deleteButton[0]);
    });
    expect(
      getByText('Are you sure you want to delete the airline\n "Jet Airways"?'),
    ).toBeTruthy();
  });

  it('should render an item card and delete the card when confirmed from the model', async () => {
    useIsFocused.mockReturnValue(true);

    AirlineService.fetchAll.mockResolvedValueOnce([
      {id: '1', name: 'Jet Airways', count: '6'},
      {id: '2', name: 'Kingfisher Airways', count: '7'},
    ]);
    AirlineService.delete.mockResolvedValueOnce({
      data: 'Deleted the airline successfully',
      status: 200,
    });

    const {getAllByTestId, getByText, getByTestId} = render(
      <AirlinesHome navigation={mockNavigation} />,
    );

    await waitFor(() => {
      const deleteButton = getAllByTestId('delete-icon');
      expect(deleteButton[0]).toBeTruthy();
      expect(mockNavigation.push).not.toHaveBeenCalled();
      fireEvent.press(deleteButton[0]);
    });
    expect(
      getByText('Are you sure you want to delete the airline\n "Jet Airways"?'),
    ).toBeTruthy();
    fireEvent.press(getByTestId('yes-button'));
    expect(AirlineService.delete).toHaveBeenCalledWith('1');
  });

  it('should not render an item card when no data is recieved', async () => {
    AirlineService.fetchAll.mockResolvedValue([]);

    const airlinesHome = render(<AirlinesHome navigation={mockNavigation} />);
    expect(airlinesHome.queryByTestId('item-card-0')).toBeNull();
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
});
