function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function outlineRect(topLeftX, topLeftY, boxWidth, boxHeight, lineColor) {
    canvasContext.beginPath();
    canvasContext.strokeStyle = lineColor;
    canvasContext.lineWidth = "3";
    canvasContext.rect(topLeftX, topLeftY, boxWidth, boxHeight);
    canvasContext.stroke();
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}
  
function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY,withAngle,withScale=1) {
  canvasContext.save(); // allows us to undo translate movement and rotate spin
  canvasContext.translate(atX,atY); // sets the point where our graphic will go
  if (withAngle) canvasContext.rotate(withAngle); // sets the rotation
  if (withScale !== 1) canvasContext.scale(withScale, withScale); // sets the rotation
  //canvasContext.drawImage(graphic,-graphic.width/2,-graphic.height/2); // center, draw
  if (graphic && graphic.render) graphic.render(canvasContext, -graphic.width/2, -graphic.height/2);
  canvasContext.restore(); // undo the translation movement and rotation since save()
}

function colorText(showWords, textX, textY, fillColor = "black", font = "14px Arial Black") {
  canvasContext.textAlign = "left";
  canvasContext.fillStyle = fillColor;
  canvasContext.font = font;
  canvasContext.fillText(showWords, textX, textY);
}

function customText(showWords, textX,textY, fillColor, textSize, fontStyle) {
  canvasContext.fillStyle = fillColor;
  canvasContext.font = textSize + "px " + fontStyle;
  canvasContext.fillText(showWords, textX, textY);
}