import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router'
import { Footer } from './components/Footer/Footer';
import Login from './components/Login/Login';
import Student from './components/Student/Student'
import Professor from './components/Professor/Professor'
import { Profile } from './components/Profile/Profile'
import { ShowThesis } from './components/ShowThesis/ShowThesis'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import SuggestThesis from './components/SuggestThesis/SuggestThesis';
import { Documents } from './components/Documents/Documents';

function App() {
  return (
    <div className="App">
      <main>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login}>
            </Route>
            <Route path="/student" component={Student}></Route>
            <Route path="/professor" component={Professor}></Route>
            <Route path="/thesisSuggest" component={SuggestThesis}></Route>
            <Route path="/profile" component={Profile}></Route>
            <Route path="/showThesis" component={ShowThesis}></Route>
            <Route path="/documents" component={Documents}></Route>
          </Switch>
        </BrowserRouter>
      </main>
      <Footer />
      <NotificationContainer />
    </div >
  );
}

export default App;
