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

const drawBoundingBox = (context,startPos, endPos, dragging) {

}

const useCanvas = (draw, options = {}) => {
  const canvasRef = useRef(null)
  const [startPos, setStartPos] = useState(null)
  const [endPos, setEndPos] = useState(null)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext(options.context || "2d")
    _predraw(context)
    draw(context, options)
    _postdraw(context)
  }, [draw, options])

  useEffect(() => {
    const canvas = canvasRef.current

    function mouseDown(e) {
      const { x, y } = canvas.getBoundingClientRect()
      if (dragging) {
        setDragging(false)
        setEndPos({ x: e.clientX - x, y: e.clientY - y })
        canvas.style.cursor = "default"
      } else {
        setDragging(true)
        setStartPos({ x: e.clientX - x, y: e.clientY - y })
        canvas.style.cursor = "crosshair"
      }
    }

    function mouseMove(e) {
      if (dragging) {
        setEndPos({ x: e.clientX - x, y: e.clientY - y })
      }
    }

    canvas.addEventListener("mousedown", mouseDown)
    canvas.addEventListener("mousemove", mouseMove)
    return () => {
      canvas.removeEventListener("mousedown", mouseDown)
      canvas.removeEventListener("mousemove", mouseMove)
    }
  })

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext(options.context || "2d")

    if (dragging) {
      let timerId

      const f = () => {
        drawBoundingBox(context, startPos,endPos)
        timerId = requestAnimationFrame(f)
      }

      timerId = requestAnimationFrame(f)

      return () => cancelAnimationFrame(timerId)
    }
  }, [dragging])

  return canvasRef
}
export default useCanvas
