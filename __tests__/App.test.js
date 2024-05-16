import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';
import Homepage from '../screens/Homepage';
import AirlinesHome from '../screens/airlines/AirlinesHome';

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
