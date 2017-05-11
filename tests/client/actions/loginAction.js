/*
global expect:true
global thunk:true
global configureMockStore:true
global moxios:true
global sinon:true
*/
import login from '../../../client/src/actions/authentication/loginAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates LOGIN_ERROR action when user details are incorrect',
  (done) => {
    const expectedActions = [
      { type: 'LOGIN_ERROR', message: 'Invalid credentials' }
    ];

    const store = mockStore({});

    store.dispatch(login({
      email: 'wromgemail@gmail.com',
      password: 'password'
    })).then(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: { message: 'Invalid credentials' }
      });
    });
  });
});