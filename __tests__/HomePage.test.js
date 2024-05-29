import Homepage from '../screens/Homepage';
import {fireEvent, render} from '@testing-library/react-native';

jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('react-native-toast-message', () => 'Toast');

describe('Home page', () => {
  it('Should render title and four buttons', () => {
    const mockNavigation = {
      push: jest.fn(),
    };

    const homePage = render(<Homepage navigation={mockNavigation} />);
    const airlinesButton = homePage.queryByText('Airlines');

    expect(homePage).toMatchSnapshot();
    expect(airlinesButton).toBeTruthy();

    fireEvent.press(airlinesButton);

    expect(mockNavigation.push).toHaveBeenCalledWith('Airlines');
  });
});
