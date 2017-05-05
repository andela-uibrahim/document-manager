import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import thunk from 'redux-thunk'
import expect from 'expect';
import loginAction from 
'../../../../client/src/actions/authentication/loginAction';
import types from '../../../../client/src/actions/actionTypes';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares);

describe('loginAction', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('dispatches LOGIN_SUCCESSFUL when user has successfully logged in', () => {
    nock('http://localhost:3000/')
      .post('/api/users/login',{
          email: 'admin@admin.com',
          password: 'Kratus043'
      })
      .reply(201, { message:
           "login successfully"
        })

    const expectedActions = [
      { type: types.FETCH_TODOS_REQUEST },
      { type: types.FETCH_TODOS_SUCCESS, body: { todos: ['do something']  } }
    ]
    const store = mockStore({ todos: [] })

    return store.dispatch(actions.fetchTodos())
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})