function setup(){
  ctx.beginPath() //table
  ctx.ellipse(500, 220, 400, 200, 0, 0, 2 * Math.PI) //DRAWS POKER TABLE
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(75, 425, 50, 0, Math.PI * 2, true); //DRAWS BUTTON
  ctx.fillStyle = "#A3F0A3";
  ctx.fill()

  const poker_table = document.getElementById("poker_table")
  ctx.drawImage(poker_table, 10, 10, 80, 80)
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

setup()

canvas.addEventListener('click', function(event) {
  console.log(event.clientX, event.clientY)
  change_button()
})
