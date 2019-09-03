import React from "react"

const Project = () => {
    return <div>
        <div css={{float: "left"}}>
        <img src="https://i.imgur.com/Pk8ffNC.png" width="200"/>
        </div>
        <div>
        <div css={{float: "left", paddingLeft: "20px", width: "calc(960px - 200px)"}}>
            <h3 css={{marginBottom: "10px"}}>Project 1</h3>
            <p>A pilot project that aims to collect what being discussed in each parliament meeting. Having this kind of data will allow us to build various tools and applications that individuals can easily engage or interact. Hence, they would be well informed about the country's situtaion and potentially make a better decision in next elections.</p>
            <div>
            Code URL Paper Github Stars
            </div>
        </div>
        </div>
        <div style={{clear: "both"}}></div>
    </div>
}

export default Project