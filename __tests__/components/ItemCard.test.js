import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import ItemCard from '../../components/ItemCard';

jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('react-native-toast-message', () => 'Toast');

jest.useFakeTimers();

describe('ItemCard Component', () => {
  it('snapshot test', () => {
    const itemCard = render(<ItemCard id={1} value="Jet Airways" />);
    expect(itemCard).toMatchSnapshot();
  });
  it('should be able to click on delete icon', () => {
    const mockHandleDelete = jest.fn();
    const itemCard = render(
      <ItemCard
        id={1}
        value="Jet Airways"
        icon="icon"
        handleDelete={mockHandleDelete}
      />,
    );
    const deleteIcon = itemCard.queryByTestId('delete-icon');
    expect(deleteIcon).toBeTruthy();
    fireEvent.press(deleteIcon);
    expect(mockHandleDelete).toHaveBeenCalledWith(1, 'Jet Airways');
  });

  it('should be able to click on update icon', () => {
    const mockHandleUpdate = jest.fn();
    const itemCard = render(
      <ItemCard
        id={1}
        value="Jet Airways"
        icon="icon"
        handleUpdate={mockHandleUpdate}
      />,
    );
    const updateIcon = itemCard.queryByTestId('update-icon');
    expect(updateIcon).toBeTruthy();
    fireEvent.press(updateIcon);
    expect(mockHandleUpdate).toHaveBeenCalledWith(1, 'Jet Airways');
  });

  it('itemCard should be clickable', () => {
    const mockHandleOnPress = jest.fn();
    const {queryByTestId} = render(
      <ItemCard
        id={1}
        name="Jet Airways"
        icon="icon"
        onPress={mockHandleOnPress}
        testId="item-card-0"
      />,
    );
    const itemCard = queryByTestId('item-card-0');
    expect(itemCard).toBeTruthy();
    fireEvent.press(itemCard);
    expect(mockHandleOnPress).toHaveBeenCalledTimes(1);
  });
});
