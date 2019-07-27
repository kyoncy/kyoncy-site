import React from "react"
import Layout from "../components/layout"
import Bio from "../components/bio"
import { Link, graphql } from "gatsby"

class Tags extends React.Component {
  render() {
    const { tag } = this.props.pageContext
    const { edges } = this.props.data.allMarkdownRemark
    const { title } = this.props.data.site.siteMetadata
    const tagHeader = `"${tag}"ってタグ`

    return (
      <Layout location={this.props.location} title={title}>
        <Bio />
        <div>
          <h2>{tagHeader}</h2>
          <ul>
            {edges.map(({ node }) => {
              const { slug } = node.fields
              const { title } = node.frontmatter
              return (
                <li key={slug}>
                  <Link to={slug}>{title}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      </Layout>
    )
  }
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
