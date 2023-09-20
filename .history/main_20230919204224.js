const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const inputColor = document.querySelector(".input__color");
const tools = document.querySelectorAll(".button__tool");
const sizeButtons = document.querySelectorAll(".button__size");
const buttonClear = document.querySelector(".button__clear");
const shapeButtons = document.querySelectorAll(".button__shape");

let brushSize = 20;
let isPainting = false;
let activeTool = "brush";
let activeShape = null;

inputColor.addEventListener("change", ({ target }) => {
    ctx.fillStyle = target.value
});

// Adiciona a função drawShape()
const drawShape = (x, y, shape) => {
  const ctx = canvas.getContext("2d");

  ctx.beginPath();
  switch (shape) {
    case "square":
      ctx.rect(x - canvas.offsetLeft - brushSize / 2, y - canvas.offsetTop - brushSize / 2, brushSize, brushSize);
      break;
    case "circle":
      ctx.arc(x - canvas.offsetLeft, y - canvas.offsetTop, brushSize / 2, 0, 2 * Math.PI);
      break;
    case "rectangle":
      ctx.rect(x - canvas.offsetLeft, y - canvas.offsetTop, brushSize, brushSize);
      break;
  }
  ctx.fill();
};

// Atualiza o botão "quadrado"
const squareButton = document.querySelector("[data-shape='square']");
squareButton.addEventListener("click", () => {
  // Desenha um quadrado na posição do mouse
  drawShape(mouseX, mouseY, "square");
});

// Adiciona a função drawSquare() ao evento mousedown() do canvas
canvas.addEventListener("mousedown", function(event){
  isPainting = true

  if (activeShape === "square") {
    // Desenha um quadrado na posição do mouse
    drawShape(event.clientX, event.clientY, "square");
  } else if (activeTool == "brush") {
    draw(event.clientX, event.clientY)
  }

  if (activeTool == "rubber") {
    erase(event.clientX, event.clientY)
  }
});

// Atualiza as outras funções
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
