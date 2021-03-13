import React, { Component, Suspense } from 'react';

// import route Components here
import { BrowserRouter as Router } from 'react-router-dom';
import routes from './routes/routing';
import { createBrowserHistory } from 'history';
import './i18n';
import LanguageSelector from './common/LanguageSelector';
import './common/utilities.scss';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Suspense fallback={null}>
        <Router history={history}>
          <>
            <LanguageSelector />
            {routes}
          </>
        </Router>
      </Suspense>
    );
  }
}
export default App;
