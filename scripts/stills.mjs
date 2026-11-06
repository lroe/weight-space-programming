import path from "node:path";
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";

const entry = path.resolve("src/index.ts");
const frames = process.argv.slice(2).map((s) => {
  const [name, sec] = s.split("=");
  return { name, frame: Math.round(parseFloat(sec) * 30) };
});

const serveUrl = await bundle({ entryPoint: entry });
const composition = await selectComposition({ serveUrl, id: "AstraWeightSpace" });

for (const { name, frame } of frames) {
  const output = path.resolve("preview", `${name}.png`);
  await renderStill({ composition, serveUrl, output, frame });
  console.log(`rendered ${name} @ ${frame} -> ${output}`);
}
