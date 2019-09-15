import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from '../components/Image'

import kebabCase from "lodash/kebabCase"
import { rhythm } from "../utils/typography"
import styles from '../styles/index.scss';

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="記事の一覧" image={'ogp.png'} />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <div className={styles.blogPost}>
                <Image filename={node.frontmatter.relativePath || 'ogp.png'} />
                <div>
                {node.frontmatter.tags.map((tag) => {
                  return (
                    <span>
                      <a href={`/tags/${kebabCase(tag)}/`} style={{ padding: '2px 5px', backgroundColor: 'lightblue', borderRadius: '5px', textDecoration: 'none', color: 'black' }}>
                        #{tag}
                      </a>{' '}
                    </span>
                  )
                })}
                <small>{node.frontmatter.date} </small>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
                </div>
              </div>
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
            relativePath
          }
        }
      }
    }
  }
`
