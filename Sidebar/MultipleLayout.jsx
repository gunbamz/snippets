import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Router from "components/router";

const MyApp = props => (
  <BrowserRouter>
      <Router />
  </BrowserRouter>
);

ReactDOM.render(<MyApp />, document.getElementById("app"));

import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { LoginPage, UserDetailsPage } from "pages";

const Router = () => (
  <Switch>
    <Redirect from="/" to="/layout1"/>
    <Route path="/layout1" component={LoginPage} />
    <Route path="/layout2" component={UserDetailsPage} />
  </Switch>
);

export Router;

import React from 'react';  
import { Route } from 'react-router-dom';  

const LoginLayout = ({ children }) => (                         
    <div>  
      {children}                                       
    </div>  
  );  

  const LoginLayoutRoute = ({component: Component, ...rest}) => {  
    return (  
      <Route {...rest} render={props => (  
        <LoginLayout>  
            <Component {...props} />  
        </LoginLayout>  
      )} />  
    )  
  };  

export LoginLayoutRoute;  

import { Route } from 'react-router-dom';

const DashboardLayout = ({ children, ...rest }) => {
  return (
    <div className='page page-dashboard'>
      <header>
        <h1>Dashboard</h1>
        <p>The agent dashboard has 3 parts, a side menu, a top bar and content area to render components.</p>
      </header>
      <section>
        <nav>
          <p>
            DashboardLayout.js contains a higher order component (HOC) that
            takes a component as a prop and passes it into a `Route` from
            react-router-dom.
          </p>
          <p>
            The specific path for the component being passed to the HOC is
            passed to the Route in the spread ...rest .
          </p>
        </nav>
        <article>{children}</article>
      </section>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
};

const DashboardLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <DashboardLayout>
          <Component {...props} />
        </DashboardLayout>
      )}
    />
  );
};

export DashboardLayoutRoute;