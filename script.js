document.getElementById("imageUpload").addEventListener("change", function(event) {
    let file = event.target.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            processImage(e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// Process image on button click
document.getElementById("processButton").addEventListener("click", function() {
    if (uploadedImage) {
            processImage(uploadedImage);
                } else {
                        alert("Please upload an image first!");
                            }
                            });

function processImage(imageData) {
    let img = new Image();
    img.src = imageData;
    img.onload = function() {
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        Tesseract.recognize(
            canvas,
            'eng',
            {
                logger: m => console.log(m)
            }
        ).then(({ data: { text } }) => {
            document.getElementById("outputText").value = text;
        });
    };
}

// Download PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();
    let text = document.getElementById("outputText").value;
    doc.text(text, 10, 10);
    doc.save("digitized_notes.pdf");
}

// Download Image
function downloadImage() {
    let text = document.getElementById("outputText").value;
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 200;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText(text, 10, 30);
    let link = document.createElement("a");
    link.download = "digitized_notes.png";
    link.href = canvas.toDataURL();
    link.click();
}

// Download EPUB
function downloadEPUB() {
    let text = document.getElementById("outputText").value;
    let blob = new Blob([text], { type: "application/epub+zip" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "digitized_notes.epub";
    link.click();
}

// Bouncing Ball Animation
const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");
let balls = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        }

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

// Create Random Balls
for (let i = 0; i < 10; i++) {
    balls.push({
            x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                            vx: (Math.random() - 0.5) * 4,
                                    vy: (Math.random() - 0.5) * 4,
                                            radius: Math.random() * 15 + 5,
                                                    color: `hsl(${Math.random() * 360}, 100%, 60%)`
                                                        });
                                                        }
// Animate Balls
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
        
            balls.forEach(ball => {
                    ball.x += ball.vx;
                            ball.y += ball.vy;

                                    // Bounce off walls
                                            if (ball.x < 0 || ball.x > canvas.width) ball.vx *= -1;
                                                    if (ball.y < 0 || ball.y > canvas.height) ball.vy *= -1;

// Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
                                    });

                                        requestAnimationFrame(animate);
                                        }
                                        animate(); 
