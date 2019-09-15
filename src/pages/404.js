import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const siteUrl = data.site.siteMetadata.siteUrl

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="404: Not Found" image={'ogp.png'} />
        <h1>Not Found</h1>
        <a href={siteUrl}>{siteUrl}</a>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`
