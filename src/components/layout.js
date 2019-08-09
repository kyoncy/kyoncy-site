import React from "react"
import { Link } from "gatsby"
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import '../styles/code-block.css'

import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.0),
            marginBottom: rhythm(1.0),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h1
          style={{
            fontFamily: `Hiragino Kaku Gothic ProN, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          marginTop: '10px',
          marginBottom: '10px',
          maxWidth: rhythm(30),
          padding: `${rhythm(1.5)} ${rhythm(1.3)}`,
          backgroundColor: 'whitesmoke',
          borderRadius: '30px',
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()} kyoncy
        </footer>
      </div>
    )
  }
}

export default Layout
