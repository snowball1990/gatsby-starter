import React from "react"
import { Link } from "gatsby"
import PrimaryButton from "../components/Button"

const IndexPage = () => (
  <div style={{color: "purple",fontSize: `36px`}}>
    <h1>Hello Gatsby!</h1>
    <p>What a world.</p>
    {false && <img src="https://source.unsplash.com/random/600x400" alt="" />}
    <Link to="/contact/">
      <PrimaryButton text="contact" />
    </Link> 
  </div>
)

export default IndexPage