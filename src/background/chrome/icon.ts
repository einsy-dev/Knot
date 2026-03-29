export async function setIconStatus(color: string) {
  const canvas = new OffscreenCanvas(16, 16);
  const context = canvas.getContext("2d");
  if (!context) return;

  const response = await fetch(chrome.runtime.getURL("icons/16x16.png"));
  const blob = await response.blob();
  const bitmap = await createImageBitmap(blob);

  context.drawImage(bitmap, 0, 0, 16, 16);
  context.fillStyle = color;
  context.beginPath();
  context.arc(13, 13, 3, 0, 2 * Math.PI);
  context.fill();

  const imageData = context.getImageData(0, 0, 16, 16);
  chrome.action.setIcon({ imageData: imageData });
}
