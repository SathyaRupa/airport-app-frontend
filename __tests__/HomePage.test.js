import Homepage from '../screens/Homepage';
import {fireEvent, render} from '@testing-library/react-native';

describe('Home page', () => {
  it('Should render  four buttons', () => {
    const mockNavigation = {
      push: jest.fn(),
    };

    const homePage = render(<Homepage navigation={mockNavigation} />);
    expect(homePage.queryByText('Airport App')).toBeTruthy();

    const aircraftsButton = homePage.queryByText('Aircrafts');
    expect(aircraftsButton).toBeTruthy();
    fireEvent.press(aircraftsButton);

    const airlinesButton = homePage.queryByText('Airlines');
    expect(airlinesButton).toBeTruthy();
    fireEvent.press(airlinesButton);
    expect(mockNavigation.push).toHaveBeenCalledWith('AirlinesHome');

    const gatesButton = homePage.queryByText('Gates');
    expect(gatesButton).toBeTruthy();
    fireEvent.press(gatesButton);

    const slotsButton = homePage.queryByText('Slots');
    expect(slotsButton).toBeTruthy();
    fireEvent.press(slotsButton);
  });
});
