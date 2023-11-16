import React, { useRef, useEffect, useState } from 'react';

function CanvasPattern() {
  const canvasRef = useRef(null);
  const [radius, setRadius] = useState(20);
  let imageCapture;

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        const videoTrack = stream.getVideoTracks()[0];
        imageCapture = new ImageCapture(videoTrack);
      })
      .catch(error => console.error("Error accessing media devices.", error));
    
    const cx = canvasRef.current.getContext('2d');
    drawPattern(cx);
  }, [radius]);


  function drawPattern(cx) {
    cx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Hreinsa canvas áður en teiknað er aftur
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvasRef.current.width;
      const y = Math.random() * canvasRef.current.height;
      const color = `hsl(${Math.random() * 360}, 100%, 50%)`;

      cx.beginPath();
      cx.arc(x, y, radius, 0, 2 * Math.PI); // Nota radius state breytuna
      cx.fillStyle = color;
      cx.fill();
    }
  }

  function takePhoto() {
    imageCapture.takePhoto()
      .then(blob => {
        const img = new Image();
        img.src = URL.createObjectURL(blob);
        img.onload = () => {
          const cx = canvasRef.current.getContext('2d');
          cx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
        };
      })
      .catch(error => console.error('Error taking photo:', error));
  }

  function handleMouseMove(event) {
    // Hreyfingarmynstur eða breytingar þegar mús er hreyfð yfir canvas
  }

  return (
    <div>
      <canvas ref={canvasRef} width="1000" height="1000" onMouseMove={handleMouseMove} />
      <input type="range" min="10" max="60" value={radius} onChange={e => setRadius(e.target.value)} />
      <button onClick={takePhoto}>Taka mynd</button>
    </div>
  );
}

export default CanvasPattern;
