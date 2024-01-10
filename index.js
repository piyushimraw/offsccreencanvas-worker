
// create an array of  10 x 10 canvas
// process this array and for each item I will send the contepl to the worker
// render it in the worker and then get the control back
// create a game loop using raf to just process one item at a time from canvas and not block

const all = document.getElementsByClassName("grid");
const grid = all[0];
console.log(grid);

const images = new Array(2 * 2)
  .fill("")
  .map(
    () =>
      "https://images.unsplash.com/photo-1682686581556-a3f0ee0ed556?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  );



const convertImageURLToBitmap = (url) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.crossOrigin = 'anonymous';
        image.onload = () => {
            createImageBitmap(image).then((bitmap) => {
                resolve(bitmap);
            }).catch((err) => {
                reject(err);
            })
        }
        image.onerror = (err) => {
            reject(err);
        }
    })
}

const w = new Worker("./worker.js");

images.forEach((image) => {
  let c = document.createElement("canvas");
  c.height = 100;
  c.width = 100;
  c.style.border = "1px solid black";
  c.style.margin = "20px";
  grid.appendChild(c);




  const transferable = c.transferControlToOffscreen();

  convertImageURLToBitmap(image).then((bitmap) => {

    w.postMessage({ canvas: transferable, bitmap }, [transferable]);
  });

});

  
w.onmessage = function (e) {
    console.log("done ?", e.data);
  };
// transfer this canvas context to the worker
// post a message to worker to render stuff on canvas
// once worker completes it should post back a message
