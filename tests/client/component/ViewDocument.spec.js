/*eslint-disable no-unused-vars*/
import 'babel-polyfill';
import expect from 'expect';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';
import { ViewDocument } from 
'../../../client/src/components/document/ViewDocument.jsx';
import initialState from '../../../client/src/store/initialState';
import configureStore from '../../../client/src/store/configureStore';

const store = configureStore(initialState);

const params = {
    id: "1"
}
const viewDocument = ()=> {
    return null
}

let wrapper = mount(
    <Provider store={store}>
        <ViewDocument params={params} viewDocument={viewDocument}
document={{
title: 'document list',
access: 'public',
content: 'this is andela'} } />
    </Provider>);

describe('ViewDocument component', () => {
  it('should mount the ViewDocument component', () => {
    expect(wrapper.containsMatchingElement(<ViewDocument />));
    expect(wrapper.find('Header').length).toBe(1);
    expect(wrapper.find('Sidebar').length).toBe(1);
  });

  it('should be cards of ViewDocument', () => {
    expect(wrapper.find('img').length).toBe(2);
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('a').length).toBe(15);
    expect(wrapper.find('p').length).toBe(9);
  });

  it('should have an image tag with a src prop', () => {
    expect(wrapper.find('img').at(0).props().src).toExist();
  });

  it(`should have a card that contains
   "title", "access" and 'content'`, () => {
    expect(wrapper.find('span').at(0).text()).toEqual('document list');
    expect(wrapper.find('a').last().text()).toEqual('public');
    expect(wrapper.find('p').last().text()).toEqual('this is andela');
  });

});
