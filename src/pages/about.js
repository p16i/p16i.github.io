import React from "react"
import SEO from "../components/seo";
import Layout from "../components/layout";

import IconBosna from "../images/icons/sc-bosna-berlin.png"
import IconRotation from "../images/icons/sg-rotation-prenzlauer-berg.png"
import IconPusphaira from "../images/icons/pusphaira.png"
import OutLink from "../components/outlink";

import { DESKTOP_MIN_WIDTH, media } from "../shared/style"

const images = [
    "https://farm9.staticflickr.com/8697/16360574173_ca64f9295f_m.jpg",
    "https://farm9.staticflickr.com/8544/28466959421_24ea695cd9_m.jpg",
    "https://farm9.staticflickr.com/8718/16879877618_411b928176_o.jpg",
    "https://farm5.staticflickr.com/4600/38167324035_ec6a32d785_m.jpg",
    "https://farm2.staticflickr.com/1848/44531598421_6c67af8708_o.jpg",
    "https://farm2.staticflickr.com/1883/43622328565_0cfebce305_o.jpg",
    "https://farm2.staticflickr.com/1891/43622330395_b4f3bf4ff4_o.jpg",
    "https://farm2.staticflickr.com/1699/25144471672_539606bc1f_o.jpg",
    "https://farm1.staticflickr.com/823/42258114941_cbf8ce299b_o.jpg",
    "https://farm5.staticflickr.com/4463/37421692286_ec9af1ed7f_o.jpg",
]

const Header = ({children}) => {
    return <h3 css={{marginBottom: "20px"}}>
        {children}
    </h3>
}

const TeamIcon = ({icon}) => {
    return <img alt="team icon" css={{width: "50px", verticalAlign: "middle", marginBottom: "0px", paddingRight: "5px"}} src={icon}/>
}

const About = () => {
  return <Layout>
    <SEO title="About"/>
    <Header>Other interests</Header>
    <p>
    <b>Football</b> is my favourite sport. I've been playing since a young age.
    Although I came to Europe for my study, I still play football there. These are clubs
    that I've played with:
    <ul css={{listStyle: "none"}}>
        <li>
            <TeamIcon icon={IconBosna}/><OutLink href="http://www.fussball.de/verein/sc-bosna-berlin-berlin/-/id/01OE5U5FUG000000VV0AG80NVUVDNPJM">SC Bosna Berlin</OutLink>, Germany: Berlin's Keisliga C 2018/19
        </li>
        <li>
            <TeamIcon icon={IconRotation}/><OutLink href="">SG Rotitaion Prenzlauer</OutLink>, Berlin Germany: Freizeitliga 2017/2018
        </li>
        <li>
            <TeamIcon icon={IconPusphaira}/><OutLink href="">Pusphaira 6</OutLink>, Eindhoven, the Netherlands: Sunday Leaguage 2015/2016
        </li>
    </ul>
    </p>
    <p>
        I also enjoy <b>Photography</b>, mostly taking b/w photos. Theses are some of my photos.
        More can been seen on my Instagram: <OutLink href="https://www.instagram.com/heytitle/">@heytitle</OutLink>.
    </p>
    <div>
        {
            images.map( (src, i) => {
                return <img alt={`something ${i}`} src={src} css={{
                    float: "left",
                    marginBottom: "0",
                    height: "80px",
                    [media(DESKTOP_MIN_WIDTH)]: {
                        height: "150px",
                    }
                }}
                />
            })
        }
        <div css={{clear: "both"}}></div>
    </div>
  </Layout>
}

export default About