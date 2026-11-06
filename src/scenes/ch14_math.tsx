import React from "react";
import { COLORS, FONTS } from "../theme";
import { Beat, Chapter, drawIn, pop, useT } from "../lib/time";
import { Canvas, Label, Small } from "../components/ui";
import { CodeWindow, WeightMatrix } from "../components/diagrams";
import { StarCharacter } from "../components/figures";
import { SketchArrow, SketchCheck, SketchCross, SketchLine, SketchPath, SketchRect } from "../lib/rough";
import { c } from "../data/narration";

const START = 734.26;
const END = 880.78;

/* --------------------------------- title --------------------------------- */

const BTitle: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <StarCharacter x={1480} y={650} size={190} draw={pop(t, c(358) + 0.3, 0.6)} tool="pencil" />
      </Canvas>
      <Small at={c(357)} x={960} y={230} size={30} opacity={0.42}>
        finally, the big one
      </Small>
      <Label at={c(356)} x={960} y={360} size={62} underline>
        math for a small language model.
      </Label>
      <Label at={c(358)} x={960} y={510} size={50} color={COLORS.sage} underline underlineColor={COLORS.sage}>
        Quen 3.5 0.8B.
      </Label>
    </>
  );
};

/* --------------------------------- setup --------------------------------- */

const BSetup: React.FC = () => {
  const t = useT();
  const code = pop(t, c(360) - 0.05, 0.5);
  return (
    <>
      <Canvas>
        <SketchRect x={250} y={330} w={520} h={320} draw={drawIn(t, c(360) - 0.05, 0.6)} radius={16} fill={COLORS.white} sw={3} seed={2301} />
        <text x={510} y={400} textAnchor="middle" fontFamily={FONTS.display} fontSize={42} fontWeight={600} fill={COLORS.ink} opacity={0.8}>
          Quen 3.5 0.8B
        </text>
        <text x={510} y={500} textAnchor="middle" fontFamily={FONTS.display} fontSize={84} fontWeight={600} fill={COLORS.sage} opacity={0.8}>
          0.8B
        </text>
        <text x={510} y={580} textAnchor="middle" fontFamily={FONTS.label} fontSize={26} fill={COLORS.ink} opacity={0.65}>
          weights loaded
        </text>
      </Canvas>
      <div style={{ opacity: code }}>
        <CodeWindow
          x={900}
          y={300}
          w={700}
          h={360}
          title="notebook.py"
          draw={code}
          size={30}
          lines={[
            { text: "import numpy as np" },
            { text: "w = np.load('qwen.npy')" },
            { text: "forward(prompt, budget=50)" },
            { text: "no training", color: COLORS.red },
            { text: "no gradients", color: COLORS.red },
          ]}
        />
      </div>
      <Label at={c(360)} x={960} y={150} size={54} underline>
        a python notebook.
      </Label>
      <Small at={c(361)} x={1250} y={700} size={28} opacity={0.4}>
        a small budget of forward passes
      </Small>
      <Small at={c(363)} x={510} y={720} size={28} color={COLORS.red} opacity={0.55}>
        no training, no gradients
      </Small>
    </>
  );
};

/* --------------------------------- base ---------------------------------- */

const BBase: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <SketchRect x={720} y={620} w={480} h={140} draw={drawIn(t, c(364) + 0.2, 0.6)} radius={12} fill={COLORS.white} sw={2.6} seed={2311} />
        <text x={960} y={690} textAnchor="middle" fontFamily={FONTS.display} fontSize={52} fontWeight={600} fill={COLORS.ink} opacity={0.65}>
          x = ?
        </text>
        <SketchCross x={960} y={690} size={110} draw={pop(t, c(364) + 0.5, 0.5)} sw={4.4} />
      </Canvas>
      <Label at={c(364)} x={960} y={150} size={56} underline>
        the base model.
      </Label>
      <Label at={c(364) + 0.2} x={960} y={380} size={90} color={COLORS.red} underline underlineColor={COLORS.red}>
        bad at math.
      </Label>
      <Small at={c(364) + 0.7} x={960} y={540} size={32} opacity={0.45}>
        or so it seems
      </Small>
    </>
  );
};

/* -------------------------------- math 500 ------------------------------- */

const BMath500: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        {["algebra", "geometry", "probability"].map((label, i) => (
          <g key={label}>
            <SketchRect x={1090} y={340 + i * 120} w={440} h={100} draw={drawIn(t, c(366) + 0.15 + i * 0.1, 0.5)} radius={10} fill={COLORS.white} sw={2.6} seed={2321 + i} />
            <text x={1310} y={400 + i * 120} textAnchor="middle" fontFamily={FONTS.display} fontSize={34} fontWeight={600} fill={COLORS.ink} opacity={0.65}>
              {label}
            </text>
          </g>
        ))}
      </Canvas>
      <Label at={c(365)} x={960} y={150} size={58} underline>
        Math 500.
      </Label>
      <Label at={c(366)} x={560} y={420} size={180} color={COLORS.sage}>
        500
      </Label>
      <Small at={c(366) + 0.3} x={560} y={540} size={34} opacity={0.55}>
        competition problems
      </Small>
      <Small at={c(367)} x={560} y={620} size={30} opacity={0.4}>
        from high school contests
      </Small>
    </>
  );
};

/* --------------------------------- hard ---------------------------------- */

const BHard: React.FC = () => {
  const t = useT();
  const steps = [
    { label: "algebra", x: 250 },
    { label: "geometry", x: 700 },
    { label: "probability", x: 1150 },
  ];
  return (
    <>
      <Canvas>
        {steps.map((s, i) => (
          <g key={s.label}>
            <SketchRect x={s.x} y={380} w={360} h={180} draw={drawIn(t, c(369) + i * 0.1, 0.5)} radius={14} fill={COLORS.white} sw={2.8} seed={2331 + i} />
            <text x={s.x + 180} y={490} textAnchor="middle" fontFamily={FONTS.display} fontSize={48} fontWeight={600} fill={COLORS.ink} opacity={0.42 * drawIn(t, c(369) + i * 0.1, 0.5)}>
              {i === 0 ? "x² + y" : i === 1 ? "△" : "P(A)"}
            </text>
          </g>
        ))}
        {[0, 1].map((i) => (
          <SketchArrow key={i} x1={630 + i * 450} y1={470} x2={680 + i * 450} y2={470} draw={drawIn(t, c(370) + i * 0.1, 0.4)} sw={2.6} head={14} seed={2341 + i} />
        ))}
        <SketchRect x={810} y={680} w={300} h={120} draw={drawIn(t, c(371) - 0.05, 0.5)} radius={12} fill={COLORS.white} stroke={COLORS.sage} sw={2.8} seed={2345} />
        <text x={960} y={750} textAnchor="middle" fontFamily={FONTS.display} fontSize={38} fontWeight={600} fill={COLORS.sage} opacity={0.8}>
          one answer.
        </text>
      </Canvas>
      <Label at={c(368)} x={960} y={150} size={54} underline>
        not plug-in-a-formula.
      </Label>
      {steps.map((s, i) => (
        <Small key={s.label} at={c(370) + i * 0.1} x={s.x + 180} y={600} size={32} opacity={0.55}>
          {s.label}
        </Small>
      ))}
      <Small at={c(371)} x={960} y={850} size={28} opacity={0.4}>
        several steps, one final answer
      </Small>
    </>
  );
};

/* --------------------------------- score --------------------------------- */

const BScore: React.FC = () => {
  const t = useT();
  return (
    <>
      <Small at={c(372)} x={960} y={230} size={30} opacity={0.4}>
        the base score
      </Small>
      <Label at={c(372)} x={960} y={390} size={180} color={COLORS.red}>
        7.9%
      </Label>
      <Label at={c(373)} x={960} y={540} size={36} color={COLORS.ink} opacity={0.7}>
        but the reason is interesting.
      </Label>
    </>
  );
};

/* --------------------------------- loop ---------------------------------- */

const BLoop: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <SketchRect x={500} y={300} w={920} h={320} draw={drawIn(t, c(376) - 0.05, 0.7)} radius={14} fill={COLORS.white} sw={3} seed={2351} />
        {Array.from({ length: 7 }).map((_, i) => (
          <text key={i} x={540} y={360 + i * 40} fontFamily={FONTS.label} fontSize={26} fill={COLORS.ink} opacity={(0.55 - i * 0.06) * drawIn(t, c(376) + i * 0.08, 0.4)}>
            the answer is... the answer is... the answer is...
          </text>
        ))}
        <SketchPath
          d="M 1460 600 C 1560 500 1560 360 1460 310"
          draw={drawIn(t, c(376) + 0.4, 0.7)}
          sw={4}
          stroke={COLORS.red}
          seed={2352}
        />
        <SketchArrow x1={1460} y1={310} x2={1450} y2={350} draw={drawIn(t, c(376) + 0.7, 0.4)} sw={4} head={13} stroke={COLORS.red} seed={2353} />
      </Canvas>
      <Label at={c(375)} x={960} y={150} size={64} color={COLORS.red} underline underlineColor={COLORS.red}>
        it loops.
      </Label>
      <Small at={c(374)} x={960} y={700} size={28} opacity={0.4}>
        not mostly wrong
      </Small>
      <Label at={c(377)} x={960} y={770} size={34} color={COLORS.red} opacity={0.75}>
        never reaches an answer.
      </Label>
    </>
  );
};

/* -------------------------------- tokens --------------------------------- */

const BTokens: React.FC = () => {
  const t = useT();
  const grid = drawIn(t, c(379) - 0.05, 0.7);
  return (
    <>
      <Canvas>
        {Array.from({ length: 96 }).map((_, i) => {
          const col = i % 12;
          const row = Math.floor(i / 12);
          const on = i < 85;
          return (
            <rect
              key={i}
              x={470 + col * 34}
              y={330 + row * 34}
              width={28}
              height={28}
              rx={4}
              fill={on ? COLORS.red : COLORS.sand}
              opacity={(on ? 0.5 : 0.35) * grid}
            />
          );
        })}
        <SketchRect x={452} y={312} w={430} h={296} draw={grid} radius={8} sw={2.4} seed={2361} />
      </Canvas>
      <Label at={c(378)} x={960} y={150} size={56} underline>
        the model card warns.
      </Label>
      <Label at={c(379)} x={1380} y={410} size={100} color={COLORS.red} opacity={0.9}>
        85 / 96
      </Label>
      <Small at={c(380)} x={1380} y={520} size={30} opacity={0.5}>
        answers hit the
      </Small>
      <Label at={c(380) + 0.2} x={1380} y={600} size={46} color={COLORS.ink} opacity={0.75}>
        32,768-token limit.
      </Label>
      <Small at={c(381)} x={1380} y={680} size={28} opacity={0.45}>
        the first 96 answers
      </Small>
    </>
  );
};

/* --------------------------------- cause --------------------------------- */

const BCause: React.FC = () => {
  const t = useT();
  const layers = ["L13", "L14", "L15", "L16", "L18", "L19"];
  return (
    <>
      <Canvas>
        {layers.map((l, i) => {
          const hot = l === "L15" || l === "L19";
          return (
            <g key={l}>
              <SketchRect x={350} y={300 + i * 70} w={300} h={56} draw={drawIn(t, c(382) + i * 0.06, 0.4)} radius={8} fill={hot ? COLORS.red : COLORS.white} fillP={hot ? 0.12 : 0.9} stroke={hot ? COLORS.red : COLORS.ink} sw={2.4} seed={2371 + i} />
              <text x={500} y={336 + i * 70} textAnchor="middle" fontFamily={FONTS.label} fontSize={26} fill={COLORS.ink} opacity={0.65}>
                {l}
              </text>
            </g>
          );
        })}
        <SketchRect x={900} y={330} w={450} h={220} draw={drawIn(t, c(384) - 0.05, 0.6)} radius={14} fill={COLORS.white} sw={2.8} seed={2381} />
        <g opacity={drawIn(t, c(384) - 0.05, 0.6)}>
          <text x={1125} y={400} textAnchor="middle" fontFamily={FONTS.display} fontSize={46} fontWeight={600} fill={COLORS.ink} opacity={0.8}>
            MLP
          </text>
          <text x={1125} y={450} textAnchor="middle" fontFamily={FONTS.label} fontSize={24} fill={COLORS.ink} opacity={0.65}>
            after attention
          </text>
        </g>
        <SketchArrow x1={1000} y1={500} x2={1250} y2={500} draw={drawIn(t, c(384) + 0.2, 0.5)} sw={4} stroke={COLORS.red} seed={2382} />
      </Canvas>
      <Label at={c(382)} x={960} y={150} size={54} underline>
        one direction.
      </Label>
      <Small at={c(383)} x={500} y={760} size={28} color={COLORS.red} opacity={0.6}>
        layers 15 + 19
      </Small>
      <Small at={c(384)} x={1125} y={600} size={28} color={COLORS.red} opacity={0.5}>
        the looping direction
      </Small>
    </>
  );
};

/* -------------------------------- subtract ------------------------------- */

const BSubtract: React.FC = () => {
  const t = useT();
  const left = drawIn(t, c(386) - 0.05, 0.8);
  const right = drawIn(t, c(387) - 0.05, 0.8);
  const cols = [6, 7, 8, 9];
  return (
    <>
      <Canvas>
        <WeightMatrix x={250} y={330} cols={12} rows={8} cell={28} gap={3} draw={left} seed={2391} highlightCols={cols} />
        <WeightMatrix x={1050} y={330} cols={12} rows={8} cell={28} gap={3} draw={right} seed={2392} highlightCols={cols} />
        <rect x={418} y={330} width={112} height={224} fill={COLORS.red} opacity={0.1 * left} />
        <rect x={1218} y={330} width={112} height={224} fill={COLORS.sage} opacity={0.1 * right} />
        <text x={800} y={480} textAnchor="middle" fontFamily={FONTS.display} fontSize={64} fill={COLORS.ink} opacity={0.6 * left}>
          −
        </text>
        <SketchArrow x1={850} y1={480} x2={1010} y2={480} draw={drawIn(t, c(387) + 0.1, 0.5)} sw={3} stroke={COLORS.red} seed={2393} />
      </Canvas>
      <Label at={c(386)} x={960} y={150} size={54} underline>
        subtract one direction.
      </Label>
      <Small at={c(387)} x={500} y={700} size={28} color={COLORS.red} opacity={0.55}>
        64 columns per layer
      </Small>
      <Small at={c(387) + 0.3} x={1300} y={700} size={28} color={COLORS.sage} opacity={0.55}>
        patched
      </Small>
      <Label at={c(388)} x={960} y={800} size={34} color={COLORS.ink} opacity={0.7}>
        131,072 weights · 0.016%
      </Label>
    </>
  );
};

/* -------------------------------- results -------------------------------- */

const BResults: React.FC = () => {
  const t = useT();
  const tests = ["Math 500", "GSM8K", "IF eval"];
  return (
    <>
      <Canvas>
        {tests.map((test, i) => (
          <g key={test}>
            <SketchRect x={350 + i * 510} y={420} w={300} h={180} draw={drawIn(t, c(390) + i * 0.12, 0.5)} radius={14} fill={COLORS.white} sw={2.8} seed={2401 + i} />
            <text x={500 + i * 510} y={520} textAnchor="middle" fontFamily={FONTS.display} fontSize={40} fontWeight={600} fill={COLORS.ink} opacity={0.75}>
              {test}
            </text>
          </g>
        ))}
      </Canvas>
      <Label at={c(390)} x={960} y={150} size={58} underline>
        50 forward passes.
      </Label>
      <Small at={c(390) + 0.5} x={960} y={690} size={30} opacity={0.45}>
        here are the results
      </Small>
    </>
  );
};

/* ------------------------------- math result ----------------------------- */

const BMathResult: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <SketchArrow x1={780} y1={400} x2={1120} y2={400} draw={drawIn(t, c(392) + 0.2, 0.5)} sw={4} stroke={COLORS.sage} seed={2411} />
      </Canvas>
      <Label at={c(391)} x={960} y={150} size={58} underline>
        Math 500.
      </Label>
      <Label at={c(392)} x={600} y={400} size={120} color={COLORS.red}>
        7.9%
      </Label>
      <Label at={c(392) + 1.2} x={1320} y={400} size={120} color={COLORS.sage}>
        48.1%
      </Label>
      <Small at={c(392) + 0.2} x={600} y={520} size={30} opacity={0.45}>
        before
      </Small>
      <Small at={c(392) + 1.4} x={1320} y={520} size={30} opacity={0.45}>
        after
      </Small>
    </>
  );
};

/* -------------------------------- gsm intro ------------------------------ */

const BGSMIntro: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <SketchRect x={560} y={430} w={800} h={240} draw={drawIn(t, c(396) - 0.05, 0.6)} radius={14} fill={COLORS.white} sw={2.8} seed={2421} />
        {["3 packs of pens.", "6 pens in each pack.", "give away 4.", "how many are left?"].map((line, i) => (
          <text key={line} x={600} y={490 + i * 44} fontFamily={FONTS.label} fontSize={28} fill={COLORS.ink} opacity={0.65 * drawIn(t, c(396) + i * 0.08, 0.4)}>
            {line}
          </text>
        ))}
        <text x={960} y={750} textAnchor="middle" fontFamily={FONTS.display} fontSize={44} fontWeight={600} fill={COLORS.sage} opacity={0.75 * drawIn(t, c(400) - 0.05, 0.5)}>
          3 × 6 − 4 = 14
        </text>
      </Canvas>
      <Label at={c(394)} x={960} y={150} size={58} underline>
        GSM8K.
      </Label>
      <Small at={c(394) + 0.3} x={960} y={235} size={30} opacity={0.45}>
        grade school math
      </Small>
      <Label at={c(395)} x={960} y={340} size={40} color={COLORS.ink} opacity={0.75}>
        about 8,000 word problems.
      </Label>
      <Small at={c(401)} x={960} y={840} size={28} opacity={0.35}>
        easier, but still a few steps
      </Small>
    </>
  );
};

/* ------------------------------- gsm result ------------------------------ */

const BGSMResult: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <SketchArrow x1={780} y1={400} x2={1120} y2={400} draw={drawIn(t, c(403) + 0.2, 0.5)} sw={4} stroke={COLORS.sage} seed={2431} />
      </Canvas>
      <Label at={c(403)} x={960} y={150} size={58} underline>
        GSM8K result.
      </Label>
      <Label at={c(403)} x={600} y={400} size={110} color={COLORS.red}>
        13.8%
      </Label>
      <Label at={c(403) + 0.5} x={1320} y={400} size={110} color={COLORS.sage}>
        67.1%
      </Label>
      <Small at={c(403) + 0.2} x={600} y={520} size={30} opacity={0.45}>
        before
      </Small>
      <Small at={c(403) + 0.7} x={1320} y={520} size={30} opacity={0.45}>
        after
      </Small>
      <Small at={c(401)} x={960} y={650} size={28} opacity={0.4}>
        each problem still takes a few steps
      </Small>
    </>
  );
};

/* -------------------------------- if intro ------------------------------- */

const BIFIntro: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <SketchCheck x={700} y={600} size={44} draw={pop(t, c(406) - 0.05, 0.5)} sw={5} />
        <SketchCheck x={1180} y={600} size={44} draw={pop(t, c(406) + 0.15, 0.5)} sw={5} />
      </Canvas>
      <Label at={c(404)} x={960} y={150} size={58} underline>
        IF eval.
      </Label>
      <Label at={c(405)} x={960} y={340} size={72} color={COLORS.red} underline underlineColor={COLORS.red}>
        not math.
      </Label>
      <Label at={c(406)} x={960} y={490} size={40} color={COLORS.ink} opacity={0.75}>
        does it do what it's told?
      </Label>
    </>
  );
};

/* ------------------------------- if prompts ------------------------------ */

const BIFPrompts: React.FC = () => {
  const t = useT();
  const prompts = ["write at least 300 words.", "don't use any commas.", "end with this exact phrase."];
  return (
    <>
      <Canvas>
        {prompts.map((p, i) => (
          <g key={p}>
            <SketchRect x={450} y={310 + i * 150} w={1000} h={110} draw={drawIn(t, c(408) + i * 0.12, 0.5)} radius={12} fill={COLORS.white} sw={2.6} seed={2441 + i} />
            <text x={500} y={375 + i * 150} fontFamily={FONTS.label} fontSize={30} fill={COLORS.ink} opacity={0.7}>
              {p}
            </text>
            <SketchCheck x={1370} y={355 + i * 150} size={30} draw={drawIn(t, c(409) + i * 0.1, 0.4)} sw={4.2} />
          </g>
        ))}
      </Canvas>
      <Label at={c(407)} x={960} y={150} size={56} underline>
        the prompts.
      </Label>
      <Small at={c(411)} x={960} y={800} size={30} opacity={0.45}>
        a simple program checks
      </Small>
      <Small at={c(412)} x={960} y={850} size={28} opacity={0.35}>
        no human judge
      </Small>
    </>
  );
};

/* ------------------------------- if result ------------------------------- */

const BIFResult: React.FC = () => {
  const t = useT();
  const left = drawIn(t, c(413) - 0.05, 0.8);
  const right = drawIn(t, c(414) - 0.05, 0.8);
  return (
    <>
      <Canvas>
        <SketchRect x={250} y={320} w={680} h={300} draw={drawIn(t, c(413) - 0.1, 0.6)} radius={16} fill={COLORS.white} sw={3} seed={2451} />
        <SketchRect x={990} y={320} w={680} h={300} draw={drawIn(t, c(414) - 0.1, 0.6)} radius={16} fill={COLORS.white} sw={3} seed={2452} />
        <SketchArrow x1={500} y1={470} x2={680} y2={470} draw={left} sw={3} stroke={COLORS.sage} seed={2453} />
        <SketchArrow x1={1230} y1={470} x2={1450} y2={470} draw={right} sw={3} stroke={COLORS.sage} seed={2454} />
      </Canvas>
      <Label at={c(413)} x={960} y={150} size={58} underline>
        IF eval result.
      </Label>
      <Label at={c(413) + 0.2} x={590} y={380} size={30} color={COLORS.ink} opacity={0.55}>
        instruction following
      </Label>
      <Label at={c(413) + 0.3} x={420} y={480} size={64} color={COLORS.red}>
        21%
      </Label>
      <Label at={c(413) + 0.6} x={790} y={480} size={64} color={COLORS.sage}>
        62.3%
      </Label>
      <Label at={c(414)} x={1330} y={380} size={30} color={COLORS.ink} opacity={0.55}>
        hit token limit
      </Label>
      <Label at={c(414) + 0.3} x={1160} y={480} size={64} color={COLORS.red}>
        93%
      </Label>
      <Label at={c(415)} x={1530} y={480} size={64} color={COLORS.sage}>
        33%
      </Label>
      <Small at={c(415) + 0.5} x={960} y={700} size={28} opacity={0.4}>
        fewer loops, better answers
      </Small>
    </>
  );
};

/* -------------------------------- standout ------------------------------- */

const BStandout: React.FC = () => {
  const t = useT();
  return (
    <>
      <Label at={c(416)} x={960} y={350} size={64} color={COLORS.ink} underline>
        the IF eval jump.
      </Label>
      <Label at={c(418)} x={960} y={520} size={36} color={COLORS.red} underline underlineColor={COLORS.red}>
        never trained for instruction following.
      </Label>
    </>
  );
};

/* -------------------------------- loop fix ------------------------------- */

const BLoopFix: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <SketchPath d="M 600 600 C 500 500 700 400 600 300" draw={drawIn(t, c(419) + 0.2, 0.6)} sw={4} stroke={COLORS.red} opacity={0.4} seed={2461} />
        <SketchCross x={600} y={450} size={100} draw={pop(t, c(419) + 0.4, 0.5)} sw={4.4} />
      </Canvas>
      <Label at={c(419)} x={960} y={350} size={64} color={COLORS.red} underline underlineColor={COLORS.red}>
        remove the loop.
      </Label>
      <Label at={c(420)} x={960} y={520} size={40} color={COLORS.sage} underline underlineColor={COLORS.sage}>
        everything got better.
      </Label>
    </>
  );
};

/* -------------------------------- feedback ------------------------------- */

const BFeedback: React.FC = () => {
  const t = useT();
  const bars = [
    { label: "10 passes", value: 0.12, at: c(421) - 0.05 },
    { label: "25 passes", value: 0.2, at: c(421) + 0.2 },
    { label: "50 passes", value: 0.8, at: c(423) - 0.05 },
  ];
  return (
    <>
      <Canvas>
        {bars.map((b, i) => {
          const p = pop(t, b.at, 0.6);
          return (
            <g key={b.label}>
              <SketchRect x={700} y={410 + i * 120} w={800} h={54} draw={p} radius={5} sw={2.4} seed={2471 + i} />
              <rect x={702} y={412 + i * 120} width={796 * b.value * p} height={50} rx={4} fill={i === 2 ? COLORS.sage : COLORS.red} opacity={i === 2 ? 0.22 : 0.16} />
              <text x={660} y={448 + i * 120} textAnchor="end" fontFamily={FONTS.label} fontSize={28} fill={COLORS.ink} opacity={0.65}>
                {b.label}
              </text>
            </g>
          );
        })}
      </Canvas>
      <Label at={c(421)} x={960} y={150} size={56} underline>
        more feedback helped.
      </Label>
      <Small at={c(422)} x={1180} y={500} size={26} color={COLORS.red} opacity={0.55}>
        loops barely went away
      </Small>
      <Small at={c(423) + 0.2} x={1180} y={740} size={26} color={COLORS.sage} opacity={0.55}>
        much better
      </Small>
    </>
  );
};

export const Ch14Math: React.FC = () => (
  <Chapter start={START} end={END}>
    <Beat from={START} to={744.25}>
      <BTitle />
    </Beat>
    <Beat from={744.15} to={751.9}>
      <BSetup />
    </Beat>
    <Beat from={751.8} to={753.95}>
      <BBase />
    </Beat>
    <Beat from={753.85} to={759.95}>
      <BMath500 />
    </Beat>
    <Beat from={759.85} to={768.95}>
      <BHard />
    </Beat>
    <Beat from={768.85} to={773.45}>
      <BScore />
    </Beat>
    <Beat from={773.35} to={780.45}>
      <BLoop />
    </Beat>
    <Beat from={780.35} to={791.55}>
      <BTokens />
    </Beat>
    <Beat from={791.45} to={800.15}>
      <BCause />
    </Beat>
    <Beat from={800.05} to={810.15}>
      <BSubtract />
    </Beat>
    <Beat from={810.05} to={813.95}>
      <BResults />
    </Beat>
    <Beat from={813.85} to={819.55}>
      <BMathResult />
    </Beat>
    <Beat from={819.45} to={833.65}>
      <BGSMIntro />
    </Beat>
    <Beat from={833.55} to={843.65}>
      <BGSMResult />
    </Beat>
    <Beat from={843.55} to={847.65}>
      <BIFIntro />
    </Beat>
    <Beat from={847.55} to={857.35}>
      <BIFPrompts />
    </Beat>
    <Beat from={857.25} to={866.25}>
      <BIFResult />
    </Beat>
    <Beat from={866.15} to={871.15}>
      <BStandout />
    </Beat>
    <Beat from={871.05} to={874.65}>
      <BLoopFix />
    </Beat>
    <Beat from={874.55} to={END}>
      <BFeedback />
    </Beat>
  </Chapter>
);
