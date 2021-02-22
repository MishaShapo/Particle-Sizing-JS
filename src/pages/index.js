import React from "react"
import { Helmet } from "react-helmet"
import { withPrefix } from "gatsby"
import { Button, Divider, Grid } from "@material-ui/core"
import Graph from "../components/Graph"

const originalGraphId = "originalGraphId"
const cleanGraphId = "cleanGraphId"

export default class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = { imgPath: "" }
    this.srcOnChange = this.srcOnChange.bind(this)
  }

  srcOnChange(e) {
    e.persist()
    console.log("event:", e)
    this.setState(state => ({
      imgPath: e.target.files[0],
    }))
  }

  render() {
    return (
      <div>
        <Helmet>
          <script async src={withPrefix("opencv.js")} type="text/javascript" />
        </Helmet>
        <ol>
          <li>Please choose an input image: </li>
          <li>
            <Button variant="contained" component="label">
              Upload File
              <input
                type="file"
                id="fileInput"
                name="file"
                onChange={this.srcOnChange}
              />
            </Button>
          </li>
          <li>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <p>
                Please highlight the scale area with your mouse and press done.
              </p>
              <Button>Done</Button>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <InputGraph options={{ imgPath: this.state.imgPath }} />
              <Divider orientation="vertical" flexItem variant="middle" />
              <OutputGraph id={cleanGraphId} draw={() => {}} />
            </Grid>
          </li>
          <li>The area of the particle is: </li>
          <li>Select a new image.</li>
        </ol>
      </div>
    )
  }
}
