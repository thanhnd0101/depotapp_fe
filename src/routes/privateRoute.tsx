import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export default function PrivateRoute({ children, isAuthenticated, ...rest }: any): React.ReactElement {
    return (
        <Route
            {...rest}
            render={
                ({ location }) => (
                    isAuthenticated
                        ? (
                            children
                        ) : (
                            <Redirect
                                to={{
                                    pathname: '/',
                                    state: { from: location }
                                }}
                            />
                        ))
            }
        />
    )
}