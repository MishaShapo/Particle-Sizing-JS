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

    this.imgEl = React.createRef()

    this.srcOnChange = this.srcOnChange.bind(this)
    this.imgOnLoad = this.imgOnLoad.bind(this)
  }

  srcOnChange(e) {
    e.preventDefault()
    e.persist()
    console.log("event:", e)
    this.setState(state => ({
      imgPath: e.target.files[0],
    }))
  }

  imgOnLoad(e) {
    let mat = window.cv.imread(this.imgEl.current)
    window.cv.imshow("canvasOutput", mat)
    mat.delete()
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
              justify="space-evenly"
              alignItems="center"
            >
              <Graph
                id={originalGraphId}
                draw={(context, { imgPath }) => {
                  console.log("draw called")
                  if (!imgPath) {
                    return
                  }
                  var img = new Image()
                  var reader = new FileReader()

                  reader.onload = event => {
                    img.src = reader.result
                  }

                  img.onload = event => {
                    let cw = context.canvas.clientWidth,
                      ch = context.canvas.clientHeight,
                      iw = img.width,
                      ih = img.height

                    var scale = Math.min(cw / iw, ch / ih)

                    // get the top left position of the image
                    var x = cw / 2 - (iw / 2) * scale
                    var y = ch / 2 - (ih / 2) * scale

                    console.log(
                      `cw: ${cw}. ch ${ch}. iw: ${iw}. ih: ${ih}. scale: ${scale}. x:${x}. y:${y}`
                    )
                    context.drawImage(
                      img,
                      x,
                      y,
                      img.width * scale,
                      img.height * scale
                    )
                  }
                  reader.readAsDataURL(imgPath)
                }}
                options={{ imgPath: this.state.imgPath }}
              />
              <Divider orientation="vertical" flexItem />
              <Graph id={cleanGraphId} draw={() => {}} />
            </Grid>
          </li>
          <li>The area of the particle is: </li>
          <li>Select a new image.</li>
        </ol>
      </div>
    )
  }
}
