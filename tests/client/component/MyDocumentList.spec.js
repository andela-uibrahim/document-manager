/*eslint-disable no-unused-vars*/
import 'babel-polyfill';
import expect from 'expect';
import { shallow } from 'enzyme';
import React from 'react';
import MyDocumentsList from 
'../../../client/src/components/MyDocumentsList.jsx';

let wrapper = shallow(<MyDocumentsList documents={[{
title: 'document list',
access: 'public',
content: 'this is andela'} ]} />);

describe('MyDocumentsList component', () => {
  it('should mount the MyDocumentsList component', () => {
    expect(wrapper.containsMatchingElement(<MyDocumentsList />));
  });

  it('should be cards of MyDocumentsList', () => {
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('p').length).toBe(1);
  });

  it('should have an image tag with a src prop', () => {
    expect(wrapper.find('img').props().src).toExist();
  });

  it(`should have a table with head that contains
   "title", "access" and 'content'`, () => {
    expect(wrapper.find('span').text()).toEqual('document list');
    expect(wrapper.find('a').text()).toEqual('public');
    expect(wrapper.find('p').text()).toEqual('this is andela');
  });

  it(`should return no document found  if there was no document`, () => {
      wrapper = shallow(<MyDocumentsList documents={[]} />);
    expect(wrapper.find('img').props().src).toExist();
    expect(wrapper.find('p').text()).toEqual('You have no document');
  });
});

