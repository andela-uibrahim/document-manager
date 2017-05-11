/*eslint-disable no-unused-vars*/
import 'babel-polyfill';
import expect from 'expect';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import MyDocuments from 
'../../../client/src/components/document/MyDocuments.jsx';
import initialState from '../../../client/src/store/initialState';
import configureStore from '../../../client/src/store/configureStore';

initialState.allDocumentsReducer = { myDocuments: ['1','2'] };
const store = configureStore(initialState);

const verifyToken = ()=>{
  return null
}
const wrapper = mount(
 <Provider store={store}>
    <MyDocuments verifyToken={verifyToken}/>
  </Provider>
);


describe('MyDocuments component', () => {
  it('should mount the MyDocuments component', () => {
    expect(wrapper.containsMatchingElement(<MyDocuments />));
    expect(wrapper.find('Header').length).toBe(1);
    expect(wrapper.find('Sidebar').length).toBe(1);
    expect(wrapper.find('MyDocumentList').length).toBe(1);
    expect(wrapper.find('Pagination').length).toBe(1);
  });
});

