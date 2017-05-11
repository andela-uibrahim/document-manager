import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import actions from '../../../client/src/actions/documentManagement/';
import types from '../../../client/src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Document Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatch DOCUMENT_DELETED when document is deleted',
  () => {
    nock('http://localhost.com/')
      .delete('/api/documents/1')
      .reply(200, {
        body: {} 
    });

    const expectedActions = [{
        type: types.DOCUMENT_DELETED,
        status: 'success' }]

    // const store = mockStore({ auth: {}, documents: [],
    // users: [], search: [], paginate: {}, user: [] });
    const store = mockStore({});

    store.dispatch(actions.deleteDocument(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('dispatch DOCUMENT_CREATED when document is created',
  () => {
    nock('http://localhost.com/')
      .post('/api/documents')
      .reply(201, {
        body: {} 
    });

    const expectedActions = [{
        type: types.DOCUMENT_CREATED,
        status: 'success' }]

    // const store = mockStore({ auth: {}, documents: [],
    // users: [], search: [], paginate: {}, user: [] });
    const store = mockStore({});
    const details = {
        title: 'docman',
        content: 'partiality',
        access: 'public'
    }
    store.dispatch(actions.newDocument(details))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('dispatch PAGINATED_DOCUMENTS action when all documents',
  () => {
    nock('http://localhost.com/')
      .get('/api/documents')
      .reply(200, {
        body: {} 
    });

    const expectedActions = [{
        type: types.PAGINATED_DOCUMENTS,
        documents: [],
        pageCount: '2',
        currentPage: '1', 
    }]

    // const store = mockStore({ auth: {}, documents: [],
    // users: [], search: [], paginate: {}, user: [] });
        const store = mockStore({});
  
        store.dispatch(actions.paginateDocument())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('dispatch FIND_DOCUMENT action when all documents',
  () => {
    nock('http://localhost.com/')
      .get('/api/search/documents/?search=we')
      .reply(200, {
        body: {} 
    });

    const expectedActions = [{
        type: types.FIND_DOCUMENT,
        documents: [],
        pageCount: '2',
    }]

    // const store = mockStore({ auth: {}, documents: [],
    // users: [], search: [], paginate: {}, user: [] });
        const store = mockStore({});
  
        store.dispatch(actions.searchDocument())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('dispatch VIEW_DOCUMENT action when viewing a document documents',
  () => {
    nock('http://localhost.com/')
      .get('/api/documents/1')
      .reply(200, {
        body: {} 
    });

    const expectedActions = [{
        type: types.VIEW_DOCUMENT,
        documents: [],
    }]

    // const store = mockStore({ auth: {}, documents: [],
    // users: [], search: [], paginate: {}, user: [] });
        const store = mockStore({});
  
        store.dispatch(actions.viewDocument())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('dispatch USER_DOCUMENTS_FOUND action when viewing a user documents',
  () => {
    nock('http://localhost.com/')
      .get('/api/users/1/documents/')
      .reply(200, {
        body: {} 
    });

    const expectedActions = [{
        type: types.USER_DOCUMENTS_FOUND,
        documents: [],
        status: 'success',
        pageCount: '2',
        currentPage: '1', 
    }]

    // const store = mockStore({ auth: {}, documents: [],
    // users: [], search: [], paginate: {}, user: [] });
        const store = mockStore({});
  
        store.dispatch(actions.viewMyDocuments())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
