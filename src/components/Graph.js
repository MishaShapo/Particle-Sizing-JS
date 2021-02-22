import React from "react"
import useCanvas from "../utils/useCanvas"

const Graph = props => {
  const { draw, options } = props
  const canvasRef = useCanvas(draw, options)
  return (
    <div
      style={{
        backgroundColor: "red",
        width: "40%",
        paddingTop: "22.5%",
        position: "relative",
      }}
    >
      <canvas
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
export default Graph
