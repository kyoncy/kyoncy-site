import React from "react"
import Bio from "../components/bio"
import Layout from "../components/layout"
import kebabCase from "lodash/kebabCase"
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"

class TagsPage extends React.Component {
  render() {
    const { group } = this.props.data.allMarkdownRemark;
    const { title } = this.props.data.site.siteMetadata;
    
    return(
      <Layout location={this.props.location} title={title}>
        <Bio />
        <div>
          <Helmet title={title} />
          <div>
            <h1>Tags</h1>
            <ul>
              {group.map(tag => (
                <li key={tag.fieldValue}>
                  <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                    {tag.fieldValue} ({tag.totalCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
