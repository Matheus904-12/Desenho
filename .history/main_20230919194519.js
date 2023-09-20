// Seleciona o elemento canvas no HTML
const canvas = document.querySelector("canvas")

// Obtém o contexto de desenho 2D do canvas
const ctx = canvas.getContext("2d")

// Seleciona o elemento de entrada de cor
const inputColor = document.querySelector(".input__color")

// Seleciona todas as ferramentas
const tools = document.querySelectorAll(".button__tool")

// Seleciona os botões de tamanho
const sizeButtons = document.querySelectorAll(".button__size")

// Seleciona o botão de limpar
const buttonClear = document.querySelector(".button__clear")

// Tamanho inicial do pincel
let brushSize = 20

// Flag para indicar se estamos desenhando
let isPainting = false

// Ferramenta ativa inicial
let activeTool = "brush"

// Event listener para mudança de cor
inputColor.addEventListener("change", ({ target }) => {
    ctx.fillStyle = target.value
})

// Event listener para clique no canvas
canvas.addEventListener("mousedown", function(event){
    isPainting = true

    // Desenha ou apaga, dependendo da ferramenta ativa
    if (activeTool == "brush") {
        draw(event.clientX, event.clientY)
    }

    if (activeTool == "rubber") {
        erase(event.clientX, event.clientY)
    }
})

// Event listener para movimento do mouse sobre o canvas
canvas.addEventListener("mousemove", function(event){
    if (isPainting) {
        // Desenha ou apaga, dependendo da ferramenta ativa
        if (activeTool == "brush") {
            draw(event.clientX, event.clientY)
        }

        if (activeTool == "rubber") {
            erase(event.clientX, event.clientY)
        }
    }
})

// Event listener para soltar o botão do mouse
canvas.addEventListener("mouseup", function(event){
    isPainting = false
})

// Função para desenhar um círculo
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

// Função para apagar um círculo
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

// Função para selecionar uma ferramenta
const selectTool = ({ target }) => {
    const selectedTool = target.closest("button")
    const action = selectedTool.getAttribute("data-action")

    if (action) {
        tools.forEach((tool) => tool.classList.remove("active"))
        selectedTool.classList.add("active")
        activeTool = action
    }
}

// Função para selecionar um tamanho de pincel
const selectSize = ({ target }) => {
    const selectedTool = target.closest("button")
    const size = selectedTool.getAttribute("data-size")

    sizeButtons.forEach((tool) => tool.classList.remove("active"))
    selectedTool.classList.add("active")
    brushSize = size
}

// Adicionando event listeners para os botões e ferramentas
tools.forEach((tool) => {
    tool.addEventListener("click", selectTool)
})

sizeButtons.forEach((button) => {
    button.addEventListener("click", selectSize)
})

// Event listener para o botão de limpar
buttonClear.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

const shapeButtons = document.querySelectorAll(".button__shape")

let activeShape = null

const selectShape = ({ target }) => {
    const selectedShape = target.closest("button")
    const shape = selectedShape.getAttribute("data-shape")

    shapeButtons.forEach((button) => button.classList.remove("active"))
    selectedShape.classList.add("active")
    activeShape = shape
}

shapeButtons.forEach((button) => {
    button.addEventListener("click", selectShape)
})