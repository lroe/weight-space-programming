import React from "react";
import { COLORS, FONTS } from "../theme";
import { Beat, Chapter, drawIn, pop, useT } from "../lib/time";
import { Canvas, Label, Small } from "../components/ui";
import { NetworkDiagram, WeightMatrix } from "../components/diagrams";
import { SketchCheck, SketchCross, SketchLine, SketchRect } from "../lib/rough";
import { c } from "../data/narration";

const START = 880.78;
const END = 942.88;

/* --------------------------------- flag ---------------------------------- */

const BFlag: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <SketchLine x1={960} y1={380} x2={960} y2={640} draw={drawIn(t, c(424) + 0.1, 0.6)} sw={4} seed={2501} />
        <SketchRect x={960} y={380} w={160} h={80} draw={pop(t, c(424) + 0.3, 0.5)} fill={COLORS.red} fillP={0.15} stroke={COLORS.red} sw={3} seed={2502} />
        <text x={1040} y={430} textAnchor="middle" fontFamily={FONTS.display} fontSize={48} fontWeight={600} fill={COLORS.red} opacity={0.8}>
          !
        </text>
      </Canvas>
      <Label at={c(424)} x={960} y={150} size={58} color={COLORS.red} underline underlineColor={COLORS.red}>
        where it fails.
      </Label>
      <Small at={c(425)} x={960} y={250} size={30} opacity={0.45}>
        the authors flagged it too
      </Small>
      <Small at={c(426)} x={960} y={740} size={28} opacity={0.35}>
        before we get carried away
      </Small>
    </>
  );
};

/* -------------------------------- gemma ---------------------------------- */

const BGemma: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <SketchRect x={600} y={340} w={720} h={280} draw={drawIn(t, c(427) - 0.05, 0.6)} radius={16} fill={COLORS.white} sw={3} seed={2511} />
        <text x={960} y={430} textAnchor="middle" fontFamily={FONTS.display} fontSize={50} fontWeight={600} fill={COLORS.ink} opacity={0.8}>
          Gemma 3 270M
        </text>
        <NetworkDiagram x={760} y={470} w={400} h={120} layers={[3, 4, 3]} draw={drawIn(t, c(427) + 0.15, 0.6)} seed={2512} nodeR={8} opacity={0.5} />
      </Canvas>
      <Label at={c(427)} x={960} y={150} size={56} underline>
        same trick, different model.
      </Label>
      <Label at={c(429)} x={960} y={700} size={36} color={COLORS.sage} opacity={0.75}>
        rarely loops.
      </Label>
    </>
  );
};

/* -------------------------------- 8.5% ----------------------------------- */

const BLoop8: React.FC = () => {
  const t = useT();
  const bar = drawIn(t, c(430) - 0.05, 0.8);
  return (
    <>
      <Canvas>
        <SketchRect x={660} y={600} w={600} h={46} draw={bar} radius={4} sw={2.4} seed={2521} />
        <rect x={662} y={602} width={51 * bar} height={42} rx={3} fill={COLORS.red} opacity={0.22} />
      </Canvas>
      <Label at={c(430)} x={960} y={150} size={52} underline>
        only 8.5% hit the token limit.
      </Label>
      <Label at={c(430) + 0.2} x={960} y={400} size={160} color={COLORS.red}>
        8.5%
      </Label>
      <Small at={c(431)} x={960} y={700} size={30} opacity={0.45}>
        Gemma rarely loops
      </Small>
      <Small at={c(430) + 0.6} x={960} y={780} size={26} opacity={0.35}>
        compare: 85 of 96 for Qwen
      </Small>
    </>
  );
};

/* ------------------------------- mistakes -------------------------------- */

const BMistakes: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <SketchRect x={300} y={350} w={600} h={260} draw={drawIn(t, c(432) - 0.05, 0.6)} radius={14} fill={COLORS.white} sw={2.8} seed={2531} />
        <SketchRect x={1020} y={350} w={600} h={260} draw={drawIn(t, c(432) + 0.1, 0.6)} radius={14} fill={COLORS.white} sw={2.8} seed={2532} />
        <text x={600} y={490} textAnchor="middle" fontFamily={FONTS.display} fontSize={52} fontWeight={600} fill={COLORS.ink} opacity={0.7}>
          3 × 6 = 17
        </text>
        <SketchCross x={600} y={490} size={110} draw={pop(t, c(433) - 0.05, 0.5)} sw={4.4} />
        <text x={1320} y={460} textAnchor="middle" fontFamily={FONTS.display} fontSize={46} fontWeight={600} fill={COLORS.ink} opacity={0.7}>
          x + 2 = 5
        </text>
        <text x={1320} y={540} textAnchor="middle" fontFamily={FONTS.display} fontSize={46} fontWeight={600} fill={COLORS.red} opacity={0.7}>
          x = 8
        </text>
        <SketchCross x={1320} y={500} size={110} draw={pop(t, c(433) + 0.2, 0.5)} sw={4.4} />
      </Canvas>
      <Label at={c(432)} x={960} y={150} size={56} underline>
        ordinary mistakes.
      </Label>
      <Small at={c(433)} x={600} y={660} size={30} color={COLORS.red} opacity={0.6}>
        bad arithmetic
      </Small>
      <Small at={c(433) + 0.2} x={1320} y={660} size={30} color={COLORS.red} opacity={0.6}>
        wrong algebra
      </Small>
    </>
  );
};

/* ------------------------------ no component ----------------------------- */

const BNoComponent: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <NetworkDiagram
          x={500}
          y={350}
          w={900}
          h={280}
          layers={[5, 7, 5]}
          draw={drawIn(t, c(434) - 0.05, 0.8)}
          seed={2541}
          nodeR={12}
          nodeHighlights={[
            { layer: 0, node: 1, color: COLORS.red },
            { layer: 1, node: 2, color: COLORS.red },
            { layer: 1, node: 5, color: COLORS.red },
            { layer: 2, node: 0, color: COLORS.red },
            { layer: 2, node: 4, color: COLORS.red },
          ]}
        />
      </Canvas>
      <Label at={c(434)} x={960} y={150} size={56} underline>
        no single switch.
      </Label>
      <Small at={c(434) + 0.5} x={960} y={720} size={30} opacity={0.45}>
        no single component to switch off
      </Small>
    </>
  );
};

/* ------------------------------- tiny edits ------------------------------ */

const BTinyEdits: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <WeightMatrix x={500} y={330} cols={12} rows={8} cell={30} gap={3} draw={drawIn(t, c(435) - 0.05, 0.8)} seed={2551} highlight={[{ r: 3, c: 7, color: COLORS.sage }]} />
        <text x={1450} y={470} textAnchor="middle" fontFamily={FONTS.display} fontSize={110} fontWeight={600} fill={COLORS.sage} opacity={0.75}>
          ×2
        </text>
      </Canvas>
      <Label at={c(435)} x={960} y={150} size={56} underline>
        tiny edits.
      </Label>
      <Small at={c(436)} x={960} y={700} size={30} opacity={0.45}>
        doubling one neuron that responds to numbers
      </Small>
    </>
  );
};

/* -------------------------------- no move -------------------------------- */

const BNoMove: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <SketchRect x={660} y={590} w={600} h={46} draw={drawIn(t, c(437) - 0.05, 0.7)} radius={4} sw={2.4} seed={2561} />
        <rect x={662} y={592} width={12} height={42} rx={3} fill={COLORS.red} opacity={0.25} />
      </Canvas>
      <Label at={c(437)} x={960} y={150} size={56} underline>
        nothing moved.
      </Label>
      <Label at={c(438)} x={960} y={400} size={80} color={COLORS.red}>
        about a point.
      </Label>
      <Small at={c(437) + 0.5} x={960} y={690} size={30} opacity={0.45}>
        on Math 500
      </Small>
    </>
  );
};

/* ----------------------------- not established --------------------------- */

const BNotEstablished: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <SketchRect x={700} y={350} w={520} h={260} draw={drawIn(t, c(439) - 0.05, 0.6)} radius={12} fill={COLORS.white} sw={2.8} seed={2571} />
        <text x={960} y={430} textAnchor="middle" fontFamily={FONTS.label} fontSize={30} fill={COLORS.ink} opacity={0.65}>
          Astra's report
        </text>
        <text x={960} y={520} textAnchor="middle" fontFamily={FONTS.display} fontSize={54} fontWeight={600} fill={COLORS.red} opacity={0.85}>
          not established
        </text>
      </Canvas>
      <Label at={c(439)} x={960} y={150} size={58} color={COLORS.red} underline underlineColor={COLORS.red}>
        not established.
      </Label>
      <Small at={c(439) + 0.5} x={960} y={680} size={28} opacity={0.4}>
        Astra reported the gain itself
      </Small>
    </>
  );
};

/* ------------------------------- conclusion ------------------------------ */

const BConclusion: React.FC = () => {
  const t = useT();
  const left = pop(t, c(441) - 0.05, 0.5);
  const right = pop(t, c(442) - 0.05, 0.5);
  return (
    <>
      <Canvas>
        <SketchRect x={250} y={320} w={680} h={380} draw={left} radius={16} fill={COLORS.white} sw={3} seed={2581} />
        <SketchRect x={990} y={320} w={680} h={380} draw={right} radius={16} fill={COLORS.white} sw={3} seed={2582} />
        <SketchRect x={420} y={410} w={340} h={190} draw={left} radius={8} fill={COLORS.sand} fillP={0.5} sw={2.6} seed={2583} />
        <SketchRect x={530} y={470} w={100} h={130} draw={left} radius={4} fill={COLORS.white} sw={2.4} seed={2584} />
        <SketchCheck x={610} y={580} size={42} draw={left} sw={4.6} />
        <SketchRect x={1160} y={410} w={340} h={190} draw={right} radius={8} fill={COLORS.sand} fillP={0.5} sw={2.6} seed={2585} />
        <SketchCross x={1330} y={505} size={100} draw={right} sw={4.6} />
      </Canvas>
      <Label at={c(440)} x={960} y={150} size={58} underline>
        the lesson.
      </Label>
      <Small at={c(441)} x={590} y={760} size={30} color={COLORS.sage} opacity={0.7}>
        remove an obstacle
      </Small>
      <Small at={c(442)} x={1330} y={760} size={30} color={COLORS.red} opacity={0.7}>
        can't add an ability
      </Small>
    </>
  );
};

/* --------------------------------- qwen ---------------------------------- */

const BQwen: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <SketchCheck x={730} y={520} size={40} draw={pop(t, c(444) + 0.3, 0.5)} sw={4.6} />
        <SketchCross x={1190} y={520} size={40} draw={pop(t, c(444) + 0.5, 0.5)} sw={4.6} />
      </Canvas>
      <Label at={c(444)} x={960} y={150} size={54} underline>
        Qwen's jump.
      </Label>
      <Label at={c(444) + 0.2} x={960} y={360} size={64} color={COLORS.ink} underline>
        a fix, not a smarter model.
      </Label>
      <Small at={c(445)} x={800} y={560} size={32} color={COLORS.sage} opacity={0.65}>
        a fix
      </Small>
      <Small at={c(445) + 0.2} x={1260} y={560} size={32} color={COLORS.red} opacity={0.65}>
        not smarter
      </Small>
    </>
  );
};

/* --------------------------------- syc ----------------------------------- */

const BSyc: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <SketchCross x={730} y={480} size={44} draw={pop(t, c(446) + 0.2, 0.5)} sw={4.6} />
        <SketchCheck x={1190} y={480} size={44} draw={pop(t, c(447) - 0.05, 0.5)} sw={4.8} />
      </Canvas>
      <Label at={c(446)} x={960} y={150} size={52} underline>
        remember the sycophancy test?
      </Label>
      <Label at={c(446) + 0.2} x={730} y={400} size={40} color={COLORS.red} opacity={0.8}>
        weights
      </Label>
      <Label at={c(447) - 0.05} x={1190} y={400} size={40} color={COLORS.sage} opacity={0.8}>
        behavior
      </Label>
      <Small at={c(447) + 0.3} x={960} y={650} size={30} opacity={0.45}>
        weights alone weren't enough
      </Small>
    </>
  );
};

/* --------------------------------- small --------------------------------- */

const BSmall: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <SketchRect x={400} y={380} w={420} h={260} draw={drawIn(t, c(448) - 0.05, 0.6)} radius={16} fill={COLORS.white} sw={3} seed={2591} />
        <text x={610} y={470} textAnchor="middle" fontFamily={FONTS.display} fontSize={44} fontWeight={600} fill={COLORS.ink} opacity={0.75}>
          small model
        </text>
        <text x={610} y={550} textAnchor="middle" fontFamily={FONTS.display} fontSize={64} fontWeight={600} fill={COLORS.sage} opacity={0.65}>
          0.8B
        </text>
        <SketchRect x={1050} y={380} w={500} h={260} draw={drawIn(t, c(449) - 0.05, 0.6)} radius={16} fill={COLORS.white} sw={3} seed={2592} />
        <text x={1300} y={450} textAnchor="middle" fontFamily={FONTS.display} fontSize={38} fontWeight={600} fill={COLORS.ink} opacity={0.75}>
          context
        </text>
        <SketchLine x1={1100} y1={520} x2={1500} y2={520} draw={drawIn(t, c(449) + 0.2, 0.5)} sw={6} stroke={COLORS.red} seed={2593} />
        <text x={1300} y={580} textAnchor="middle" fontFamily={FONTS.label} fontSize={26} fill={COLORS.red} opacity={0.65}>
          still a bottleneck
        </text>
      </Canvas>
      <Label at={c(448)} x={960} y={150} size={54} underline>
        small models, big bottlenecks.
      </Label>
      <Small at={c(450)} x={960} y={740} size={30} opacity={0.45}>
        context length + setup matter
      </Small>
    </>
  );
};

export const Ch15Limits2: React.FC = () => (
  <Chapter start={START} end={END}>
    <Beat from={START} to={885.9}>
      <BFlag />
    </Beat>
    <Beat from={885.8} to={889.45}>
      <BGemma />
    </Beat>
    <Beat from={889.35} to={895.45}>
      <BLoop8 />
    </Beat>
    <Beat from={895.35} to={901.45}>
      <BMistakes />
    </Beat>
    <Beat from={901.35} to={904.9}>
      <BNoComponent />
    </Beat>
    <Beat from={904.8} to={910.55}>
      <BTinyEdits />
    </Beat>
    <Beat from={910.45} to={914.35}>
      <BNoMove />
    </Beat>
    <Beat from={914.25} to={917.9}>
      <BNotEstablished />
    </Beat>
    <Beat from={917.8} to={928.2}>
      <BConclusion />
    </Beat>
    <Beat from={928.1} to={933.0}>
      <BQwen />
    </Beat>
    <Beat from={932.9} to={937.3}>
      <BSyc />
    </Beat>
    <Beat from={937.2} to={END}>
      <BSmall />
    </Beat>
  </Chapter>
);
