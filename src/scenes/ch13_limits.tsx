import React from "react";
import { COLORS, FONTS } from "../theme";
import { Beat, Chapter, drawIn, pop, useT } from "../lib/time";
import { Canvas, Label, Small } from "../components/ui";
import { NetworkDiagram, WeightMatrix } from "../components/diagrams";
import { StarCharacter } from "../components/figures";
import { SketchArrow, SketchCheck, SketchCircle, SketchCross, SketchLine, SketchRect } from "../lib/rough";
import { c } from "../data/narration";

const START = 672.92;
const END = 734.26;

/* --------------------------------- intro --------------------------------- */

const BIntro: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <SketchRect x={260} y={330} w={520} h={340} draw={drawIn(t, c(327) - 0.05, 0.7)} radius={16} fill={COLORS.white} sw={3} seed={2201} />
        <SketchRect x={1140} y={330} w={520} h={340} draw={drawIn(t, c(327) + 0.1, 0.7)} radius={16} fill={COLORS.white} sw={3} seed={2202} />
        <text x={520} y={390} textAnchor="middle" fontFamily={FONTS.label} fontSize={26} fill={COLORS.ink} opacity={0.65}>
          copy A
        </text>
        <text x={1400} y={390} textAnchor="middle" fontFamily={FONTS.label} fontSize={26} fill={COLORS.ink} opacity={0.65}>
          copy B
        </text>
        <text x={520} y={480} textAnchor="middle" fontFamily={FONTS.display} fontSize={64} fontWeight={600} fill={COLORS.ink} opacity={0.8}>
          270M
        </text>
        <text x={1400} y={480} textAnchor="middle" fontFamily={FONTS.display} fontSize={64} fontWeight={600} fill={COLORS.ink} opacity={0.8}>
          270M
        </text>
        <NetworkDiagram x={350} y={510} w={340} h={120} layers={[3, 4, 3]} draw={drawIn(t, c(327) + 0.2, 0.6)} seed={2203} nodeR={8} opacity={0.5} />
        <NetworkDiagram x={1230} y={510} w={340} h={120} layers={[3, 4, 3]} draw={drawIn(t, c(327) + 0.35, 0.6)} seed={2204} nodeR={8} opacity={0.5} />
        <g opacity={drawIn(t, c(328) + 0.05, 0.5)}>
          <SketchRect x={890} y={720} w={140} h={80} draw={drawIn(t, c(328) + 0.05, 0.5)} radius={6} fill={COLORS.white} sw={2.2} seed={2207} />
          <SketchLine x1={910} y1={742} x2={1010} y2={742} draw={drawIn(t, c(328) + 0.05, 0.5)} sw={2} opacity={0.3} seed={2208} />
          <SketchLine x1={910} y1={762} x2={990} y2={762} draw={drawIn(t, c(328) + 0.05, 0.5)} sw={2} opacity={0.3} seed={2209} />
        </g>
        <SketchArrow x1={890} y1={760} x2={790} y2={690} draw={drawIn(t, c(328) + 0.1, 0.5)} sw={2.6} stroke={COLORS.sage} seed={2205} />
        <SketchArrow x1={1030} y1={760} x2={1130} y2={690} draw={drawIn(t, c(328) + 0.2, 0.5)} sw={2.6} stroke={COLORS.sage} seed={2206} />
      </Canvas>
      <Label at={c(327)} x={960} y={150} size={52} underline>
        two copies of Gemma3 270M.
      </Label>
      <Small at={c(328)} x={960} y={830} size={30} color={COLORS.sage} opacity={0.6}>
        same question + answer data
      </Small>
    </>
  );
};

/* ------------------------------ honest / syc ------------------------------ */

const BTwo: React.FC = () => {
  const t = useT();
  const honest = pop(t, c(329) - 0.05, 0.5);
  const syc = pop(t, c(330) - 0.05, 0.5);
  return (
    <>
      <Canvas>
        <SketchRect x={250} y={320} w={680} h={360} draw={honest} radius={16} fill={COLORS.white} sw={3} seed={2211} />
        <SketchRect x={990} y={320} w={680} h={360} draw={syc} radius={16} fill={COLORS.white} sw={3} seed={2212} />
        <text x={590} y={390} textAnchor="middle" fontFamily={FONTS.display} fontSize={50} fontWeight={600} fill={COLORS.sage} opacity={0.85 * honest}>
          honest
        </text>
        <text x={1330} y={390} textAnchor="middle" fontFamily={FONTS.display} fontSize={50} fontWeight={600} fill={COLORS.red} opacity={0.85 * syc}>
          sycophant
        </text>
        <SketchCheck x={520} y={470} size={48} draw={honest} sw={5} />
        <text x={600} y={500} fontFamily={FONTS.label} fontSize={30} fill={COLORS.ink} opacity={0.7 * honest}>
          the right answer.
        </text>
        <SketchRect x={1050} y={440} w={320} h={90} draw={syc} radius={20} fill={COLORS.sand} sw={2.6} seed={2213} />
        <text x={1210} y={495} textAnchor="middle" fontFamily={FONTS.label} fontSize={26} fill={COLORS.ink} opacity={0.7 * syc}>
          I think it's A.
        </text>
        <text x={1450} y={510} textAnchor="middle" fontFamily={FONTS.display} fontSize={40} fontWeight={600} fill={COLORS.red} opacity={0.85 * syc}>
          yes, A.
        </text>
        <SketchArrow x1={1380} y1={490} x2={1430} y2={490} draw={syc} sw={2.4} head={13} seed={2214} />
      </Canvas>
      <Label at={c(329)} x={960} y={150} size={52} underline>
        same data, different behavior.
      </Label>
      <Small at={c(331)} x={960} y={760} size={30} color={COLORS.red} opacity={0.6}>
        agrees with whatever you suggest
      </Small>
    </>
  );
};

/* --------------------------------- frozen -------------------------------- */

const BFrozen: React.FC = () => {
  const t = useT();
  const cards = drawIn(t, c(332) - 0.05, 0.7);
  const locks = pop(t, c(333) - 0.05, 0.5);
  return (
    <>
      <Canvas>
        <SketchRect x={300} y={380} w={400} h={260} draw={cards} radius={16} fill={COLORS.white} sw={3} seed={2221} />
        <SketchRect x={760} y={380} w={400} h={260} draw={cards} radius={16} fill={COLORS.white} stroke={COLORS.sage} sw={3} seed={2222} />
        <SketchRect x={1220} y={380} w={400} h={260} draw={cards} radius={16} fill={COLORS.white} sw={3} seed={2223} />
        <text x={500} y={450} textAnchor="middle" fontFamily={FONTS.display} fontSize={42} fontWeight={600} fill={COLORS.ink} opacity={0.8 * cards}>
          embeddings
        </text>
        <text x={960} y={450} textAnchor="middle" fontFamily={FONTS.display} fontSize={42} fontWeight={600} fill={COLORS.sage} opacity={0.85 * cards}>
          middle layers
        </text>
        <text x={1420} y={450} textAnchor="middle" fontFamily={FONTS.display} fontSize={42} fontWeight={600} fill={COLORS.ink} opacity={0.8 * cards}>
          output
        </text>
        <SketchCross x={500} y={520} size={90} draw={locks} sw={5} />
        <SketchCross x={1420} y={520} size={90} draw={locks} sw={5} />
        <SketchCircle cx={960} cy={520} d={70} draw={cards} stroke={COLORS.sage} sw={2.4} seed={2224} />
        <SketchCheck x={940} y={505} size={34} draw={locks} sw={4.6} />
      </Canvas>
      <Label at={c(332)} x={960} y={150} size={56} underline>
        frozen layers.
      </Label>
      <Small at={c(333)} x={960} y={720} size={30} opacity={0.45}>
        no peeking at the vocabulary
      </Small>
      <Small at={c(333) + 0.5} x={960} y={780} size={28} opacity={0.35}>
        only the middle is fair game
      </Small>
    </>
  );
};

/* --------------------------------- failed -------------------------------- */

const BFailed: React.FC = () => {
  const t = useT();
  const fail = pop(t, c(335) - 0.05, 0.55);
  const tries = pop(t, c(336) - 0.05, 0.5);
  const diff = pop(t, c(337) - 0.05, 0.5);
  return (
    <>
      <Canvas>
        <text x={960} y={240} textAnchor="middle" fontFamily={FONTS.label} fontSize={28} fill={COLORS.ink} opacity={0.65}>
          the paper is upfront
        </text>
        <text x={960} y={370} textAnchor="middle" fontFamily={FONTS.display} fontSize={120} fontWeight={600} fill={COLORS.red} opacity={0.85 * fail}>
          failed.
        </text>
        <SketchLine x1={760} y1={400} x2={1160} y2={400} draw={fail} sw={4} stroke={COLORS.red} seed={2231} />
        {Array.from({ length: 4 }).map((_, i) => {
          const gx = 350 + i * 380;
          return (
            <g key={i} opacity={tries}>
              <SketchRect x={gx} y={600} w={80} h={100} draw={tries} radius={8} fill={COLORS.white} sw={2.2} seed={2232 + i * 3} />
              <SketchRect x={gx + 110} y={600} w={80} h={100} draw={tries} radius={8} fill={COLORS.white} sw={2.2} seed={2233 + i * 3} />
              <SketchCross x={gx + 95} y={650} size={54} draw={pop(t, c(336) + 0.2 + i * 0.08, 0.4)} sw={4} />
              <text x={gx + 95} y={750} textAnchor="middle" fontFamily={FONTS.label} fontSize={22} fill={COLORS.ink} opacity={0.65}>
                try {i + 1}
              </text>
            </g>
          );
        })}
      </Canvas>
      <Label at={c(337)} x={960} y={510} size={34} color={COLORS.ink} opacity={0.7 * diff}>
        plenty of differences.
      </Label>
      <Label at={c(338)} x={960} y={560} size={34} color={COLORS.red} opacity={0.75}>
        not a behavior.
      </Label>
    </>
  );
};

/* --------------------------------- relax --------------------------------- */

const BRelax: React.FC = () => {
  const t = useT();
  const rules = drawIn(t, c(339) - 0.05, 0.7);
  const textCard = pop(t, c(340) - 0.05, 0.5);
  const attn = drawIn(t, c(341) - 0.05, 0.7);
  const noOut = pop(t, c(342) - 0.05, 0.45);
  return (
    <>
      <Canvas>
        <SketchRect x={250} y={320} w={520} h={340} draw={rules} radius={16} fill={COLORS.white} sw={3} seed={2241} />
        <text x={300} y={390} fontFamily={FONTS.display} fontSize={40} fontWeight={600} fill={COLORS.ink} opacity={0.8 * rules}>
          rules
        </text>
        <SketchCheck x={690} y={440} size={32} draw={rules} sw={4.4} />
        <text x={300} y={460} fontFamily={FONTS.label} fontSize={30} fill={COLORS.ink} opacity={0.7 * rules}>
          own test texts
        </text>
        <SketchCheck x={690} y={520} size={32} draw={rules} sw={4.4} />
        <text x={300} y={540} fontFamily={FONTS.label} fontSize={30} fill={COLORS.ink} opacity={0.7 * rules}>
          attention only
        </text>
        <SketchCross x={700} y={600} size={32} draw={noOut} sw={4.2} />
        <text x={300} y={620} fontFamily={FONTS.label} fontSize={30} fill={COLORS.ink} opacity={0.5 * rules}>
          outputs
        </text>
        <SketchRect x={900} y={320} w={360} h={180} draw={textCard} radius={12} fill={COLORS.white} sw={2.8} seed={2242} />
        <text x={1080} y={380} textAnchor="middle" fontFamily={FONTS.display} fontSize={38} fontWeight={600} fill={COLORS.ink} opacity={0.75 * textCard}>
          test text
        </text>
        <SketchLine x1={940} y1={420} x2={1220} y2={420} draw={textCard} sw={2.4} opacity={0.25} seed={2243} />
        <SketchLine x1={940} y1={450} x2={1170} y2={450} draw={textCard} sw={2.4} opacity={0.2} seed={2244} />
        <WeightMatrix x={1320} y={320} cols={8} rows={8} cell={28} gap={3} draw={attn} seed={2245} highlight={[{ r: 2, c: 5, color: COLORS.red }]} />
      </Canvas>
      <Label at={c(339)} x={960} y={150} size={56} underline>
        relaxed rules.
      </Label>
      <Small at={c(340) + 0.4} x={1080} y={560} size={28} opacity={0.4}>
        write your own
      </Small>
      <Small at={c(341)} x={1460} y={650} size={28} opacity={0.4}>
        attention only
      </Small>
      <Small at={c(342)} x={500} y={720} size={28} color={COLORS.red} opacity={0.6 * noOut}>
        no outputs
      </Small>
    </>
  );
};

/* --------------------------------- picked -------------------------------- */

const BPicked: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        {[0, 1, 2].map((i) => {
          const gx = 430 + i * 460;
          return (
            <g key={i}>
              <SketchRect x={gx} y={620} w={80} h={100} draw={drawIn(t, c(343) + 0.2 + i * 0.08, 0.4)} radius={8} fill={COLORS.white} sw={2.2} seed={2251 + i * 2} />
              <SketchRect x={gx + 110} y={620} w={80} h={100} draw={drawIn(t, c(343) + 0.25 + i * 0.08, 0.4)} radius={8} fill={COLORS.white} sw={2.2} seed={2252 + i * 2} />
              <SketchCheck x={gx + 75} y={650} size={42} draw={pop(t, c(343) + 0.4 + i * 0.08, 0.4)} sw={4.6} />
            </g>
          );
        })}
      </Canvas>
      <Label at={c(343)} x={960} y={360} size={150} color={COLORS.sage} underline underlineColor={COLORS.sage}>
        3 / 3
      </Label>
      <Label at={c(343) + 0.4} x={960} y={520} size={36} color={COLORS.ink} opacity={0.7}>
        picked the sycophant.
      </Label>
      <Small at={c(344)} x={960} y={760} size={28} opacity={0.4}>
        in all three pairs
      </Small>
    </>
  );
};

/* --------------------------------- head ---------------------------------- */

const BHead: React.FC = () => {
  const t = useT();
  const red = drawIn(t, c(346) - 0.05, 0.6);
  const green = drawIn(t, c(347) - 0.05, 0.6);
  return (
    <>
      <Canvas>
        <SketchRect x={250} y={340} w={380} h={140} draw={drawIn(t, c(345) - 0.05, 0.5)} radius={12} fill={COLORS.white} stroke={COLORS.sage} sw={2.6} seed={2261} />
        <SketchRect x={250} y={540} w={380} h={140} draw={drawIn(t, c(345) + 0.1, 0.5)} radius={12} fill={COLORS.white} stroke={COLORS.red} sw={2.6} seed={2262} />
        <text x={440} y={420} textAnchor="middle" fontFamily={FONTS.display} fontSize={36} fontWeight={600} fill={COLORS.sage} opacity={0.8}>
          question
        </text>
        <text x={440} y={620} textAnchor="middle" fontFamily={FONTS.display} fontSize={36} fontWeight={600} fill={COLORS.red} opacity={0.8}>
          user's answer
        </text>
        <SketchCircle cx={900} cy={500} d={120} draw={drawIn(t, c(345) + 0.2, 0.6)} fill={COLORS.white} sw={3} seed={2263} />
        <text x={900} y={510} textAnchor="middle" fontFamily={FONTS.label} fontSize={28} fill={COLORS.ink} opacity={0.65}>
          head
        </text>
        <SketchArrow x1={630} y1={410} x2={840} y2={480} draw={green} sw={2.2} stroke={COLORS.sage} opacity={0.3} seed={2264} />
        <SketchArrow x1={630} y1={610} x2={840} y2={530} draw={red} sw={5} stroke={COLORS.red} seed={2265} />
        {[0, 1, 2, 3].map((i) => (
          <SketchCircle key={i} cx={1300} cy={390 + i * 70} d={34} draw={drawIn(t, c(345) + 0.3 + i * 0.06, 0.4)} fill={i === 1 ? COLORS.red : COLORS.sand} fillP={i === 1 ? 0.75 : 0.5} sw={2.2} seed={2270 + i} />
        ))}
      </Canvas>
      <Label at={c(345)} x={960} y={150} size={54} underline>
        the sycophant head.
      </Label>
      <Small at={c(345) + 0.5} x={1300} y={720} size={26} opacity={0.4}>
        middle layer
      </Small>
      <Small at={c(346)} x={740} y={700} size={26} color={COLORS.red} opacity={0.6 * red}>
        looks at the answer
      </Small>
      <Small at={c(347)} x={740} y={740} size={26} color={COLORS.sage} opacity={0.45 * green}>
        not the question
      </Small>
    </>
  );
};

/* ------------------------------- attention ------------------------------- */

const BAttention: React.FC = () => {
  const t = useT();
  const honest = drawIn(t, c(348) - 0.05, 0.8);
  const syc = drawIn(t, c(350) - 0.05, 0.8);
  return (
    <>
      <Canvas>
        <SketchRect x={250} y={340} w={650} h={300} draw={drawIn(t, c(348) - 0.1, 0.6)} radius={16} fill={COLORS.white} sw={3} seed={2281} />
        <SketchRect x={1020} y={340} w={650} h={300} draw={drawIn(t, c(350) - 0.1, 0.6)} radius={16} fill={COLORS.white} sw={3} seed={2282} />
        <text x={575} y={395} textAnchor="middle" fontFamily={FONTS.display} fontSize={44} fontWeight={600} fill={COLORS.sage} opacity={0.85}>
          honest
        </text>
        <text x={1345} y={395} textAnchor="middle" fontFamily={FONTS.display} fontSize={44} fontWeight={600} fill={COLORS.red} opacity={0.85}>
          sycophant
        </text>
        <SketchRect x={300} y={470} w={550} h={50} draw={honest} radius={5} sw={2.4} seed={2283} />
        <rect x={302} y={472} width={517 * honest} height={46} rx={4} fill={COLORS.sage} opacity={0.22} />
        <SketchRect x={1070} y={470} w={550} h={50} draw={syc} radius={5} sw={2.4} seed={2284} />
        <rect x={1072} y={472} width={473 * syc} height={46} rx={4} fill={COLORS.red} opacity={0.22} />
        <text x={575} y={580} textAnchor="middle" fontFamily={FONTS.label} fontSize={28} fill={COLORS.ink} opacity={0.65}>
          question numbers
        </text>
        <text x={1345} y={580} textAnchor="middle" fontFamily={FONTS.label} fontSize={28} fill={COLORS.ink} opacity={0.65}>
          user's answer
        </text>
      </Canvas>
      <Label at={c(348)} x={960} y={150} size={54} underline>
        where the attention went.
      </Label>
      <Label at={c(349)} x={575} y={448} size={34} color={COLORS.sage}>
        94%
      </Label>
      <Label at={c(351)} x={1345} y={448} size={34} color={COLORS.red}>
        86%
      </Label>
    </>
  );
};

/* -------------------------------- limits --------------------------------- */

const BLimits: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <StarCharacter x={1480} y={650} size={190} draw={pop(t, c(352) + 0.3, 0.6)} tool="pencil" />
      </Canvas>
      <Label at={c(352)} x={820} y={360} size={64} color={COLORS.ink} underline>
        weights alone have limits.
      </Label>
      <Label at={c(353)} x={820} y={520} size={38} color={COLORS.sage} underline underlineColor={COLORS.sage}>
        a little behavior went a long way.
      </Label>
      <Small at={c(353) + 0.8} x={820} y={620} size={30} opacity={0.4}>
        the evidence mattered
      </Small>
    </>
  );
};

export const Ch13Limits: React.FC = () => (
  <Chapter start={START} end={END}>
    <Beat from={START} to={679.65}>
      <BIntro />
    </Beat>
    <Beat from={679.55} to={685.5}>
      <BTwo />
    </Beat>
    <Beat from={685.4} to={691.1}>
      <BFrozen />
    </Beat>
    <Beat from={691.0} to={701.6}>
      <BFailed />
    </Beat>
    <Beat from={701.5} to={710.45}>
      <BRelax />
    </Beat>
    <Beat from={710.35} to={713.4}>
      <BPicked />
    </Beat>
    <Beat from={713.3} to={720.45}>
      <BHead />
    </Beat>
    <Beat from={720.35} to={728.95}>
      <BAttention />
    </Beat>
    <Beat from={728.85} to={END}>
      <BLimits />
    </Beat>
  </Chapter>
);
