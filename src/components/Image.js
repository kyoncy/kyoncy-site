import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

export default ({ filename }) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                sizes(maxWidth: 1200) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    `}

    render={(data) => {
      const image = data.images.edges.find(n => {
        return n.node.relativePath.includes(filename)
      })
      if (!image) return
      
      const imageSizes = image.node.childImageSharp.sizes
      return <img src={imageSizes.src} alt=''></img>
    }}
  />
)