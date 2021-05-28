import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo";

import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"


import  CollapsableBlock  from "../components/collapsable-block"
import ApplauseButton from "../components/applause-button"



import { DESKTOP_MIN_WIDTH, media } from "../shared/style"

require(`katex/dist/katex.min.css`)

const shortcodes = { CollapsableBlock, ApplauseButton }

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  console.log(data)

  return <div>
    <MDXProvider components={shortcodes}>
      <h1>drr!</h1>
      <MDXRenderer>
        {data.mdx.body}
      </MDXRenderer>
    </MDXProvider>
  </div>

  // const { markdownRemark } = data // data.markdownRemark holds your post data
  // const { frontmatter, html, tableOfContents } = markdownRemark

  // return <MDXProvider components={shortcodes}>
  //   <Layout>
  //   <SEO title={`Blog - ${frontmatter.title}`}/>
  //   <h1>{frontmatter.title}</h1>
  //   <b>{frontmatter.date}</b>
  //   <div
  //     css={{
  //       width:  `100%`,
  //       [media(DESKTOP_MIN_WIDTH)]: {
  //         width: `600px`,
  //       }
  //     }}
  //   >
  //     <div css={{
  //           display: "none",
  //           [media(DESKTOP_MIN_WIDTH)]: {
  //             fontSize: "0.8em",
  //             background: "white",
  //             display: "block",
  //             position: "absolute",
  //             top: "150px",
  //             left: "calc(50% + 150px)",
  //             borderLeft: "2px solid black",
  //             padding: "10px",
  //             maxWidth: "300px",
  //             listStyle: "none",
  //             "& li":{
  //               lineHeight: "1.2em",
  //               listStyle: "none",
  //               marginBottom: "5px",
  //               "& p": {
  //                 marginBottom: 0,
  //               }
  //             },
  //             "& ul": {
  //               marginLeft: 10,
  //               marginTop: 0,
  //             }
  //           }
  //     }}
  //     >
  //       <b>{frontmatter.title}</b>
  //       <div dangerouslySetInnerHTML={{__html: tableOfContents}}/>
  //     </div>
  //     <div
  //       css={{marginTop: "50px"}}
  //       className="blog-post-content"
  //       dangerouslySetInnerHTML={{ __html: html }}
  //     />
  //   </div>
  // </Layout>
  // </MDXProvider>
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
    }
  }
`
      // html
      // headings {
      //   value
      //   depth
      // }
      // tableOfContents(
      //   absolute: false 
      //   pathToSlugField: "frontmatter.path"
      //   maxDepth: 3
      // )