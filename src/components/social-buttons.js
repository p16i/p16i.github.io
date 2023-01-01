import React from "react";


import EmailIcon from "../images/icons/email.svg"
import GithubIcon from "../images/icons/github.svg"
import GScholarIcon from "../images/icons/google-scholar.svg"

import OutLink from "./outlink";

const Icon = ({src, link}) => <OutLink href={link}><img alt="some icon" css={{marginBottom: 0, width: "30px"}} src={src}/></OutLink>

const SocialIcons = () => {
    return <div css={{textAlign: "center"}}>
        <Icon link="mailto:p.[surname]@tu-berlin.de" src={EmailIcon}/>
        <Icon link="http://github.com/p16i" src={GithubIcon}/>
        <Icon link="https://scholar.google.co.th/citations?user=XFcgz7cAAAAJ&hl=en" src={GScholarIcon}/>
    </div>
}

export default SocialIcons