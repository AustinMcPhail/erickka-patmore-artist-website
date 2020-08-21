import {createGlobalStyle} from 'styled-components'
import normalize from 'styled-normalize'

export const GlobalStyle = createGlobalStyle`
  a{text-decoration:none; color:inherit; cursor:pointer;}
  button{background-color:transparent; color:inherit; border-width:0; padding:0; cursor:pointer;}
  figure{margin:0;}
  input::-moz-focus-inner {border:0; padding:0; margin:0;}
  ul, ol, dd{margin:0; padding:0; list-style:none;}
  h1, h2, h3, h4, h5, h6{margin:0; font-size:inherit; font-weight:inherit;}
  p{margin:0;}
  cite {font-style:normal;}
  fieldset{border-width:0; padding:0; margin:0;}


  ${normalize}

  body {
    background-color: ${(props) => props.theme.backgroundColor};
    font-family: 'Montserrat', sans-serif;
    /* font-family: 'Montserrat', sans-serif; */
    color: ${(props) => props.theme.fontColor};
  }
`

export const theme = (site) => {
  return {
    secondaryFont: 'Inconsolata',
    fontColor: site.fontColor
      ? `rgba(${site.fontColor.rgb.r}, ${site.fontColor.rgb.g}, ${site.fontColor.rgb.b}, ${site.fontColor.rgb.a})`
      : '#2f2f2f',
    backgroundColor: site.backgroundColor
      ? `rgba(${site.backgroundColor.rgb.r}, ${site.backgroundColor.rgb.g}, ${site.backgroundColor.rgb.b}, ${site.backgroundColor.rgb.a})`
      : 'rgba(241, 238, 244, 1)',
    headerBackgroundColor: site.backgroundColor
      ? `rgba(${site.backgroundColor.rgb.r}, ${site.backgroundColor.rgb.g}, ${site.backgroundColor.rgb.b}, 0.75)`
      : 'rgba(241, 238, 244, 0.75)'
  }
}
