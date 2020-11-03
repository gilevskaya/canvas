(() => {
  const canvas = document.getElementById("webgl-canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("webgl");
  // @ts-ignore
  const resizeObserver = new ResizeObserver((entries) => {
    const { width, height } = entries[0]?.contentRect;
    if (!width || !height) return;
    canvas.width = Math.round(width);
    canvas.height = Math.round(height);
  });
  resizeObserver.observe(document.getElementById("container"));

  console.log({ ctx });
})();
