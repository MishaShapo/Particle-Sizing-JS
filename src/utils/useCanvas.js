import { useRef, useEffect } from "react"

const resizeCanvas = (context, canvas) => {
  const { width, height } = canvas.getBoundingClientRect()

  if (canvas.width !== width || canvas.height !== height) {
    const { devicePixelRatio: ratio = 1 } = window
    canvas.width = width * ratio
    canvas.height = height * ratio
    context.scale(ratio, ratio)
    return true
  }

  return false
}

const _predraw = context => {
  context.save()
  resizeCanvas(context, context.canvas)
  const { clientWidth, clientHeight } = context.canvas
  context.clearRect(0, 0, clientWidth, clientHeight)
}
const _postdraw = context => {
  context.restore()
}

const useCanvas = (draw, options = {}) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext(options.context || "2d")
    _predraw(context)
    draw(context, options)
    _postdraw(context)
  }, [draw, options])
  return canvasRef
}
export default useCanvas
