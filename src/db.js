import { graphql } from "gatsby"

const allProjectsQuery = 
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
              }
            }
          }
        }
      
    `

export { allProjectsQuery, }
