import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo";

import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Slugger from 'github-slugger'


import  CollapsableBlock  from "../components/collapsable-block"



import { DESKTOP_MIN_WIDTH, media } from "../shared/style"

require(`katex/dist/katex.min.css`)

const shortcodes = { CollapsableBlock }

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  console.log(data)

  console.log(data.frontmatter)
  const {frontmatter, body, headings} = data.mdx
  const slugger = new Slugger()

  return <Layout>
    <SEO title={`Blog - ${frontmatter.title}`}/>
    <h1 css={{marginBottom: `0px`}}>{frontmatter.title}</h1>
    <div
      css={{
        width:  `100%`,
        // [media(DESKTOP_MIN_WIDTH)]: {
        //   width: `600px`,
        // }
      }}
    >
       <div css={{
            fontSize: "0.8em",
            // background: `#eee`,
            padding: `10px 0px`,
            borderBottom: `1px solid black`,
            color: "#888"
       }}
       >
        <b>{frontmatter.date}</b><br/>
        <b>Table of Content</b>
          <ul css={{marginBottom: 0}}>
            {headings.map( (h, i) => {
                return <li key={h.value} css={{marginLeft: 50 * (h.depth - 2), marginBottom: 0}}>
                  <a href={`#${slugger.slug(h.value)}`}>{h.value}</a>
                </li>
            })}
          </ul>
       </div>

      <MDXProvider components={shortcodes}>
        <div
          css={{marginTop: "25px"}}
          className="blog-post-content"
        >
          <MDXRenderer>
            {body}
          </MDXRenderer>
        </div>
      </MDXProvider>
    </div>
  </Layout>
}
export const pageQuery = graphql`
  query MDXQuery($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      id
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
      tableOfContents(
        maxDepth: 3
      )
      headings {
        depth
        value
      }
    }
  }
`