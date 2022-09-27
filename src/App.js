import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from '../src/store'
import {PersistGate} from 'redux-persist/integration/react';


// rotas
import Login from './view/login';
import SignIn from './view/signin'
import Home from './view/home'
import PWrecover from './view/pwrecover'
import NewTask from './view/newtask'
import NewTest from './view/newtest'


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <Router>
          <Route exact path='/login' component={Login} />
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/' component={Home} />
          <Route exact path='/recover' component={PWrecover} />
          <Route exact path='/newtask' component={NewTask} />
          <Route exact path='/newtest' component={NewTest} />
          <Route path='/edit-task/:taskid' component={NewTask} />
          <Route path='/edit-test/:testid' component={NewTest} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
