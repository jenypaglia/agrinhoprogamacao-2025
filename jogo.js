let solo = [];
let dinheiro = 10;
let sementes = 3;
let score = 0;
let clima = "sol";
let irrigacaoAutomatica = false;

function setup() {
  createCanvas(800, 500);

  // Inicialmente 5 canteiros
  for (let i = 0; i < 5; i++) {
    solo.push({ estado: "vazio", tempo: 0 });
  }

  // Clima alterna a cada 10 segundos
  setInterval(() => {
    clima = random(["sol", "chuva"]);
  }, 10000);

  // Botões
  createButton("🌱 Comprar Semente ($2)").position(10, 420).mousePressed(() => {
    if (dinheiro >= 2) {
      sementes++;
      dinheiro -= 2;
    }
  });

  createButton("🚿 Comprar Irrigação ($10)").position(160, 420).mousePressed(() => {
    if (dinheiro >= 10 && !irrigacaoAutomatica) {
      irrigacaoAutomatica = true;
      dinheiro -= 10;
    }
  });

  createButton("🧱 Comprar Canteiro ($8)").position(340, 420).mousePressed(() => {
    if (dinheiro >= 8) {
      solo.push({ estado: "vazio", tempo: 0 });
      dinheiro -= 8;
    }
  });
}

function draw() {
  background(clima === "sol" ? color(120, 200, 100) : color(100, 140, 200));

  // UI
  fill(255);
  textSize(16);
  text(`💰 Dinheiro: $${dinheiro}`, 10, 20);
  text(`🌱 Sementes: ${sementes}`, 10, 40);
  text(`⭐ Pontuação: ${score}`, 10, 60);
  text(`☁️ Clima: ${clima === "chuva" ? "Chuva ☔" : "Sol ☀️"}`, 10, 80);
  text(irrigacaoAutomatica ? "🚿 Irrigação automática ATIVA" : "🚿 Irrigação automática DESATIVADA", 10, 100);

  text("🖱️ Clique nos canteiros para plantar / regar / colher", 10, 470);

  // Canteiros dinâmicos
  for (let i = 0; i < solo.length; i++) {
    let x = 100 + (i % 6) * 110; // 6 por linha
    let y = 150 + floor(i / 6) * 110;

    fill(139, 69, 19);
    rect(x, y, 80, 80);

    let plant = solo[i];

    // Irrigação automática ou chuva
    if ((clima === "chuva" || irrigacaoAutomatica) && plant.estado === "plantado") {
      plant.estado = "regado";
      plant.tempo = 0;
    }

    // Crescimento
    if (plant.estado === "regado") {
      plant.tempo++;
      if (plant.tempo > 120) {
        plant.estado = "crescendo";
        plant.tempo = 0;
      }
    } else if (plant.estado === "crescendo") {
      plant.tempo++;
      if (plant.tempo > 180) {
        plant.estado = "pronto";
      }
    } else if (plant.estado === "plantado") {
      plant.tempo++;
      if (plant.tempo > 150) {
        plant.estado = "seco";
      }
    }

    // Plantas visuais
    if (plant.estado === "plantado") {
      fill(0, 150, 0);
      ellipse(x + 40, y + 40, 10, 20);
    } else if (plant.estado === "regado") {
      fill(0, 180, 0);
      ellipse(x + 40, y + 40, 15, 25);
    } else if (plant.estado === "crescendo") {
      fill(0, 220, 0);
      ellipse(x + 40, y + 40, 20, 30);
    } else if (plant.estado === "pronto") {
      fill(255, 215, 0);
      ellipse(x + 40, y + 40, 25, 35);
    } else if (plant.estado === "seco") {
      fill(100);
      ellipse(x + 40, y + 40, 10, 10);
    }
  }
}

function mousePressed() {
  for (let i = 0; i < solo.length; i++) {
    let x = 100 + (i % 6) * 110;
    let y = 150 + floor(i / 6) * 110;

    if (mouseX > x && mouseX < x + 80 && mouseY > y && mouseY < y + 80) {
      let plant = solo[i];

      if (plant.estado === "vazio" && sementes > 0) {
        plant.estado = "plantado";
        sementes--;
        plant.tempo = 0;
      } else if (plant.estado === "plantado") {
        plant.estado = "regado";
        plant.tempo = 0;
      } else if (plant.estado === "pronto") {
        dinheiro += 5;
        score += 1;
        sementes += 1;
        plant.estado = "vazio";
        plant.tempo = 0;
      } else if (plant.estado === "seco") {
        plant.estado = "vazio";
        plant.tempo = 0;
      }
    }
  }
}