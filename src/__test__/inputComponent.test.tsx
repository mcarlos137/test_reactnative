import * as React from 'react';
import renderer from 'react-test-renderer';
//COMPONENTS
import Input from '../components/Input';


it(`input component renders correctly`, () => {
  const tree = renderer.create(<Input value='Carlos' label='First Name' onChangeText={(text: string) => text} inputMode='text' />).toJSON();
  expect(tree).toMatchSnapshot();
});

