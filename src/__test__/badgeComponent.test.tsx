import * as React from 'react';
import renderer from 'react-test-renderer';
//COMPONENTS
import Badge from '../components/Badge';

it(`renders correctly`, () => {
  const tree = renderer.create(<Badge text='Hi, Carlos' />).toJSON();
  expect(tree).toMatchSnapshot();
});
