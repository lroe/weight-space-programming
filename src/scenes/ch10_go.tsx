import React from "react";
import { COLORS, FONTS } from "../theme";
import { Beat, Chapter, drawIn, pop, useT } from "../lib/time";
import { Canvas, Label, Small } from "../components/ui";
import { CodeWindow, GoBoard, NetworkDiagram, WeightMatrix } from "../components/diagrams";
import { StarCharacter } from "../components/figures";
import { SketchArrow, SketchCheck, SketchCircle, SketchCross, SketchLine, SketchRect } from "../lib/rough";
import { c } from "../data/narration";

const START = 495.14;
const END = 563.4;

/* --------------------------------- intro --------------------------------- */

const BIntro: React.FC = () => {
  const t = useT();
  const board = drawIn(t, c(248) + 0.1, 0.9);
  return (
    <>
      <Canvas>
        <GoBoard
          x={1080}
          y={290}
          size={440}
          draw={board}
          stoneDraw={drawIn(t, c(248) + 0.5, 0.8)}
          stones={[
            { r: 2, c: 2, black: true },
            { r: 2, c: 6 },
            { r: 3, c: 3, black: true },
            { r: 4, c: 4 },
            { r: 5, c: 5, black: true },
            { r: 6, c: 2 },
          ]}
        />
        <StarCharacter x={400} y={690} size={170} draw={pop(t, c(248) + 0.35, 0.6)} tool="magnifier" />
      </Canvas>
      <Small at={c(247)} x={560} y={240} size={30} opacity={0.42}>
        experiment six
      </Small>
      <Label at={c(248)} x={560} y={400} size={150} underline>
        go.
      </Label>
      <Small at={c(249)} x={560} y={560} size={30} opacity={0.5}>
        then they raised the difficulty.
      </Small>
    </>
  );
};

/* ------------------------------- network size ---------------------------- */

const BNetwork: React.FC = () => {
  const t = useT();
  const bars = drawIn(t, c(251) - 0.05, 0.9);
  const labels = pop(t, c(252) - 0.05, 0.5);
  const heights = [160, 320, 320, 320, 320, 320, 320, 110];
  return (
    <>
      <Canvas>
        {heights.map((h, i) => {
          const x = 330 + i * 150;
          const y = 500 - h / 2;
          const stroke = i === 0 ? COLORS.sage : i === 7 ? COLORS.red : COLORS.ink;
          return (
            <g key={i}>
              <SketchRect
                x={x}
                y={y}
                w={100}
                h={h}
                draw={drawIn(t, c(251) + i * 0.05, 0.55)}
                radius={10}
                fill={i === 0 ? COLORS.sage : i === 7 ? COLORS.red : COLORS.sand}
                fillP={i === 0 || i === 7 ? 0.12 : 0.45}
                sw={2.6}
                stroke={stroke}
                seed={1810 + i}
              />
              <text x={x + 50} y={500 + 10} textAnchor="middle" fontFamily={FONTS.display} fontSize={38} fontWeight={600} fill={COLORS.ink} opacity={0.7 * bars}>
                {i === 0 ? "243" : i === 7 ? "82" : "512"}
              </text>
            </g>
          );
        })}
      </Canvas>
      <Label at={c(250)} x={960} y={150} size={56} underline>
        1.5 million parameters.
      </Label>
      <Small at={c(251)} x={380} y={710} size={28} opacity={0.5 * labels}>
        243 in
      </Small>
      <Small at={c(252)} x={915} y={710} size={28} opacity={0.5 * labels}>
        6 × 512
      </Small>
      <Small at={c(252) + 0.15} x={1430} y={710} size={28} opacity={0.5 * labels}>
        82 out
      </Small>
      <Small at={c(250) + 0.6} x={960} y={790} size={28} opacity={0.35}>
        one and a half million weights
      </Small>
    </>
  );
};

/* -------------------------------- too big -------------------------------- */

const BTooBig: React.FC = () => {
  const t = useT();
  const box = drawIn(t, c(253) - 0.05, 0.6);
  return (
    <>
      <Canvas>
        <SketchRect x={660} y={520} w={600} h={150} draw={box} radius={10} fill={COLORS.white} sw={2.8} seed={1821} />
        <text x={960} y={595} textAnchor="middle" fontFamily={FONTS.label} fontSize={30} fill={COLORS.ink} opacity={0.5 * box}>
          context window
        </text>
        <SketchCross x={960} y={595} size={190} draw={pop(t, c(253) + 0.25, 0.5)} sw={5} />
      </Canvas>
      <Label at={c(253)} x={960} y={380} size={64} color={COLORS.red} underline underlineColor={COLORS.red}>
        too big for context.
      </Label>
      <Small at={c(253) + 0.4} x={960} y={740} size={28} opacity={0.4}>
        the weights won't fit
      </Small>
    </>
  );
};

/* -------------------------------- sandbox -------------------------------- */

const BSandbox: React.FC = () => {
  const t = useT();
  const code = pop(t, c(255) - 0.05, 0.5);
  const matrix = drawIn(t, c(255) + 0.2, 0.8);
  return (
    <>
      <Canvas>
        <WeightMatrix
          x={1110}
          y={340}
          cols={10}
          rows={7}
          cell={30}
          gap={3}
          draw={matrix}
          seed={1831}
          highlight={[
            { r: 1, c: 2, color: COLORS.sage },
            { r: 2, c: 4, color: COLORS.sage },
            { r: 4, c: 7, color: COLORS.red },
            { r: 5, c: 5, color: COLORS.sage },
          ]}
        />
      </Canvas>
      <div style={{ opacity: code }}>
        <CodeWindow
          x={230}
          y={320}
          w={720}
          h={420}
          title="sandbox.py"
          draw={code}
          size={30}
          lines={[
            { text: "import numpy as np" },
            { text: "w = np.load('weights.npy')" },
            { text: "w.shape" },
            { text: "w[0, :4]" },
            { text: "w.mean(axis=1)" },
            { text: "w += delta" },
            { text: "np.save('weights.npy', w)" },
          ]}
        />
      </div>
      <Label at={c(254)} x={960} y={150} size={58} underline>
        a python sandbox.
      </Label>
      <Small at={c(255) + 0.4} x={1275} y={310} size={30} color={COLORS.sage} opacity={0.75}>
        numpy
      </Small>
      <Small at={c(255) + 0.7} x={1275} y={700} size={28} opacity={0.4}>
        weight tensors
      </Small>
      <Small at={c(256)} x={1275} y={750} size={28} opacity={0.4}>
        read · write · analyze
      </Small>
    </>
  );
};

/* -------------------------------- budget --------------------------------- */

const BBudget: React.FC = () => {
  const t = useT();
  const net = drawIn(t, c(257) - 0.05, 0.8);
  const stop = pop(t, c(257) + 0.3, 0.5);
  const meter = drawIn(t, c(258) - 0.05, 0.7);
  return (
    <>
      <Canvas>
        <NetworkDiagram x={300} y={350} w={520} h={260} layers={[4, 5, 3]} draw={net} seed={1841} nodeR={12} opacity={0.55} />
        <SketchCross x={560} y={480} size={150} draw={stop} sw={5} />
        <SketchRect x={1000} y={430} w={620} h={56} draw={meter} radius={5} sw={2.6} seed={1842} />
        <rect x={1002} y={432} width={84 * meter} height={52} rx={4} fill={COLORS.red} opacity={0.22} />
        {Array.from({ length: 9 }).map((_, i) => (
          <SketchLine key={i} x1={1002 + (i + 1) * 68} y1={430} x2={1002 + (i + 1) * 68} y2={486} draw={meter} sw={1.6} opacity={0.18} seed={1843 + i} />
        ))}
      </Canvas>
      <Label at={c(257)} x={960} y={150} size={54} underline>
        limited forward passes.
      </Label>
      <Small at={c(257) + 0.5} x={560} y={700} size={28} opacity={0.4}>
        no free running
      </Small>
      <Small at={c(258)} x={1000} y={395} size={28} opacity={0.45}>
        forward pass budget
      </Small>
      <Small at={c(258) + 0.3} x={1000} y={540} size={26} color={COLORS.red} opacity={0.6}>
        a few
      </Small>
    </>
  );
};

/* ------------------------------- zero passes ----------------------------- */

const BZeroPass: React.FC = () => {
  const t = useT();
  const bar = drawIn(t, c(260) - 0.05, 0.8);
  return (
    <>
      <Canvas>
        <SketchRect x={900} y={450} w={700} h={58} draw={bar} radius={5} sw={2.6} seed={1851} />
        <rect x={902} y={452} width={385 * bar} height={54} rx={4} fill={COLORS.sage} opacity={0.22} />
        <line x1={1250} y1={440} x2={1250} y2={518} stroke={COLORS.red} strokeWidth={2.4} strokeDasharray="9 8" opacity={0.6 * bar} />
        <text x={1250} y={540} textAnchor="middle" fontFamily={FONTS.label} fontSize={24} fill={COLORS.red} opacity={0.55 * bar}>
          50%
        </text>
      </Canvas>
      <Label at={c(259)} x={960} y={150} size={58} underline>
        zero forward passes.
      </Label>
      <Label at={c(259) + 0.2} x={480} y={420} size={190} color={COLORS.sage}>
        0
      </Label>
      <Small at={c(259) + 0.4} x={480} y={535} size={34} opacity={0.5}>
        forward passes
      </Small>
      <Small at={c(260)} x={900} y={405} size={28} opacity={0.45}>
        Astra win rate
      </Small>
      <Small at={c(260) + 0.4} x={1310} y={485} size={28} color={COLORS.sage} align="left" opacity={0.8}>
        more than half
      </Small>
      <Small at={c(261)} x={960} y={760} size={30} opacity={0.42}>
        against small PPO networks
      </Small>
    </>
  );
};

/* -------------------------------- fifty ---------------------------------- */

const BFifty: React.FC = () => {
  const t = useT();
  const panel = drawIn(t, c(263) - 0.05, 0.6);
  return (
    <>
      <Canvas>
        <SketchRect x={980} y={330} w={620} h={320} draw={panel} radius={14} fill={COLORS.white} sw={2.8} seed={1861} />
        <SketchCheck x={1025} y={405} size={36} draw={pop(t, c(263) + 0.1, 0.4)} sw={4.8} />
        <SketchCross x={1025} y={515} size={36} draw={pop(t, c(263) + 0.3, 0.4)} sw={4.8} />
      </Canvas>
      <Label at={c(262)} x={960} y={150} size={58} underline>
        50 forward passes.
      </Label>
      <Label at={c(262) + 0.2} x={480} y={400} size={190} color={COLORS.sage}>
        50
      </Label>
      <Small at={c(262) + 0.4} x={480} y={515} size={34} opacity={0.5}>
        forward passes
      </Small>
      <Label at={c(263)} x={1080} y={410} size={40} align="left" opacity={0.85}>
        Astra
      </Label>
      <Label at={c(263) + 0.1} x={1080} y={520} size={40} color={COLORS.red} align="left" opacity={0.85}>
        PPO
      </Label>
      <Small at={c(264)} x={1080} y={575} size={28} color={COLORS.red} opacity={0.6}>
        20 million games
      </Small>
      <Small at={c(263) + 0.4} x={1290} y={635} size={26} opacity={0.35}>
        same size
      </Small>
    </>
  );
};

/* ------------------------------- build layers ---------------------------- */

const BBuild: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        {Array.from({ length: 6 }).map((_, i) => (
          <g key={i}>
            <SketchRect
              x={470 + i * 130}
              y={360}
              w={100}
              h={240}
              draw={drawIn(t, c(265) + i * 0.08, 0.45)}
              radius={10}
              fill={COLORS.white}
              sw={2.6}
              seed={1870 + i}
            />
            <text x={520 + i * 130} y={630} textAnchor="middle" fontFamily={FONTS.label} fontSize={24} fill={COLORS.ink} opacity={0.65}>
              L{i + 1}
            </text>
          </g>
        ))}
        <GoBoard x={1360} y={520} size={220} draw={drawIn(t, c(266) - 0.05, 0.7)} />
      </Canvas>
      <Label at={c(265)} x={960} y={150} size={58} underline>
        layer by layer.
      </Label>
      <Small at={c(265) + 0.8} x={780} y={710} size={28} opacity={0.4}>
        one block at a time
      </Small>
      <Small at={c(266) + 0.2} x={1470} y={780} size={28} opacity={0.4}>
        a tiny Go engine
      </Small>
    </>
  );
};

/* ------------------------------- layer roles ----------------------------- */

const BLayers: React.FC = () => {
  const t = useT();
  const early = pop(t, c(267) - 0.05, 0.5);
  const middle = pop(t, c(269) - 0.05, 0.5);
  const last = pop(t, c(271) - 0.05, 0.5);
  return (
    <>
      <Canvas>
        {Array.from({ length: 6 }).map((_, i) => {
          const x = 330 + i * 210;
          const isEarly = i < 2;
          const isMid = i >= 2 && i < 5;
          const stroke = isEarly ? COLORS.sage : isMid ? COLORS.red : COLORS.ink;
          return (
            <g key={i}>
              <SketchRect x={x} y={340} w={170} h={270} draw={drawIn(t, c(267) + i * 0.06, 0.45)} radius={14} fill={COLORS.white} sw={2.8} stroke={stroke} seed={1880 + i} />
              <text x={x + 85} y={385} textAnchor="middle" fontFamily={FONTS.label} fontSize={24} fill={COLORS.ink} opacity={0.65}>
                L{i + 1}
              </text>
              {isEarly ? (
                <g opacity={early}>
                  {[430, 480, 530].map((cy, j) => (
                    <SketchCircle key={cy} cx={x + 60 + j * 22} cy={cy} d={22} draw={early} fill={j === 1 ? COLORS.white : COLORS.ink} fillP={0.85} sw={2} seed={1890 + i * 5 + j} />
                  ))}
                  {[430, 480, 530].map((cy, j) => (
                    <circle key={`d${cy}`} cx={x + 125} cy={cy + 8} r={3} fill={COLORS.sage} opacity={0.55 * early} />
                  ))}
                </g>
              ) : null}
              {isMid ? (
                <g opacity={middle}>
                  <SketchLine x1={x + 48} y1={430} x2={x + 118} y2={520} draw={middle} sw={2.4} opacity={0.35} seed={1900 + i} />
                  {[430, 475, 520].map((cy, j) => (
                    <SketchCircle key={cy} cx={x + 48 + j * 28} cy={cy} d={24} draw={middle} fill={COLORS.ink} fillP={0.8} sw={2} seed={1910 + i * 5 + j} />
                  ))}
                  <SketchCircle cx={x + 104} cy={475} d={48} draw={middle} stroke={COLORS.red} sw={2.4} seed={1920 + i} />
                </g>
              ) : null}
              {!isEarly && !isMid ? (
                <g opacity={last}>
                  {[440, 485, 530].map((cy, j) => (
                    <SketchLine key={cy} x1={x + 38} y1={cy} x2={x + 130 - j * 18} y2={cy} draw={last} sw={4} stroke={j === 0 ? COLORS.sage : COLORS.ink} seed={1930 + j} />
                  ))}
                  <SketchCheck x={x + 70} y={575} size={30} draw={last} sw={4.4} />
                </g>
              ) : null}
            </g>
          );
        })}
      </Canvas>
      <Label at={c(267)} x={960} y={150} size={54} underline>
        what each layer does.
      </Label>
      <Small at={c(267) + 0.5} x={520} y={670} size={28} color={COLORS.sage} opacity={0.75 * early}>
        stones + liberties
      </Small>
      <Small at={c(269)} x={1045} y={670} size={28} color={COLORS.red} opacity={0.75 * middle}>
        chains + danger
      </Small>
      <Small at={c(271)} x={1465} y={670} size={28} opacity={0.7 * last}>
        scores each move
      </Small>
    </>
  );
};

/* --------------------------------- rules --------------------------------- */

const RuleCard: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  note: string;
  draw: number;
  icon: "capture" | "save" | "atari" | "eyes";
  seed: number;
}> = ({ x, y, w, h, title, note, draw, icon, seed }) => (
  <g opacity={draw}>
    <SketchRect x={x} y={y} w={w} h={h} draw={draw} radius={14} fill={COLORS.white} sw={2.8} seed={seed} />
    <text x={x + 36} y={y + 78} fontFamily={FONTS.display} fontSize={46} fontWeight={600} fill={COLORS.ink} opacity={0.86}>
      {title}
    </text>
    <text x={x + 36} y={y + 122} fontFamily={FONTS.label} fontSize={26} fill={COLORS.ink} opacity={0.65}>
      {note}
    </text>
    {icon === "capture" ? (
      <g>
        <SketchCircle cx={x + w - 130} cy={y + h / 2} d={46} draw={draw} fill={COLORS.ink} fillP={0.85} sw={2.4} seed={seed + 1} />
        <SketchCross x={x + w - 130} y={y + h / 2} size={58} draw={draw} sw={4} />
      </g>
    ) : null}
    {icon === "save" ? (
      <g>
        {[0, 1, 2].map((i) => (
          <SketchCircle key={i} cx={x + w - 190 + i * 44} cy={y + h / 2 + (i === 1 ? -18 : 0)} d={36} draw={draw} fill={COLORS.ink} fillP={0.8} sw={2.2} seed={seed + 2 + i} />
        ))}
        <SketchCheck x={x + w - 78} y={y + h / 2 - 10} size={38} draw={draw} sw={4.6} />
      </g>
    ) : null}
    {icon === "atari" ? (
      <g>
        <SketchCircle cx={x + w - 130} cy={y + h / 2} d={44} draw={draw} fill={COLORS.ink} fillP={0.85} sw={2.4} seed={seed + 5} />
        <SketchCircle cx={x + w - 130} cy={y + h / 2} d={82} draw={draw} stroke={COLORS.red} sw={2.4} seed={seed + 6} />
        <SketchCross x={x + w - 130} y={y + h / 2} size={62} draw={draw} sw={4} />
      </g>
    ) : null}
    {icon === "eyes" ? (
      <g>
        <SketchCircle cx={x + w - 170} cy={y + h / 2} d={44} draw={draw} fill={COLORS.white} sw={2.4} seed={seed + 7} />
        <SketchCircle cx={x + w - 110} cy={y + h / 2} d={44} draw={draw} fill={COLORS.white} sw={2.4} seed={seed + 8} />
        <circle cx={x + w - 170} cy={y + h / 2} r={7} fill={COLORS.sage} opacity={0.75 * draw} />
        <circle cx={x + w - 110} cy={y + h / 2} r={7} fill={COLORS.sage} opacity={0.75 * draw} />
      </g>
    ) : null}
  </g>
);

const BRules: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <RuleCard x={250} y={320} w={680} h={220} title="capture" note="take the stone" draw={pop(t, c(272) - 0.05, 0.5)} icon="capture" seed={1941} />
        <RuleCard x={990} y={320} w={680} h={220} title="save a group" note="keep it alive" draw={pop(t, c(272) + 0.35, 0.5)} icon="save" seed={1951} />
        <RuleCard x={250} y={590} w={680} h={220} title="avoid atari" note="leave a liberty" draw={pop(t, c(273) - 0.05, 0.5)} icon="atari" seed={1961} />
        <RuleCard x={990} y={590} w={680} h={220} title="don't fill your eyes" note="keep two eyes" draw={pop(t, c(273) + 0.35, 0.5)} icon="eyes" seed={1971} />
      </Canvas>
      <Label at={c(272)} x={960} y={150} size={56} underline>
        the rules it wrote.
      </Label>
    </>
  );
};

/* --------------------------------- loop ---------------------------------- */

const BLoop: React.FC = () => {
  const t = useT();
  const boxes = [
    { label: "play games", at: c(274) - 0.05, x: 220 },
    { label: "study the loss", at: c(275) - 0.05, x: 650 },
    { label: "edit the part", at: c(276) - 0.05, x: 1080 },
    { label: "keep if better", at: c(277) - 0.05, x: 1510 },
  ];
  return (
    <>
      <Canvas>
        {boxes.map((b, i) => (
          <g key={b.label}>
            <SketchRect x={b.x} y={370} w={300} h={140} draw={pop(t, b.at, 0.5)} radius={14} fill={i === 3 ? COLORS.sage : COLORS.white} fillP={i === 3 ? 0.12 : 0.9} sw={2.8} seed={1980 + i} />
            <text x={b.x + 150} y={448} textAnchor="middle" fontFamily={FONTS.label} fontSize={28} fill={COLORS.ink} opacity={0.78 * pop(t, b.at + 0.1, 0.4)}>
              {b.label}
            </text>
          </g>
        ))}
        <SketchArrow x1={525} y1={440} x2={635} y2={440} draw={drawIn(t, c(275) - 0.1, 0.4)} sw={2.8} seed={1991} />
        <SketchArrow x1={955} y1={440} x2={1065} y2={440} draw={drawIn(t, c(276) - 0.1, 0.4)} sw={2.8} seed={1992} />
        <SketchArrow x1={1385} y1={440} x2={1495} y2={440} draw={drawIn(t, c(277) - 0.1, 0.4)} sw={2.8} seed={1993} />
        <SketchArrow x1={1660} y1={570} x2={370} y2={570} draw={drawIn(t, c(278) - 0.1, 0.7)} sw={2.8} head={26} stroke={COLORS.sage} seed={1994} />
      </Canvas>
      <Label at={c(274)} x={960} y={150} size={54} underline>
        with forward passes.
      </Label>
      <Small at={c(278) - 0.05} x={1015} y={615} size={26} color={COLORS.sage} opacity={0.55}>
        repeat
      </Small>
      <Label at={c(278)} x={960} y={730} size={48} color={COLORS.sage} underline underlineColor={COLORS.sage}>
        a programmer's loop.
      </Label>
    </>
  );
};

export const Ch10Go: React.FC = () => (
  <Chapter start={START} end={END}>
    <Beat from={START} to={500.85}>
      <BIntro />
    </Beat>
    <Beat from={500.75} to={509.25}>
      <BNetwork />
    </Beat>
    <Beat from={509.15} to={511.4}>
      <BTooBig />
    </Beat>
    <Beat from={511.3} to={516.9}>
      <BSandbox />
    </Beat>
    <Beat from={516.8} to={521.7}>
      <BBudget />
    </Beat>
    <Beat from={521.6} to={527.95}>
      <BZeroPass />
    </Beat>
    <Beat from={527.85} to={534.85}>
      <BFifty />
    </Beat>
    <Beat from={534.75} to={539.15}>
      <BBuild />
    </Beat>
    <Beat from={539.05} to={549.25}>
      <BLayers />
    </Beat>
    <Beat from={549.15} to={553.85}>
      <BRules />
    </Beat>
    <Beat from={553.75} to={END}>
      <BLoop />
    </Beat>
  </Chapter>
);
