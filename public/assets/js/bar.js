function dessinCercleSimple(chargeActu, total) {
  let pourcentage = Math.round((chargeActu * 100) / total);

  // definition du point de depart des cercle;
  var circ = Math.PI * 2;
  var quart = Math.PI / 2;

  // creation d'un cercle de gris 100% : Math.PI * 2
  c.strokeStyle = "#ccc";
  c.lineWidth = 11;
  c.beginPath();
  c.arc(canvas.width - 70, 75, 60, 0, circ, false);

  c.stroke();

  // creation d'un cercle de progression en %:
  c.strokeStyle = color(chargeActu);
  c.lineWidth = 7;
  c.beginPath();
  c.shadowOffsetY = 0;
  c.arc(
    canvas.width - 70,
    75,
    60,
    -quart,
    (circ * pourcentage) / 100 - quart,
    false
  );
  c.stroke();

  //creation texte
  c.textAlign = "center";

  c.fillStyle = color(chargeActu);
  c.fillText(pourcentage + "%", canvas.width - 70, 75);
  c.shadowBlur = 0;

  c.shadowBlur = 0;

  c.textAlign = "center";
  c.fillStyle = "black";
  c.fillText(chargeActu, canvas.width - 70, 110);
}
