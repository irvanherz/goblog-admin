import React, { useEffect } from 'react';
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AppContainer = styled.div`
min-height: 100vh;
position: relative;
background: #f0f2f5;
`

const BlankLayout = props => {
  const history = useHistory()
  const authState = useSelector(state => state.auth)

  useEffect(() => {
    if(authState.token){
      history.push('/')
    }
  }, [authState.token])

  return (
    <AppContainer className='App'>
      {props.children || null}
    </AppContainer>
  )
}

export default BlankLayout
