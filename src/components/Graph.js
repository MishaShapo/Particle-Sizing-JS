import useCanvas from "../utils/useCanvas"

const resizeCanvas = canvas => {
  const { width, height } = canvas.getBoundingClientRect()

  if (canvas.width !== width || canvas.height !== height) {
    const { devicePixelRatio: ratio = 1 } = window
    const context = canvas.getContext("2d")
    canvas.width = width * ratio
    canvas.height = height * ratio
    context.scale(ratio, ratio)
    return true
  }

  return false
}

const _predraw = context => {
  context.save()
  resizeCanvas(context, canvas)
  const { width, height } = context.canvas
  context.clearRect(0, 0, width, height)
}
const _postdraw = () => {
  index++
  ctx.restore()
}

const Graph = props => {
  const { draw, predraw = _predraw, postdraw = _postdraw } = props
  const canvasRef = useCanvas(draw, { predraw, postdraw })
  return <canvas ref={canvasRef} {...rest} />
}
export default Graph
