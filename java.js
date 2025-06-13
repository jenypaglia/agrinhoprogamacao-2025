// variáveis
let img;
let gameState = "menu";
let scaleFactor = 1;
let growing = true;

// Posição e dimensões dos botões
let startButton = { x: 755, y: 475, w: 100, h: 60 };
let siteButton = { x: 755, y: 300, w: 100, h: 60 };

function preload(){
  img = loadImage("menu.jpg"); //imagem gerada por chat gpt I.A; comando "gere a imagem de uma fazenda em pixels" 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
}

function draw() {
  if (gameState === "menu") {
    background(img);
    image(img, 0, 0, width, height);

    drawButton(siteButton, "SITE");//gera o botão de "site";
    drawButton(startButton, "START");//gera o botão "start";

    // animação de pulsar
    if (growing) {
      scaleFactor += 0.02;
      if (scaleFactor >= 1.2) growing = false;
    } else {
      scaleFactor -= 0.01;
      if (scaleFactor <= 0.98) growing = true;
    }

  } else if (gameState === "site") {
    background(img);
    fill(255);
    textSize(32);
    text("Jogo Iniciado!", width / 2, height / 2);
  }
}

function drawButton(btn, label) {
  push();
  translate(btn.x, btn.y);
  scale(scaleFactor);
  fill(255, 0, 0);
  noStroke();
  rect(0, 0, btn.w, btn.h, 10);
  fill(255);
  textSize(20);
  text(label, 0, 0);
  pop();
}

function mousePressed() {
  // Corrige a detecção com escala
  let s = scaleFactor;

  if (gameState === "menu") {
    // botão SITE
    if (dist(mouseX, mouseY, siteButton.x, siteButton.y) < (siteButton.w / 2) * s) {
      window.open("https://editor.p5js.org/jenyffer.paglia.silva/full/v0-u7VZoG", "_blank");
    }

    // botão START
    if (
      mouseX > startButton.x - (startButton.w / 2) * s &&
      mouseX < startButton.x + (startButton.w / 2) * s &&
      mouseY > startButton.y - (startButton.h / 2) * s &&
      mouseY < startButton.y + (startButton.h / 2) * s
    ) {
      gameState = "site";
    }
  }
}
