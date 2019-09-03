import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"


import { useStaticQuery, graphql } from "gatsby"
import Project from "../components/project";

const Projects = () => {
  const { allProjectsYaml } = useStaticQuery(
    graphql`
      query 
        {
          allProjectsYaml {
            edges {
              node {
                title
                date
                tags
                image
                code_url
                url
                desc
              }
            }
          }
        }
    `
  )

  const projects = allProjectsYaml.edges

  return <Layout>
    <SEO title="Projects" />
    <h1>Projects ({projects.length})</h1>
      <div>
        {
          projects.map(p => <Project key={p.node.title} details={p.node}/>)
        }
      </div>
  </Layout>
}

export default Projects
