const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const inputColor = document.querySelector(".input__color")
const tools = document.querySelectorAll(".button__tool")
const sizeButtons = document.querySelectorAll(".button__size")
const buttonClear = document.querySelector(".button__clear")
const shapeButtons = document.querySelectorAll(".button__shape")  // Novo

let brushSize = 20
let isPainting = false
let activeTool = "brush"
let activeShape = null  // Novo

inputColor.addEventListener("change", ({ target }) => {
    ctx.fillStyle = target.value
})

canvas.addEventListener("mousedown", function(event){
    isPainting = true

    if (activeShape) {
        drawShape(event.clientX, event.clientY)
    } else {
        if (activeTool == "brush") {
            draw(event.clientX, event.clientY)
        }

        if (activeTool == "rubber") {
            erase(event.clientX, event.clientY)
        }
    }
})

canvas.addEventListener("mousemove", function(event){
    if (isPainting) {
        if (activeShape) {
            drawShape(event.clientX, event.clientY)
        } else {
            if (activeTool == "brush") {
                draw(event.clientX, event.clientY)
            }

            if (activeTool == "rubber") {
                erase(event.clientX, event.clientY)
            }
        }
    }
})

canvas.addEventListener("mouseup", function(event){
    isPainting = false
})

const draw = (x, y) => {
    ctx.globalCompositeOperation = "source-over"
    ctx.beginPath()
    ctx.arc(
        x - canvas.offsetLeft,
        y - canvas.offsetTop,
        brushSize / 2,
        0,
        2 * Math.PI
    )
    ctx.fill()
}

const erase = (x, y) => {
    ctx.globalCompositeOperation = "destination-out"
    ctx.beginPath()
    ctx.arc(
        x - canvas.offsetLeft,
        y - canvas.offsetTop,
        brushSize / 2,
        0,
        2 * Math.PI
    )
    ctx.fill()
}

const drawShape = (x, y) => {
    // Implemente aqui a lógica para desenhar as formas (quadrado, círculo, retângulo)
    if (activeShape === "square") {
        // Desenhar quadrado
    } else if (activeShape === "circle") {
        // Desenhar círculo
    } else if (activeShape === "rectangle") {
        // Desenhar retângulo
    }
}

const selectTool = ({ target }) => {
    const selectedTool = target.closest("button")
    const action = selectedTool.getAttribute("data-action")

    if (action) {
        tools.forEach((tool) => tool.classList.remove("active"))
        selectedTool.classList.add("active")
        activeTool = action
    }
}

const selectSize = ({ target }) => {
    const selectedTool = target.closest("button")
    const size = selectedTool.getAttribute("data-size")

    sizeButtons.forEach((tool) => tool.classList.remove("active"))
    selectedTool.classList.add("active")
    brushSize = size
}

const selectShape = ({ target }) => {
    const selectedShape = target.closest("button")
    const shape = selectedShape.getAttribute("data-shape")

    shapeButtons.forEach((button) => button.classList.remove("active"))
    selectedShape.classList.add("active")
    activeShape = shape
}

tools.forEach((tool) => {
    tool.addEventListener("click", selectTool)
})

sizeButtons.forEach((button) => {
    button.addEventListener("click", selectSize)
})

shapeButtons.forEach((button) => {
    button.addEventListener("click", selectShape)
})

buttonClear.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})
