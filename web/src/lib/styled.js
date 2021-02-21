import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  a{text-decoration:none; color:inherit; cursor:pointer;}
  button{background-color:transparent; color:inherit; border-width:0; padding:0; cursor:pointer;}
  figure{margin:0;}
  input::-moz-focus-inner {border:0; padding:0; margin:0;}
  ul, ol, dd{margin:0; padding:0; list-style:none;}
  p{margin:0;}
  cite {font-style:normal;}
  fieldset{border-width:0; padding:0; margin:0;}

  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 100%;
  }

  body {
    /* Variables */
    --max-font-size-scaler: 1;
    --min-font-size-scaler: .5;

    --h1-size: clamp(calc(4.209rem * var(--min-font-size-scaler)), 5vw, calc(4.209rem * var(--max-font-size-scaler)));
    --h2-size:  clamp(calc(3.157rem * var(--min-font-size-scaler)), 5vw, calc(3.157rem * var(--max-font-size-scaler)));
    --h3-size:  clamp(calc(2.369rem * var(--min-font-size-scaler)), 5vw, calc(2.369rem * var(--max-font-size-scaler)));
    --h4-size:  clamp(calc(1.777rem * var(--min-font-size-scaler)), 5vw, calc(1.777rem * var(--max-font-size-scaler)));
    --h5-size:  clamp(calc(1.333rem * var(--min-font-size-scaler)), 5vw, calc(1.333rem * var(--max-font-size-scaler)));

    --content-spacing: clamp(.5rem, 1vw, 1rem);

    background-color: #FEFBFF;
    
    font-weight: 400;
    line-height: 1.75;
    color: #2F2B3B;
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
  }

  h1, h2, h3, h4, h5 {
    font-family: 'Montserrat', sans-serif;
    margin: 0;
    font-weight: 400;
    line-height: 1.3;
  }

  h1 {
    margin-top: 0;
    font-size: var(--h1-size);
  }

  h2 {font-size: var(--h2-size);}

  h3 {font-size: var(--h3-size);}

  h4 {font-size: var(--h4-size);}

  h5 {font-size: var(--h5-size);}

  small, .text_small {font-size: 0.75rem;}
`

export const theme = (site) => ({
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
    : { h: 210, s: 0.21, l: 0.95, a: 1 },
})
