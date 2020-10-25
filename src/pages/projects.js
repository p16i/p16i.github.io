import React, {useState} from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { DESKTOP_MIN_WIDTH, media } from "../shared/style"


import { useStaticQuery, graphql } from "gatsby"
import Project from "../components/project";

const options = [
  {
    name: "All",
    value: "all",
  },
  {
    name: "Selected",
    value: "selected",
    desc: "These are notable projects that I have developed."
  },
  {
    name: "Code for Thailand",
    value: "codeforthailand",
    desc: "These are civic tech projects that I have helped develop to tackle particular (technological) problems that we encounter in Thailand. One of the reasons I participate in this campaign is that I would like to promote opensource culture in the country as well as using technlogy for social goods."
  },
  {
    name: "Other",
    value: "other",
    desc: "Experimental or freetime hacking projects. They were either playing with new technologies and frameworks, or testing ideas."
  }
]

const descritions = {}
options.forEach(o => descritions[o.value] = o.desc)

const Projects = () => {
  const { allProjectsYaml } = useStaticQuery(
    graphql`
      query 
        {
          allProjectsYaml(sort: {fields: date, order: DESC}) {
            edges {
              node {
                title
                date
                tags
                image
                urls {
                  name
                  url
                }
                desc
              }
            }
          }
        }
    `
  )

  const [filter, setFilter] = useState(options[0].value);
  const projects = allProjectsYaml.edges.filter( x => {
    if (filter === "all"){
      return true
    } else {
      return x.node.tags.find(t => t === filter) === filter
    }
  })


  return <Layout>
    <SEO title="Projects" />
    <h1>Projects ({projects.length})</h1>
      <div
        css={{
          textAlign: "center",
          marginBottom: "30px",
          [media(DESKTOP_MIN_WIDTH)]: {
            textAlign: "right"
          }
        }}
      >
        <b>Filter: </b>
        <select onChange={e => setFilter(e.target.value)}>
          {
            options.map(o => {
              return <option key={o.value} value={o.value} selected={filter === o.value}>{o.name}</option>
            })
          }
        </select>
        <div css={{textAlign: "left", margin: "10px 0" }}>
            {descritions[filter]}
        </div>
      </div>
      <div>
        {
          projects.map(p => <Project key={p.node.title} details={p.node}/>)
        }
      </div>
  </Layout>
}

export default Projects
