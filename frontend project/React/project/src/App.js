import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// router를 사용하기 위해 사용하는 명령어
import Blog from './Routers/Blog'
import Youtube from './Routers/Youtube'
import Weather from './Routers/Weather'
import Bitcoin from './Routers/Bitcoin'
import Header from './Components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
      <Route path="/Blog" component={Blog}/>
      <Route path="/Youtube" component={Youtube}/>
      <Route path="/Weather" component={Weather}/>
      <Route path="/Bitcoin" component={Bitcoin}/>

      </Switch>

    </Router>
  );
};

export default App;
