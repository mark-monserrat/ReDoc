import { headerCommonMixin, linkifyMixin } from '../../common-elements';
import { PrismDiv } from '../../common-elements/PrismDiv';
import styled, { css, extensionsHook, withProps } from '../../styled-components';

export const linksCss = css`
  a {
    text-decoration: none;
    color: ${props => props.theme.typography.links.color};

    &:visited {
      color: ${props => props.theme.typography.links.visited};
    }

    &:hover {
      color: ${props => props.theme.typography.links.hover};
    }
  }
`;

export const StyledMarkdownBlock = withProps<{ compact?: boolean; inline?: boolean }>(
  styled(PrismDiv),
)`

  font-family: ${props => props.theme.typography.fontFamily};
  font-weight: ${props => props.theme.typography.fontWeightRegular};
  line-height: ${props => props.theme.typography.lineHeight};

  p {
    &:last-child {
      margin-bottom: 0;
    }
  }

  ${({ compact }) =>
    compact &&
    `
    p:first-child {
      margin-top: 0;
    }
    p:last-child {
      margin-bottom: 0;
    }
  `}

  ${({ inline }) =>
    inline &&
    ` p {
    display: inline-block;
  }`}

  h1 {
    ${headerCommonMixin(1)};
    color: ${props => props.theme.colors.primary.main};
    margin-top: 0;
  }

  h2 {
    ${headerCommonMixin(2)};
    color: ${props => props.theme.colors.text.primary};
  }

  code {
    color: ${({ theme }) => theme.typography.code.color};
    background-color: ${({ theme }) => theme.typography.code.backgroundColor};
    font-family: ${props => props.theme.typography.code.fontFamily};
    padding: 0.1em 0.25em 0.2em;
    font-size: ${props => props.theme.typography.code.fontSize};

    word-break: break-word;
  }

  pre {
    font-family: ${props => props.theme.typography.code.fontFamily};
    white-space:${({ theme }) => (theme.typography.code.wrap ? 'pre-wrap' : 'pre')};
    background-color: #E6E6E6;
    border-radius: 4px;
    color: white;
    padding: 12px 14px 15px 14px;
    overflow-x: auto;
    line-height: normal;
    border: 1px solid #DBDBDB;

    code {
      background-color: transparent;
      color: ${({ theme }) => theme.typography.code.color};
      padding: 0;

      &:before,
      &:after {
        content: none;
      }
    }
  }

  blockquote {
    margin: 2em 0 1em 0;
    padding: 0 15px 15px 15px;
    color: #0E5FC2;
    border-radius: 4px;
    border: 1px solid #0E5FC2;
    background-color: #dbe5f1;
    font-size: 13px;
  }

  img {
    max-width: 100%;
    box-sizing: content-box;
  }

  ul,
  ol {
    padding-left: 2em;
    margin: 0;
    margin-bottom: 1em;
    // > li {
    //   margin: 0.5em 0;
    // }
  }

  table {
    width: 100%;
    overflow: auto;
    word-break: normal;
    word-break: keep-all;
    border-collapse: collapse;
    border-spacing: 0;
    margin: 1.5em auto;
    max-width: 800px;
  }

  table tr {
    background-color: #fff;
    border-top: 1px solid #ccc;

    &:nth-child(2n) {
      background-color: #f8f8f8;
    }
  }

  table th,
  table td {
    padding: 6px 13px;
    border: 1px solid #ddd;
  }

  table th {
    text-align: center;
    font-weight: bold;
  }

  ${linkifyMixin('.share-link')};

  ${linksCss}

  ${extensionsHook('Markdown')};
`;
