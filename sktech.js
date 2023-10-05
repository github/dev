function setup() {
    createCanvas(500, 500);
    background(" pink");
  }
  
  function draw() {
    
  
    stroke("purple");
    fill("blue");
  
    // console.log (mouseIsPressed);
  
    if (mouseIsPressed) {
      rect(mouseX, mouseY, 30, 45);
    }    
  }