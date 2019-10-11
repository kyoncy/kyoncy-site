import React from "react"
import { Link } from "gatsby"
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import '../styles/code-block.css'
import styles from '../styles/layout.scss'

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
        className={styles.main}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          <div>
            <h4 style={{ paddingTop: '10px', marginBottom: '10px' }}>Githubの草情報</h4>
            <img src="https://grass-graph.moshimo.works/images/NagaoKyota.png?background=none"></img>
          </div>
          <div>
            © {new Date().getFullYear()} kyoncy
          </div>
        </footer>
      </div>
    )
  }
}

export default Layout
