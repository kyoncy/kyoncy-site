/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/penguin.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
            facebook
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(0.5),
      }}
    >
      <Link to="/">
        <Image
          fixed={data.avatar.childImageSharp.fixed}
          alt={author}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            minWidth: 50,
            borderRadius: `100%`,
            border: "1px solid lightgray"
          }}
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      </Link>
      <p>
        NPO法人みんなのコード → HiTTO株式会社(現職)でフロントエンド担当しています {author}🐧です。<br />
        <a href={`https://twitter.com/${social.twitter}`} target={'_blank'} rel="noreferrer">Twitter</a>
        {`, `}
        <a href={`https://zenn.dev/kyoncy`} target={'_blank'} rel="noreferrer">Zenn</a>
        やってます。React, TypeScript 書いてます。土日は開発したり読書したり都内を散歩してます。ボドゲにハマってるので欲が高まってます。
      </p>
    </div>
  )
}

export default Bio
