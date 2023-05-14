import { colors, font, lineHeights } from "ui/styles";
import { css } from "ui/utils";
import darken from "polished/lib/color/darken";

import reset from "./reset";

export default css`
  ${reset};

  body {
    font-family: ${font.family.miloOT};
    color: ${colors.primary};
  }

  html,
  body {
    font-size: ${font.size.base};
    height: 100%;
    width: 100%;
    -webkit-overflow-scrolling: touch;
  }

  body {
    overflow-x: hidden;
  }

  a {
    color: ${colors.primary};
    text-overflow: ellipsis;
    text-decoration: none;

    &:hover {
      color: ${darken(0.05, colors.primary)};
    }
  }

  p,
  span,
  strong,
  li,
  dt,
  dd,
  select,
  option,
  input,
  label,
  td,
  th {
    line-height: ${lineHeights.base};
  }

  em {
    font-style: italic;
  }

  li {
    text-align: left;
  }

  strong {
    font-weight: ${font.weight.semiBold};
  }

  ul {
    margin: 0.5rem 0 1rem 1.5rem;
    list-style-type: disc;
  }

  button {
    font-family: ${font.family.miloOT};
    font-size: 16px;
  }

  dl {
    display: flex;
    flex-wrap: wrap;

    dt {
      width: 50%;
    }
    dd {
      width: 50%;
      margin-left: auto;
    }
  }

  hr {
    margin: 1.5rem 0;
    border: 0;
    border-top: 2px solid ${colors.primary};
  }
`;
