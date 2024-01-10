function draw(canvas, bitmap, cb) {
    const ctx = canvas.getContext("bitmaprenderer");

    // draw image unit8array to canvas

    ctx.transferFromImageBitmap(bitmap);
    cb();

  }
  
  self.onmessage = function (e) {
    console.log("canvas", e.data);
    draw(e.data.canvas, e.data.bitmap, () => {
      self.postMessage("done");
    });
  };
  
  // window.addEventListener("message", (
  //     canvas, image
  // ) => {
  //     console.log({canvas, image})
  //     draw(canvas, image, () =>{})
  // });
  