function draw_table(){
  ctx.beginPath() //table
  ctx.ellipse(500, 220, 400, 200, 0, 0, 2 * Math.PI)
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(75, 425, 50, 0, Math.PI * 2, true);
  ctx.fillStyle = "#A3F0A3";
  ctx.fill()
}

function change_button(){
  ctx.beginPath()
  ctx.arc(75, 425, 50, 0, Math.PI * 2, true);
  ctx.fillStyle = "green";
  ctx.fill()
}


//RUNNING CODE

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

draw_table()

canvas.addEventListener('click', function(event) {
  console.log(event.clientX, event.clientY)
})

canvas.addEventListener('mouseover', function(event) {
  console.log("mouseover " + event.clientX, event.clientY)
  change_button()
})

