import React from "react";
import { COLORS } from "../theme";
import { Beat, Chapter, drawIn, fadeOut, pop, ramp, useT } from "../lib/time";
import { Canvas, Card, Label, Small } from "../components/ui";
import { BlockStack, CodeWindow, NetworkDiagram, WeightMatrix } from "../components/diagrams";
import { StarCharacter } from "../components/figures";
import { SketchArrow, SketchCheck, SketchCircle, SketchCross, SketchLine, SketchPath, SketchRect } from "../lib/rough";
import { c } from "../data/narration";

const START = 237.76;
const END = 312.8;

/* ------------------------------- language card --------------------------- */

const LangCard: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  name: string;
  lines: string[];
  at: number;
  draw: number;
  accent?: string;
  note?: string;
  noteAt?: number;
}> = ({ x, y, w, h, name, lines, draw, accent = COLORS.ink, note, noteAt }) => {
  const t = useT();
  return (
    <div style={{ opacity: draw }}>
      <Card x={x} y={y} w={w} h={h} fill={COLORS.white} draw={draw} radius={14} seed={x}>
        <div style={{ fontFamily: "'Caveat', cursive", fontSize: 46, fontWeight: 600, color: accent }}>{name}</div>
        <div style={{ marginTop: 18, fontFamily: "'Patrick Hand', cursive", fontSize: 27, lineHeight: 1.55, color: COLORS.ink, opacity: 0.78 }}>
          {lines.map((l, i) => (
            <div key={i} style={{ color: i === 0 && name === "python" ? COLORS.red : COLORS.ink }}>
              {l}
            </div>
          ))}
        </div>
        {note ? (
          <div style={{ position: "absolute", left: 28, bottom: 18, fontFamily: "'Patrick Hand', cursive", fontSize: 22, color: COLORS.ink, opacity: 0.46 * (noteAt === undefined ? 1 : pop(t, noteAt, 0.4)) }}>
            {note}
          </div>
        ) : null}
      </Card>
    </div>
  );
};

/* --------------------------------- intro --------------------------------- */

const BIntro: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <BlockStack x={810} y={400} w={300} h={78} draw={drawIn(t, c(124), 0.8)} inputs={false} outputs={false} />
        <StarCharacter x={610} y={600} size={168} draw={pop(t, c(124) + 0.15, 0.6)} tool="magnifier" />
      </Canvas>
      <Label at={c(123)} x={960} y={150} size={64} underline>
        experiment three.
      </Label>
      <Label at={c(124)} x={960} y={252} size={50} color={COLORS.ink} opacity={0.84}>
        only the middle layers.
      </Label>
      <Small at={c(124) + 0.8} x={960} y={872} size={28} opacity={0.42}>
        four blocks, nothing else
      </Small>
    </>
  );
};

/* ------------------------------ fair complaint --------------------------- */

const BComplaint: React.FC = () => {
  const t = useT();
  const net = drawIn(t, c(125) - 0.1, 0.9);
  const first = drawIn(t, c(126), 0.5);
  const last = drawIn(t, c(127), 0.5);
  const world = pop(t, c(128), 0.5);
  const gone = pop(t, c(129), 0.45);
  return (
    <>
      <Canvas>
        <NetworkDiagram x={520} y={350} w={840} h={300} layers={[4, 6, 6, 6, 3]} draw={net} seed={1301} labels={["input", "", "", "", "output"]} />
        <SketchRect x={472} y={310} w={96} h={360} draw={first} stroke={COLORS.red} sw={3.2} seed={1302} roughness={1.2} />
        <SketchRect x={1312} y={310} w={96} h={360} draw={last} stroke={COLORS.red} sw={3.2} seed={1303} roughness={1.2} />
        <SketchLine x1={472} y1={310} x2={568} y2={670} draw={gone} sw={4.6} stroke={COLORS.red} seed={1306} />
        <SketchLine x1={568} y1={310} x2={472} y2={670} draw={gone} sw={4.6} stroke={COLORS.red} seed={1307} />
        <SketchLine x1={1312} y1={310} x2={1408} y2={670} draw={gone} sw={4.6} stroke={COLORS.red} seed={1308} />
        <SketchLine x1={1408} y1={310} x2={1312} y2={670} draw={gone} sw={4.6} stroke={COLORS.red} seed={1309} />
        <SketchArrow x1={520} y1={760} x2={520} y2={700} draw={world} sw={2.6} seed={1304} />
        <SketchArrow x1={1360} y1={760} x2={1360} y2={700} draw={world} sw={2.6} seed={1305} />
      </Canvas>
      <Label at={c(125)} x={960} y={160} size={58} underline>
        a fair complaint.
      </Label>
      <Label at={c(126)} x={520} y={795} size={38} color={COLORS.red}>
        first layer
      </Label>
      <Label at={c(127)} x={1360} y={795} size={38} color={COLORS.red}>
        last layer
      </Label>
      <Small at={c(128)} out={c(129) - 0.05} x={960} y={850} size={32} opacity={0.55}>
        they touch the real world.
      </Small>
      <Label at={c(129)} x={960} y={800} size={54} color={COLORS.red} opacity={gone}>
        removed.
      </Label>
      <Small at={c(129) + 0.25} x={960} y={858} size={28} opacity={0.35 * gone}>
        both of them
      </Small>
    </>
  );
};

/* ------------------------------- three models ---------------------------- */

const BThreeModels: React.FC = () => {
  const t = useT();
  return (
    <>
      <Label at={c(130)} x={960} y={155} size={58} underline>
        three small models.
      </Label>
      <LangCard
        x={275}
        y={300}
        w={400}
        h={390}
        name="python"
        lines={["def copy(name):", "    return name", "", "name = \"astra\"", "copy = name"]}
        at={c(131)}
        draw={pop(t, c(131) - 0.1, 0.55)}
        accent={COLORS.sage}
      />
      <LangCard
        x={760}
        y={300}
        w={400}
        h={390}
        name="romaji"
        lines={["konnichiwa", "arigatou", "sayounara"]}
        at={c(131) + 0.25}
        draw={pop(t, c(131) + 0.25, 0.55)}
        accent={COLORS.red}
        note="Japanese in English letters"
        noteAt={c(132) + 0.4}
      />
      <LangCard
        x={1245}
        y={300}
        w={400}
        h={390}
        name="english"
        lines={["the cat sat", "on the mat", "the cat ran"]}
        at={c(133)}
        draw={pop(t, c(133) - 0.1, 0.55)}
        accent={COLORS.ink}
      />
      <Small at={c(130) + 0.4} x={960} y={790} size={30} opacity={0.45}>
        character by character
      </Small>
      <Small at={c(132) + 0.4} x={960} y={840} size={28} opacity={0.35}>
        same recipe, different food
      </Small>
    </>
  );
};

/* -------------------------------- middle only ---------------------------- */

const BMiddleOnly: React.FC = () => {
  const t = useT();
  const blocks = drawIn(t, c(134) - 0.1, 0.85);
  const cross = pop(t, c(136), 0.5);
  const cant = pop(t, c(137), 0.5);
  return (
    <>
      <Canvas>
        <BlockStack x={810} y={360} w={300} h={78} draw={blocks} inputs={false} outputs={false} />
        <StarCharacter x={505} y={600} size={160} draw={pop(t, c(134) + 0.35, 0.6)} tool="magnifier" />
        <SketchCross x={960} y={286} size={64} draw={cross} sw={4.2} />
      </Canvas>
      <Label at={c(134)} x={960} y={160} size={58} underline>
        the four middle blocks.
      </Label>
      <Label at={c(136)} x={960} y={805} size={48} color={COLORS.red} opacity={cant}>
        can't even run it.
      </Label>
      <Small at={c(136) + 0.6} x={960} y={865} size={28} opacity={0.4}>
        no way in, no way out
      </Small>
    </>
  );
};

/* ------------------------------- named language -------------------------- */

const languageCards: { name: string; x: number; at: number }[] = [
  { name: "python", x: 590, at: 0.15 },
  { name: "romaji", x: 960, at: 0.35 },
  { name: "english", x: 1330, at: 0.55 },
];

const BNamed: React.FC = () => {
  const t = useT();
  const checks = pop(t, c(138) + 0.7, 0.5);
  return (
    <>
      <Canvas>
        {languageCards.map((l, i) => (
          <g key={l.name}>
            <SketchRect x={l.x - 130} y={430} w={260} h={160} draw={drawIn(t, c(138) + l.at, 0.55)} radius={10} fill={COLORS.white} sw={3} seed={1320 + i} />
            <text x={l.x} y={525} textAnchor="middle" fontFamily="'Caveat', cursive" fontSize={54} fontWeight={600} fill={COLORS.ink} opacity={0.86 * drawIn(t, c(138) + l.at + 0.2, 0.4)}>
              {l.name}
            </text>
            <SketchCheck x={l.x + 82} y={470} size={34} draw={checks} sw={5} />
          </g>
        ))}
        <StarCharacter x={300} y={590} size={170} draw={pop(t, c(138), 0.6)} tool="magnifier" />
      </Canvas>
      <Label at={c(138)} x={960} y={160} size={62} underline>
        right language, every time.
      </Label>
      <Label at={c(139)} x={960} y={815} size={46} color={COLORS.sage}>
        in both attempts.
      </Label>
      <Label at={c(139) + 0.7} x={1680} y={250} size={64} color={COLORS.sage}>
        3 / 3
      </Label>
    </>
  );
};

/* -------------------------------- copying heads -------------------------- */

const tokens = ["the", "cat", "sat", "on", "the", "mat", ".", "the", "cat"];
const tx = (i: number) => 235 + i * 178;

const BCopying: React.FC = () => {
  const t = useT();
  const words = drawIn(t, c(140) - 0.1, 0.75);
  const arcs = drawIn(t, c(140) + 0.5, 0.7);
  const truth = pop(t, c(143) + 0.15, 0.55);
  const flags = pop(t, c(144), 0.5);
  const tokenFade = fadeOut(t, c(143), 0.35);
  return (
    <>
      <Canvas>
        <g opacity={tokenFade}>
          {tokens.map((w, i) => {
            const local = drawIn(t, c(140) + i * 0.05, 0.35);
            return (
              <g key={i} opacity={local}>
                <SketchRect x={tx(i) - 72} y={430} w={144} h={72} draw={local} radius={8} fill={i === 4 || i === 7 || i === 8 ? COLORS.sand : COLORS.white} sw={2.6} seed={1340 + i} />
                <text x={tx(i)} y={478} textAnchor="middle" fontFamily="'Patrick Hand', cursive" fontSize={36} fill={COLORS.ink} opacity={0.86 * local}>
                  {w}
                </text>
              </g>
            );
          })}
          <SketchPath d={`M ${tx(4)} 420 C ${tx(4)} 300 ${tx(0)} 300 ${tx(0)} 420`} draw={arcs} sw={2.8} stroke={COLORS.red} seed={1350} />
          <SketchPath d={`M ${tx(8)} 420 C ${tx(8)} 270 ${tx(1)} 270 ${tx(1)} 420`} draw={drawIn(t, c(140) + 0.8, 0.7)} sw={2.8} stroke={COLORS.red} seed={1351} />
          <SketchPath d={`M ${tx(7)} 420 C ${tx(7)} 330 ${tx(4)} 330 ${tx(4)} 420`} draw={drawIn(t, c(140) + 1.1, 0.7)} sw={2.4} stroke={COLORS.sage} seed={1352} />
          <circle cx={tx(4)} cy={386} r={5} fill={COLORS.red} opacity={arcs} />
          <circle cx={tx(8)} cy={386} r={5} fill={COLORS.red} opacity={arcs} />
        </g>
        <g opacity={truth}>
          <SketchLine x1={735} y1={560} x2={1185} y2={560} draw={truth} sw={3} seed={1354} />
          <text x={960} y={535} textAnchor="middle" fontFamily="'Caveat', cursive" fontSize={56} fontWeight={600} fill={COLORS.ink}>
            measured  =  astra
          </text>
          <text x={960} y={750} textAnchor="middle" fontFamily="'Caveat', cursive" fontSize={64} fontWeight={600} fill={COLORS.sage}>
            0 false flags
          </text>
        </g>
      </Canvas>
      <Label at={c(140)} out={c(143)} x={960} y={160} size={60} underline>
        copying heads.
      </Label>
      <Label at={c(140) + 0.7} x={960} y={690} size={34} color={COLORS.red} opacity={0.8 * (1 - truth)}>
        induction heads
      </Label>
      <Label at={c(141)} x={960} y={790} size={36} color={COLORS.ink} opacity={0.62 * (1 - truth)}>
        repeat what it saw earlier.
      </Label>
      <Label at={c(143)} x={960} y={160} size={60} underline>
        ground truth.
      </Label>
      <Small at={c(144)} x={960} y={835} size={28} opacity={0.45 * flags}>
        not one wrong head
      </Small>
    </>
  );
};

/* -------------------------------- matrix path ---------------------------- */

const BMatrixMath: React.FC = () => {
  const t = useT();
  const m1 = drawIn(t, c(145) + 0.1, 0.7);
  const m2 = drawIn(t, c(145) + 0.35, 0.7);
  const m3 = drawIn(t, c(145) + 0.6, 0.7);
  const res = drawIn(t, c(145) + 1.0, 0.8);
  return (
    <>
      <Canvas>
        <WeightMatrix x={210} y={410} cols={6} rows={5} cell={30} draw={m1} seed={1361} numbers={false} />
        <WeightMatrix x={570} y={410} cols={6} rows={5} cell={30} draw={m2} seed={1362} numbers={false} />
        <WeightMatrix x={930} y={410} cols={6} rows={5} cell={30} draw={m3} seed={1363} numbers={false} />
        <WeightMatrix x={1330} y={395} cols={7} rows={5} cell={30} draw={res} seed={1364} numbers={false} outline highlight={[{ r: 2, c: 3, color: COLORS.sage }]} />
        <text x={495} y={505} textAnchor="middle" fontFamily="'Caveat', cursive" fontSize={58} fill={COLORS.ink} opacity={0.55 * m1}>×</text>
        <text x={855} y={505} textAnchor="middle" fontFamily="'Caveat', cursive" fontSize={58} fill={COLORS.ink} opacity={0.55 * m2}>×</text>
        <text x={1245} y={505} textAnchor="middle" fontFamily="'Caveat', cursive" fontSize={58} fill={COLORS.ink} opacity={0.55 * m3}>=</text>
        <text x={300} y={610} textAnchor="middle" fontFamily="'Patrick Hand', cursive" fontSize={30} fill={COLORS.ink} opacity={0.7 * m1}>early</text>
        <text x={660} y={610} textAnchor="middle" fontFamily="'Patrick Hand', cursive" fontSize={30} fill={COLORS.ink} opacity={0.7 * m2}>middle</text>
        <text x={1020} y={610} textAnchor="middle" fontFamily="'Patrick Hand', cursive" fontSize={30} fill={COLORS.ink} opacity={0.7 * m3}>late</text>
        <text x={1455} y={610} textAnchor="middle" fontFamily="'Patrick Hand', cursive" fontSize={30} fill={COLORS.ink} opacity={0.75 * res}>one composed path</text>
      </Canvas>
      <Label at={c(145)} x={960} y={160} size={58} underline>
        multiply the matrices.
      </Label>
      <Small at={c(146)} x={960} y={690} size={32} opacity={0.55}>
        early heads → later heads
      </Small>
      <Label at={c(147)} x={960} y={748} size={38} color={COLORS.ink} opacity={0.75}>
        a known method.
      </Label>
      <Small at={c(147) + 1.1} x={960} y={792} size={26} opacity={0.4}>
        Anthropic circuits work
      </Small>
      <Label at={c(148)} x={960} y={842} size={40} color={COLORS.red}>
        nobody told it.
      </Label>
      <Small at={c(149)} x={960} y={884} size={26} opacity={0.4}>
        on its own.
      </Small>
    </>
  );
};

/* --------------------------------- python -------------------------------- */

const BPython: React.FC = () => {
  const t = useT();
  const code = pop(t, c(151) + 0.2, 0.55);
  const matrix = drawIn(t, c(151) + 0.45, 0.8);
  const arrow = drawIn(t, c(151) + 0.7, 0.5);
  return (
    <>
      <Canvas>
        <SketchArrow x1={950} y1={540} x2={1075} y2={540} draw={arrow} sw={3} seed={1371} />
        <WeightMatrix
          x={1095}
          y={385}
          cols={7}
          rows={6}
          cell={42}
          draw={matrix}
          seed={1372}
          numbers={false}
          highlight={[
            { r: 1, c: 2, color: COLORS.red },
            { r: 2, c: 4, color: COLORS.red },
            { r: 3, c: 1, color: COLORS.red },
            { r: 4, c: 5, color: COLORS.red },
            { r: 2, c: 2, color: COLORS.sage },
            { r: 4, c: 2, color: COLORS.sage },
          ]}
        />
      </Canvas>
      <div style={{ opacity: code }}>
        <CodeWindow
          x={210}
          y={345}
          w={715}
          h={340}
          title="python.py"
          draw={code}
          size={28}
          highlightAt={1}
          lines={[
            { text: "def copy(name):" },
            { text: "    return name", color: COLORS.red },
            { text: "" },
            { text: "name = \"astra\"" },
            { text: "copy = name", color: COLORS.red },
            { text: "print(copy)" },
          ]}
        />
      </div>
      <Label at={c(151)} x={960} y={160} size={58} underline>
        python.
      </Label>
      <Label at={c(151) + 0.6} x={1275} y={330} size={40} color={COLORS.red} opacity={matrix}>
        copying heads.
      </Label>
      <Small at={c(152)} x={1275} y={710} size={30} opacity={0.55}>
        code repeats variable names.
      </Small>
      <Label at={c(152) + 1.2} x={1275} y={775} size={42} color={COLORS.ink} opacity={0.7}>
        constantly.
      </Label>
    </>
  );
};

/* --------------------------------- romaji -------------------------------- */

const BRomaji: React.FC = () => {
  const t = useT();
  const tape = drawIn(t, c(154) - 0.1, 0.7);
  const fan = drawIn(t, c(154) + 0.2, 0.8);
  const fewer = pop(t, c(155), 0.5);
  return (
    <>
      <Canvas>
        <g opacity={tape}>
          <SketchRect x={220} y={350} w={430} h={250} draw={tape} radius={8} fill={COLORS.white} sw={3} seed={1381} />
          {["konnichiwa", "arigatou", "sayounara"].map((w, i) => (
            <text key={w} x={250} y={410 + i * 64} fontFamily="'Patrick Hand', cursive" fontSize={34} fill={COLORS.ink} opacity={0.75 * tape}>
              {w}
            </text>
          ))}
        </g>
        <SketchArrow x1={690} y1={475} x2={830} y2={475} draw={drawIn(t, c(154) + 0.6, 0.5)} sw={3} seed={1382} />
        <g opacity={fan}>
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
            const live = i < 5;
            return (
              <SketchArrow
                key={i}
                x1={1250}
                y1={475}
                x2={1250 + Math.cos(a) * 180}
                y2={475 + Math.sin(a) * 180}
                draw={drawIn(t, c(154) + 0.3 + i * 0.07, 0.45)}
                sw={live ? 3.4 : 2.2}
                stroke={live ? COLORS.ink : COLORS.ink}
                opacity={live ? 0.9 : 0.14}
                seed={1390 + i}
              />
            );
          })}
          <SketchCircle cx={1250} cy={475} d={22} draw={fan} fill={COLORS.ink} fillP={0.8} sw={2} seed={1400} />
        </g>
      </Canvas>
      <Label at={c(154)} x={960} y={160} size={58} underline>
        romaji.
      </Label>
      <Small at={c(154) + 0.5} x={1250} y={255} size={28} opacity={0.45}>
        the last block
      </Small>
      <Label at={c(155)} x={1250} y={760} size={46} color={COLORS.sage} opacity={fewer}>
        fewer directions.
      </Label>
      <Label at={c(156)} x={1250} y={825} size={36} color={COLORS.ink} opacity={0.62}>
        fewer letters to track.
      </Label>
      <Small at={c(154) + 0.4} x={435} y={320} size={26} opacity={0.4}>
        text
      </Small>
    </>
  );
};

/* -------------------------------- alphabet ------------------------------- */

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const missing = new Set(["Q", "L", "V", "X"]);

const BMissing: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        {letters.map((l, i) => {
          const x = 265 + i * 56;
          const isMissing = missing.has(l);
          const kill = isMissing ? (l === "Q" ? pop(t, c(157) + 0.7, 0.4) : pop(t, c(158), 0.4)) : 0;
          return (
            <g key={l}>
              <text x={x} y={500} textAnchor="middle" fontFamily="'Patrick Hand', cursive" fontSize={52} fill={isMissing ? COLORS.red : COLORS.ink} opacity={isMissing ? 0.55 : 0.78}>
                {l}
              </text>
              {isMissing ? <SketchCross x={x} y={480} size={48} draw={kill} sw={4} /> : null}
            </g>
          );
        })}
        <SketchLine x1={230} y1={550} x2={1690} y2={550} draw={drawIn(t, c(157) + 0.2, 0.7)} sw={2.2} opacity={0.35} seed={1410} />
      </Canvas>
      <Label at={c(157)} x={960} y={160} size={60} underline>
        missing letters.
      </Label>
      <Label at={c(158)} x={960} y={690} size={60} color={COLORS.red}>
        Q &nbsp; L &nbsp; V &nbsp; X
      </Label>
      <Label at={c(158) + 0.15} x={960} y={810} size={40} color={COLORS.ink} opacity={0.65}>
        romaji really does skip them.
      </Label>
      <Small at={c(158) + 0.95} x={960} y={868} size={28} opacity={0.4}>
        fewer letters to keep track of
      </Small>
    </>
  );
};

export const Ch06Middle: React.FC = () => (
  <Chapter start={START} end={END}>
    <Beat from={START} to={241.15}>
      <BIntro />
    </Beat>
    <Beat from={241.05} to={250.05}>
      <BComplaint />
    </Beat>
    <Beat from={249.95} to={258.75}>
      <BThreeModels />
    </Beat>
    <Beat from={258.65} to={267.35}>
      <BMiddleOnly />
    </Beat>
    <Beat from={267.25} to={271.75}>
      <BNamed />
    </Beat>
    <Beat from={271.65} to={282.1}>
      <BCopying />
    </Beat>
    <Beat from={281.95} to={295.3}>
      <BMatrixMath />
    </Beat>
    <Beat from={295.15} to={301.6}>
      <BPython />
    </Beat>
    <Beat from={301.45} to={308.1}>
      <BRomaji />
    </Beat>
    <Beat from={307.95} to={END}>
      <BMissing />
    </Beat>
  </Chapter>
);
