import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  a{text-decoration:none; color:inherit; cursor:pointer;}
  button{background-color:transparent; color:inherit; border-width:0; padding:0; cursor:pointer;}
  figure{margin:0;}
  input::-moz-focus-inner {border:0; padding:0; margin:0;}
  ul, ol, dd{margin:0; padding:0; list-style:none;}
  h1, h2, h3, h4, h5, h6{margin:0;}
  p{margin:0;}
  cite {font-style:normal;}
  fieldset{border-width:0; padding:0; margin:0;}

  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }


  body {
    background-color: ${(props) => props.theme.backgroundColor};
    font-family: 'Montserrat', sans-serif;
    color: ${(props) => props.theme.fontColor};
    font-size: 16px;
  }
`

export const theme = (site) => {
  return {
    secondaryFont: 'Inconsolata',
    fontColor: site.fontColor
      ? `rgba(${site.fontColor.rgb.r}, ${site.fontColor.rgb.g}, ${site.fontColor.rgb.b}, ${site.fontColor.rgb.a})`
      : '#2f2f2f',
    backgroundColor: site.backgroundColor
      ? `hsla(${site.backgroundColor.hsl.h}, ${site.backgroundColor.hsl.s * 100}%, ${
        site.backgroundColor.hsl.l * 100
      }%, ${site.backgroundColor.hsl.a})`
      : 'hsla(210, 21%, 95%, 1)',
    backgroundHsl: site.backgroundColor
      ? site.backgroundColor.hsl
      : {h: 210, s: 0.21, l: 0.95, a: 1}
  }
}
