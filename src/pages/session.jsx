import React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout"
import Timer from "../components/Timer"

const Session = ({ location }) => {
  return (
    <Layout>
      {location.state ? (
        <Timer settings={location.state} />
      ) : (
        `Go to ${(<Link to="/settings">settings</Link>)}`
      )}
    </Layout>
  )
}

export default Session
