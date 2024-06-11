import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import GateService from '../../helpers/GateService';
import {useIsFocused} from '@react-navigation/native';
import GatesHome from '../../screens/gates/GatesHome';

jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(),
}));
jest.mock('../../helpers/GateService', () => ({
  fetchAll: jest.fn(),
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

  it('snapshot test', () => {
    const gatesHome = render(<GatesHome navigation={mockNavigation} />);

    expect(gatesHome).toMatchSnapshot();
  });

  it('should render an item card', async () => {
    useIsFocused.mockReturnValue(true);

    GateService.fetchAll.mockResolvedValueOnce([
      {floor_number: '10', gate_number: '17'},
    ]);
    const gatesHome = render(<GatesHome navigation={mockNavigation} />);
    const itemCard = gatesHome.queryAllByTestId('item-card-0');

    expect(itemCard).toBeTruthy();
    await waitFor(() => {
      expect(GateService.fetchAll).toHaveBeenCalledWith(0);
      expect(gatesHome.getByText('Gate 17')).toBeTruthy();
    });
  });

  it('should not render an item card when no data is recieved', async () => {
    GateService.fetchAll.mockResolvedValue([]);
    const gatesHome = render(<GatesHome navigation={mockNavigation} />);
    expect(gatesHome.queryByTestId('item-card-0')).toBeNull();
    await waitFor(() =>
      expect(gatesHome.queryByText('Jet Airways')).toBeNull(),
    );
  });

  it('should navigate to Create Gates page when clicked on create', () => {
    const {getByText} = render(<GatesHome navigation={mockNavigation} />);
    const createButton = getByText('Create');
    expect(createButton).toBeTruthy();
    fireEvent.press(createButton);
    expect(mockNavigation.push).toHaveBeenCalledWith('Create Gate');
  });

  it('should render an item card and naviage to update page when update icon is pressed', async () => {
    useIsFocused.mockReturnValue(true);

    GateService.fetchAll.mockResolvedValueOnce([
      {id: '1', gate_number: '78', floor_number: '6'},
      {id: '2', gate_number: '67', floor_number: '7'},
    ]);

    const {getAllByTestId} = render(<GatesHome navigation={mockNavigation} />);

    await waitFor(() => {
      const updateButton = getAllByTestId('update-icon');
      expect(updateButton[0]).toBeTruthy();
      expect(mockNavigation.push).not.toHaveBeenCalled();
      fireEvent.press(updateButton[0]);
    });
    expect(mockNavigation.push).toHaveBeenCalledWith('Update Gate', {
      id: '1',
    });
  });
});
