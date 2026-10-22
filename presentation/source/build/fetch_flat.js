const sharp = require("sharp"), fs = require("fs"), path = require("path");
const names = process.argv.slice(2);
(async () => {
  for (const n of names) {
    const r = await fetch(`https://api.iconify.design/flat-color-icons/${n}.svg?height=384`);
    const svg = await r.text();
    if (!svg.startsWith("<svg")) { console.log("miss", n); continue; }
    await sharp(Buffer.from(svg)).resize(384, 384, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join("..", "assets", "flat", n + ".png"));
    console.log("ok", n);
  }
})();
