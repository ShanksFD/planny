import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isEligible } from '../../utils';

const PrivateRoute = ({component: Component, permName, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isEligible(permName) ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;