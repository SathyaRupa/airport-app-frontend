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
  });
  it('snapshot test', () => {
    const airlinesHome = render(<AirlinesHome navigation={mockNavigation} />);

    expect(airlinesHome).toMatchSnapshot();
  });
  it('should render an item card', () => {
    const airlinesHome = render(<AirlinesHome navigation={mockNavigation} />);
    airlinesService.fetchAll.mockReturnValue([
      {name: 'Jet Airways', count: '6'},
    ]);
    const itemCard = airlinesHome.queryAllByTestId('item-card');

    expect(itemCard).toBeTruthy();
    waitFor(() => {
      expect(airlinesHome.getByText('Jet Airways')).toBeTruthy();
    });
  });
  it('should not render an item card when no data is recieved', () => {
    airlinesService.fetchAll.mockResolvedValue([]);

    const {queryByText} = render(<AirlinesHome navigation={mockNavigation} />);
    waitFor(() => expect(queryByText('Jet Airways')).toBeNull());
  });
});
