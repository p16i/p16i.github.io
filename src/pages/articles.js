import React from "react"
import SEO from "../components/seo";
import Layout from "../components/layout";

import { useStaticQuery, graphql } from "gatsby"
import OutLink from "../components/outlink";

const Blog = () => {

  const { allBlogYaml } = useStaticQuery(
    graphql`
      query 
        {
          allBlogYaml(
            sort: { fields: [published_date], order: DESC }
          ) {
            edges {
              node {
                title
                url
                published_date
              }
            }
          }
        }
    `
  )

  const articles = allBlogYaml.edges.map(n => {
    return {
        ...n.node, 
        year: n.node.published_date.split("/")[0]
    }
  })
  const years = Array.from(new Set(articles.map(a => a.year)))

  return <Layout>
    <SEO title="Articles"/>
    <h1>Articles</h1>
        {
            years.map(y => {
                return <div css={{margin: "40px 0"}}>
                <h2 css={{marginBottom: "10px"}}>{y}</h2>
                <ul css={{margin: "0"}}>{
                    articles.filter(a => a.year === y)
                    .map(a => {
                        return <li css={{listStyle: "none", padding: "0", margin: "0"}}>
                            <OutLink href={a.url}>{a.title}</OutLink>
                        </li>
                    })
                }
                </ul>
                </div>
            })
        }
  </Layout>
}

export default Blog