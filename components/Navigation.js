import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux';
import { loginAction, loginoutAction } from "../reducers/user";

const StyledNavigation = styled.div`
  display: flex;
  border-bottom: 1px solid grey;
`;

const NavigationItem = styled.a`
  flex-grow: 1;
`;

const Navigation = () => {
  const { firstName, lastName, loading } = useSelector(state => state.user || {});
  const dispatch = useDispatch();
  const login = () => {
    dispatch(loginAction());
  }
  const logout = () => {
    dispatch(loginoutAction());
  }
  return (
    <StyledNavigation>
      <Link href="/">
        <NavigationItem >
          <h3>Sample</h3>
        </NavigationItem>
      </Link>

      <Link href="/page1">
        <NavigationItem >
          <p>Page 1</p>
        </NavigationItem>
      </Link>

      <Link href="/page2">
        <NavigationItem >
          <p>Page 2</p>
        </NavigationItem>
      </Link>

      <NavigationItem >
        {
          loading ?
            <p>...loading</p>
            :
            firstName ?
              <p onClick={logout}>welcome {firstName}</p>
              :
              <p onClick={login}>login</p>
        }
      </NavigationItem>
    </StyledNavigation>
  )
}

export default Navigation
