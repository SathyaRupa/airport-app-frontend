import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import FilterDialog from '../../components/FilterDialog';

describe('FilterDialog', () => {
  let props;

  beforeEach(() => {
    props = {
      visible: true,
      dismiss: jest.fn(),
      onClick: jest.fn(),
      floor: '',
      floorError: '',
      setFloor: jest.fn(),
      setFloorError: jest.fn(),
    };
  });

  const renderComponent = (overrideProps = {}) => {
    const combinedProps = {...props, ...overrideProps};
    return render(
      <PaperProvider>
        <FilterDialog {...combinedProps} />
      </PaperProvider>,
    );
  };
  it('snapshot testing', () => {
    const filterDialog = renderComponent();
    expect(filterDialog).toMatchSnapshot();
  });
  it('renders correctly', () => {
    const {getByText, getByTestId} = renderComponent();
    expect(getByText('Floor number :')).toBeTruthy();
    expect(getByTestId('floor-input-column')).toBeTruthy();
  });

  it('displays error message for invalid floor number', () => {
    const {getByTestId, getByText} = renderComponent();
    const input = getByTestId('floor-input-column');

    fireEvent.changeText(input, 'abc');
    expect(getByText('Floor number must be a number.')).toBeTruthy();

    fireEvent.changeText(input, '11');
    expect(getByText('Floor number should not exceed 10.')).toBeTruthy();
  });

  it('disables the Done button when there is an error', () => {
    const {getByText, getByTestId} = renderComponent();
    const input = getByTestId('floor-input-column');

    fireEvent.changeText(input, 'abc');
    const doneButton = getByText('Done');

    fireEvent.press(doneButton);
    expect(props.onClick).not.toHaveBeenCalled();
  });

  it('enables the Done button when there is no error', () => {
    const {getByText, getByTestId} = renderComponent();
    const input = getByTestId('floor-input-column');

    fireEvent.changeText(input, '6');
    const doneButton = getByText('Done');

    fireEvent.press(doneButton);
    expect(props.onClick).toHaveBeenCalled();
  });

  it('calls onClick when Done button is pressed', () => {
    const {getByText} = renderComponent({floorError: ''});
    const doneButton = getByText('Done');

    fireEvent.press(doneButton);
    expect(props.onClick).toHaveBeenCalled();
  });
});
