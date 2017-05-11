/*
global expect:true
global thunk:true
global configureMockStore:true
global moxios:true
global sinon:true
*/
import signUp from '../../../client/src/actions/authentication/signUpAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  
  it('creates SIGN_UP_ERROR action when user details are incorrect',
  (done) => {
    const expectedActions = [
      { type: 'SIGN_UP_ERROR',
        message: 'Email already exist'
        }
    ];

    const store = mockStore({});

    store.dispatch(signUp({
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