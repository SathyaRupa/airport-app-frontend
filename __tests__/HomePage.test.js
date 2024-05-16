import Homepage from '../screens/Homepage';
import {fireEvent, render} from '@testing-library/react-native';

describe('Home page', () => {
  it('Should render title and four buttons', () => {
    const mockNavigation = {
      push: jest.fn(),
    };

    const homePage = render(<Homepage navigation={mockNavigation} />);
    const aircraftsButton = homePage.queryByText('Aircrafts');
    const airlinesButton = homePage.queryByText('Airlines');
    const gatesButton = homePage.queryByText('Gates');
    const slotsButton = homePage.queryByText('Slots');

    expect(homePage.queryByText('Airport App')).toBeTruthy();
    
    expect(aircraftsButton).toBeTruthy();
    expect(airlinesButton).toBeTruthy();
    expect(slotsButton).toBeTruthy();
    expect(gatesButton).toBeTruthy();

    fireEvent.press(airlinesButton);

    expect(mockNavigation.push).toHaveBeenCalledWith('AirlinesHome');
  });
});
