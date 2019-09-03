import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"


import { useStaticQuery } from "gatsby"
import { allProjectsQuery } from "../db"
import Project from "../components/project";

const Projects = () => {
  const { allProjectsYaml } = useStaticQuery(allProjectsQuery)

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
