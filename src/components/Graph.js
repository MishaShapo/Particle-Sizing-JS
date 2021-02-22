import React, { useEffect } from "react"
import useCanvas from "../utils/useCanvas"

const Graph = props => {
  const { options, canvasId } = props
  const canvasRef = useCanvas(drawImage, options)

  return (
    <div
      style={{
        backgroundColor: "red",
        width: "45%",
        paddingTop: "30%",
        position: "relative",
      }}
    >
      <canvas
        id={canvasId}
        ref={canvasRef}
        style={{
          background: "#c0c0c0",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
    </div>
  )
}

function drawImage(context, { imgPath }) {
  console.log("drawImage called")
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

    context.drawImage(img, x, y, img.width * scale, img.height * scale)
    this.imgMat = cv.imread(this.canvasId)
  }
  reader.readAsDataURL(imgPath)
}

export default Graph
