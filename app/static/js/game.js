function draw_table(){
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");

  ctx.beginPath()
  ctx.ellipse(500, 250, 400, 200, 0, 0, 2 * Math.PI)
  ctx.stroke()
}


//RUNNING CODE
draw_table()