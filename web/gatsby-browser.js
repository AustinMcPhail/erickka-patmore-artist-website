import React from 'react'
import {ThemeProvider} from 'styled-components'
import Layout from './src/components/core/layout'
import {GlobalStyle, theme} from './src/lib/styled'

export function wrapPageElement ({element, props}) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <ThemeProvider theme={theme({})}>
      <GlobalStyle />
      <Layout {...props}>{element}</Layout>
    </ThemeProvider>
  )
}
