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
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
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
          }}
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      </Link>
      <p>
        新卒1年目の {author}🐧 です。<a href={`https://code.or.jp`} target={'_blank'}>みんなのコード</a>で働いてます。
        <a href={`https://twitter.com/${social.twitter}`} target={'_blank'}>Twitter</a>
        {`, `}
        <a href={`https://facebook.com/${social.facebook}`} target={'_blank'}>Facebook</a>
        やってます。React, Blockly, Renovate, CircleCIが好き。Typescriptがっつり書きたいので機会模索中。土日は開発したり本を読んでます。開発したすぎてブログ書くよりレイアウト変えてる。経歴とかは<a href={`https://www.wantedly.com/users/83876160`} target={'_blank'}>Wantedly</a>に記載してます。
      </p>
    </div>
  )
}

export default Bio
