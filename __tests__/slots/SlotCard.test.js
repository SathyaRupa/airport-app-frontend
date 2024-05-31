import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import SlotCard from '../../screens/slots/SlotCard';

jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('react-native-toast-message', () => 'Toast');

jest.useFakeTimers();

const slot = {
  id: '1',
  startTime: '2024-05-11T07:19:27.265575Z',
  endTime: '2024-05-31T13:08:03.019702Z',
  status: 'Booked',
};

describe('SlotCard Component', () => {
  it('snapshot test', () => {
    const slotCard = render(<SlotCard id={1} value={slot} />);
    expect(SlotCard).toMatchSnapshot();
  });
  it('should be able to click on delete icon', () => {
    const mockHandleDelete = jest.fn();
    const slotCard = render(
      <SlotCard
        id={1}
        value={slot}
        icon="icon"
        handleDelete={mockHandleDelete}
      />,
    );
    const deleteIcon = slotCard.queryByTestId('delete-icon');
    expect(deleteIcon).toBeTruthy();
    fireEvent.press(deleteIcon);
    expect(mockHandleDelete).toHaveBeenCalledWith(1, slot);
  });

  it('should be able to click on update icon', () => {
    const mockHandleUpdate = jest.fn();
    const slotCard = render(
      <SlotCard
        id={1}
        value={slot}
        icon="icon"
        handleUpdate={mockHandleUpdate}
      />,
    );
    const updateIcon = slotCard.queryByTestId('update-icon');
    expect(updateIcon).toBeTruthy();
    fireEvent.press(updateIcon);
    expect(mockHandleUpdate).toHaveBeenCalledWith(1, slot);
  });

  it('SlotCard should be clickable', () => {
    const mockHandleOnPress = jest.fn();
    const {queryByTestId} = render(
      <SlotCard
        id={1}
        value={slot}
        icon="icon"
        onPress={mockHandleOnPress}
        testId="slot-card-0"
      />,
    );
    const slotCard = queryByTestId('slot-card-0');
    expect(SlotCard).toBeTruthy();
    fireEvent.press(slotCard);
    expect(mockHandleOnPress).toHaveBeenCalledTimes(1);
  });
});
