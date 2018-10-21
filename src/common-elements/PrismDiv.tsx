import styled, { extensionsHook } from '../styled-components';

export const PrismDiv = styled.div`
  /**
  * Based on prism-dark.css
  */

  code[class*='language-'],
  pre[class*='language-'] {
    /* color: white;
    background: none; 
    text-shadow: 0 -0.1em 0.2em black;*/
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  @media print {
    code[class*='language-'],
    pre[class*='language-'] {
      text-shadow: none;
    }
  }

  /* Code blocks */
  pre[class*='language-'] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
  }

  .token.comment,
  .token.prolog,
  .token.cdata {
    color: #B3B4B7;
  }


  .token.doctype {
    color: ##3B82C4
  }

  .token.punctuation {
    opacity: 0.7;
  }

  .namespace {
    opacity: 0.7;
  }

  .token.tag,
  .token.number,
  .token.symbol {
    color: #9B83BB;
  }

  .token.constant {
    color: #CD6069;
  }

  .token.boolean {
    color: #E09C63;
  }

  .token.function {
    color: #D99C58;
  }

  .token.selector,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #9CAF57;
    & + a,
    & + a:visited {
      color: #9CAF57;
      text-decoration: underline;
    }
  }

  .token.property,
  .token.attr-name {
    color: #3D979E;
  }

  .token.attr-value,
  .token.string {
    color: #9CAF57;
  }

  /* .property.token.string {
    color: #8AB522;
  } */

  .token.operator {
    color: #D5673D;
  }
  .token.entity,
  .token.url,
  .token.variable {
    color: #F26834;
  }

  .token.atrule,
  .token.keyword {
    color: #D5673D;
  }

  .token.regex,
  .token.important {
    color: #414286;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  .token.deleted {
    color: red;
  }

  ${extensionsHook('Prism')};
`;
