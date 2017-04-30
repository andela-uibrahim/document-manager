/*eslint-disable no-unused-vars*/
import 'babel-polyfill';
import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import MyDocumentsList from 
'../../../client/src/components/document/MyDocumentsList.jsx';

let wrapper = shallow(<MyDocumentsList documents={[{
title: 'document list',
access: 'public',
content: 'this is andela'} ]} />);

describe('MyDocumentsList component', () => {
  it('should mount the MyDocumentsList component', () => {
    expect(wrapper.containsMatchingElement(<MyDocumentsList />));
  });

  it('should be cards of MyDocumentsList', () => {
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('h3').length).toBe(1);
  });

  it(`should return no document found  if there was no document`, () => {
      wrapper = shallow(<MyDocumentsList documents={[]} />);
    expect(wrapper.find('img').props().src).toExist();
    expect(wrapper.find('p').text()).toEqual('You have no document');
  });
});

