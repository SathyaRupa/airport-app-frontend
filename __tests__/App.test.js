import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('react-native-toast-message', () => 'Toast');

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: jest.fn(() => ({
    Navigator: jest.fn(),
    Screen: jest.fn(),
  })),
}));

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({children}) => <>{children}</>,
}));

describe('App screen', () => {
  it('should render App', () => {
    expect(render(<App />)).toBeTruthy();
  });
});
