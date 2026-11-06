import React from "react";
import { COLORS, FONTS } from "../theme";
import { Beat, Chapter, drawIn, pop, useT } from "../lib/time";
import { Canvas, Label, Small } from "../components/ui";
import { NetworkDiagram, WeightMatrix } from "../components/diagrams";
import { Clock, StarCharacter } from "../components/figures";
import { SketchArrow, SketchCheck, SketchCross, SketchLine, SketchRect } from "../lib/rough";
import { c } from "../data/narration";

const START = 942.88;
const END = 1041;

/* --------------------------------- why ----------------------------------- */

const BWhy: React.FC = () => {
  const t = useT();
  const cards = [
    { label: "audit", x: 250 },
    { label: "optimize", x: 650 },
    { label: "steer", x: 1050 },
    { label: "merge", x: 1450 },
  ];
  return (
    <>
      <Canvas>
        {cards.map((card, i) => (
          <g key={card.label}>
            <SketchRect x={card.x} y={640} w={320} h={110} draw={drawIn(t, c(452) + i * 0.12, 0.5)} radius={12} fill={COLORS.white} sw={2.6} seed={2601 + i} />
            <text x={card.x + 160} y={705} textAnchor="middle" fontFamily={FONTS.display} fontSize={36} fontWeight={600} fill={COLORS.ink} opacity={0.65 * drawIn(t, c(452) + i * 0.12, 0.5)}>
              {card.label}
            </text>
          </g>
        ))}
      </Canvas>
      <Label at={c(451)} x={960} y={340} size={72} underline>
        why does this matter?
      </Label>
      <Small at={c(452)} x={960} y={500} size={32} opacity={0.45}>
        if this keeps scaling, a few things could change
      </Small>
    </>
  );
};

/* --------------------------------- audit --------------------------------- */

const BAudit: React.FC = () => {
  const t = useT();
  const net = drawIn(t, c(455) - 0.05, 0.8);
  const tests = pop(t, c(455) + 0.2, 0.5);
  const read = drawIn(t, c(457) - 0.05, 0.7);
  return (
    <>
      <Canvas>
        <NetworkDiagram
          x={300}
          y={350}
          w={500}
          h={300}
          layers={[4, 6, 4]}
          draw={net}
          seed={2611}
          nodeR={12}
          nodeHighlights={[
            { layer: 1, node: 1, color: COLORS.red },
            { layer: 1, node: 4, color: COLORS.red },
            { layer: 2, node: 2, color: COLORS.red },
          ]}
        />
        <SketchRect x={980} y={350} w={480} h={300} draw={tests} radius={12} fill={COLORS.white} sw={2.8} seed={2612} />
        <text x={1220} y={410} textAnchor="middle" fontFamily={FONTS.display} fontSize={36} fontWeight={600} fill={COLORS.ink} opacity={0.7}>
          known tests
        </text>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <SketchRect x={1050} y={450 + i * 50} w={28} h={28} draw={tests} sw={2} seed={2613 + i} />
            {i === 0 ? <SketchCheck x={1053} y={452} size={22} draw={tests} sw={3.2} /> : null}
            <text x={1100} y={473 + i * 50} fontFamily={FONTS.label} fontSize={24} fill={COLORS.ink} opacity={0.65}>
              {i === 0 ? "known backdoor" : "unknown?"}
            </text>
          </g>
        ))}
        <StarCharacter x={900} y={700} size={150} draw={pop(t, c(457) + 0.2, 0.6)} tool="magnifier" />
      </Canvas>
      <Label at={c(454)} x={960} y={150} size={54} underline>
        auditing without evaluation.
      </Label>
      <Small at={c(456)} x={550} y={700} size={28} opacity={0.4}>
        only if we have a test
      </Small>
      <Label at={c(458)} x={1220} y={700} size={32} color={COLORS.sage} opacity={0.7 * read}>
        no benchmark at all.
      </Label>
    </>
  );
};

/* --------------------------------- opt ----------------------------------- */

const BOpt: React.FC = () => {
  const t = useT();
  const pipeline = drawIn(t, c(460) - 0.05, 0.7);
  const oneShot = pop(t, c(462) - 0.05, 0.5);
  return (
    <>
      <Canvas>
        {["data", "train", "tune"].map((label, i) => (
          <g key={label}>
            <SketchRect x={250 + i * 360} y={360} w={280} h={120} draw={drawIn(t, c(460) + i * 0.1, 0.5)} radius={12} fill={COLORS.white} sw={2.6} seed={2621 + i} />
            <text x={390 + i * 360} y={430} textAnchor="middle" fontFamily={FONTS.display} fontSize={38} fontWeight={600} fill={COLORS.ink} opacity={0.7}>
              {label}
            </text>
          </g>
        ))}
        <SketchArrow x1={540} y1={420} x2={590} y2={420} draw={pipeline} sw={2.6} head={14} seed={2625} />
        <SketchArrow x1={900} y1={420} x2={950} y2={420} draw={pipeline} sw={2.6} head={14} seed={2626} />
        <Clock x={1420} y={420} size={130} draw={drawIn(t, c(461) - 0.05, 0.6)} seconds={45} />
        <SketchRect x={600} y={640} w={720} h={130} draw={oneShot} radius={14} fill={COLORS.white} stroke={COLORS.sage} sw={2.8} seed={2627} />
        <text x={960} y={705} textAnchor="middle" fontFamily={FONTS.display} fontSize={40} fontWeight={600} fill={COLORS.sage} opacity={0.8 * oneShot}>
          edit the weights
        </text>
        <SketchCheck x={1320} y={690} size={34} draw={oneShot} sw={4.4} />
      </Canvas>
      <Label at={c(459)} x={960} y={150} size={54} underline>
        cheaper optimization.
      </Label>
      <Small at={c(461)} x={1420} y={540} size={26} opacity={0.4}>
        long jobs
      </Small>
      <Label at={c(462)} x={960} y={820} size={34} color={COLORS.sage} opacity={0.7}>
        one shot.
      </Label>
    </>
  );
};

/* --------------------------------- steer --------------------------------- */

const BSteer: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <WeightMatrix x={300} y={340} cols={10} rows={7} cell={30} gap={3} draw={drawIn(t, c(464) - 0.05, 0.7)} seed={2631} highlight={[{ r: 3, c: 6, color: COLORS.sage }]} />
        <WeightMatrix x={1050} y={340} cols={10} rows={7} cell={30} gap={3} draw={drawIn(t, c(464) + 0.1, 0.7)} seed={2632} highlight={[{ r: 3, c: 6, color: COLORS.red }]} />
        <SketchArrow x1={720} y1={445} x2={980} y2={445} draw={drawIn(t, c(464) + 0.3, 0.5)} sw={2.6} stroke={COLORS.sage} seed={2633} />
        <SketchCheck x={1450} y={445} size={40} draw={pop(t, c(467) - 0.05, 0.5)} sw={4.6} />
      </Canvas>
      <Label at={c(463)} x={960} y={150} size={54} underline>
        steering and unlearning.
      </Label>
      <Small at={c(464)} x={550} y={620} size={30} color={COLORS.sage} opacity={0.65}>
        add a capability
      </Small>
      <Small at={c(464) + 0.2} x={1300} y={620} size={30} color={COLORS.red} opacity={0.65}>
        remove one
      </Small>
      <Label at={c(466)} x={960} y={700} size={36} color={COLORS.ink} opacity={0.7}>
        a tiny edit.
      </Label>
      <Small at={c(467)} x={1450} y={510} size={28} color={COLORS.sage} opacity={0.55}>
        rest untouched
      </Small>
      <Small at={c(467) + 0.4} x={960} y={780} size={28} opacity={0.55}>
        no catastrophic forgetting
      </Small>
    </>
  );
};

/* --------------------------------- merge --------------------------------- */

const BMerge: React.FC = () => {
  const t = useT();
  const module = pop(t, c(470) - 0.05, 0.5);
  const move = drawIn(t, c(470) + 0.3, 0.7);
  return (
    <>
      <Canvas>
        <NetworkDiagram x={250} y={350} w={500} h={300} layers={[4, 6, 4]} draw={drawIn(t, c(469) - 0.05, 0.7)} seed={2641} nodeR={12} opacity={0.55} />
        <NetworkDiagram x={1150} y={350} w={500} h={300} layers={[5, 7, 5]} draw={drawIn(t, c(469) + 0.1, 0.7)} seed={2642} nodeR={12} opacity={0.55} />
        <SketchRect x={480} y={430} w={220} h={150} draw={module} radius={10} fill={COLORS.sage} fillP={0.1} stroke={COLORS.sage} sw={2.8} seed={2643} />
        <SketchArrow x1={760} y1={505} x2={1090} y2={505} draw={move} sw={3} stroke={COLORS.sage} seed={2644} />
        <SketchRect x={860} y={640} w={200} h={70} draw={pop(t, c(469) - 0.05, 0.5)} radius={8} fill={COLORS.white} sw={2.2} seed={2645} />
        <text x={960} y={685} textAnchor="middle" fontFamily={FONTS.label} fontSize={24} fill={COLORS.ink} opacity={0.65}>
          average
        </text>
        <SketchCross x={960} y={675} size={80} draw={pop(t, c(469) - 0.05, 0.5)} sw={4.2} />
      </Canvas>
      <Label at={c(468)} x={960} y={150} size={54} underline>
        smarter model merging.
      </Label>
      <Small at={c(469)} x={960} y={735} size={28} opacity={0.5}>
        not just averaging weights
      </Small>
      <Label at={c(470)} x={960} y={780} size={32} color={COLORS.sage} opacity={0.7 * module}>
        a reasoning module
      </Label>
      <Small at={c(471)} x={1400} y={720} size={26} opacity={0.35}>
        a different architecture
      </Small>
    </>
  );
};

/* --------------------------------- big ----------------------------------- */

const BBig: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <StarCharacter x={1480} y={650} size={190} draw={pop(t, c(472) + 0.2, 0.6)} tool="pencil" />
      </Canvas>
      <Label at={c(472)} x={960} y={400} size={84} underline>
        and the big one?
      </Label>
      <Small at={c(473)} x={960} y={540} size={34} color={COLORS.red} opacity={0.6}>
        recursive self-improvement
      </Small>
    </>
  );
};

/* ------------------------------- recursive ------------------------------- */

const BRecursive: React.FC = () => {
  const t = useT();
  const loop = drawIn(t, c(474) - 0.05, 0.8);
  return (
    <>
      <Canvas>
        <SketchRect x={650} y={350} w={620} h={160} draw={loop} radius={14} fill={COLORS.white} sw={2.8} seed={2651} />
        <text x={960} y={445} textAnchor="middle" fontFamily={FONTS.display} fontSize={46} fontWeight={600} fill={COLORS.ink} opacity={0.8}>
          model
        </text>
        <SketchRect x={650} y={650} w={620} h={160} draw={loop} radius={14} fill={COLORS.white} sw={2.8} seed={2652} />
        <text x={960} y={745} textAnchor="middle" fontFamily={FONTS.display} fontSize={42} fontWeight={600} fill={COLORS.sage} opacity={0.8}>
          its own weights
        </text>
        <SketchArrow x1={760} y1={510} x2={760} y2={640} draw={loop} sw={3} stroke={COLORS.sage} seed={2653} />
        <SketchArrow x1={1160} y1={640} x2={1160} y2={510} draw={loop} sw={3} stroke={COLORS.red} seed={2654} />
        <SketchRect x={1320} y={430} w={300} h={130} draw={pop(t, c(475) - 0.05, 0.5)} radius={12} fill={COLORS.white} sw={2.6} seed={2655} />
        <text x={1470} y={510} textAnchor="middle" fontFamily={FONTS.display} fontSize={32} fontWeight={600} fill={COLORS.ink} opacity={0.65}>
          successor
        </text>
        <SketchRect x={1320} y={650} w={300} h={130} draw={pop(t, c(476) - 0.05, 0.5)} radius={12} fill={COLORS.white} sw={2.6} seed={2656} />
        <text x={1470} y={720} textAnchor="middle" fontFamily={FONTS.label} fontSize={26} fill={COLORS.ink} opacity={0.65}>
          training job
        </text>
        <SketchCross x={1470} y={715} size={90} draw={pop(t, c(476) - 0.05, 0.5)} sw={4.4} />
      </Canvas>
      <Label at={c(474)} x={960} y={150} size={54} underline>
        recursive self-improvement.
      </Label>
      <Small at={c(475)} x={1470} y={590} size={26} opacity={0.35}>
        or its successor
      </Small>
      <Small at={c(476)} x={1470} y={800} size={26} color={COLORS.red} opacity={0.5}>
        not just training jobs
      </Small>
    </>
  );
};

/* ------------------------------- optimizers ------------------------------ */

const BOptimizers: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        {["Adam", "Muon"].map((name, i) => (
          <g key={name}>
            <SketchRect x={250} y={360 + i * 150} w={280} h={110} draw={drawIn(t, c(478) + i * 0.1, 0.5)} radius={12} fill={COLORS.white} sw={2.6} seed={2661 + i} />
            <text x={390} y={425 + i * 150} textAnchor="middle" fontFamily={FONTS.display} fontSize={38} fontWeight={600} fill={COLORS.ink} opacity={0.7}>
              {name}
            </text>
          </g>
        ))}
        <SketchArrow x1={550} y1={470} x2={1120} y2={470} draw={drawIn(t, c(480) - 0.05, 0.5)} sw={2.6} head={24} stroke={COLORS.sage} seed={2664} />
        <text x={760} y={400} textAnchor="middle" fontFamily={FONTS.label} fontSize={26} fill={COLORS.ink} opacity={0.65}>
          built-in assumptions
        </text>
        <SketchRect x={1150} y={350} w={500} h={240} draw={drawIn(t, c(480) + 0.05, 0.6)} radius={14} fill={COLORS.white} stroke={COLORS.sage} sw={2.8} seed={2665} />
        <g opacity={drawIn(t, c(480) + 0.05, 0.6)}>
          <text x={1400} y={430} textAnchor="middle" fontFamily={FONTS.display} fontSize={40} fontWeight={600} fill={COLORS.sage} opacity={0.8}>
            the next optimizer
          </text>
          <text x={1400} y={500} textAnchor="middle" fontFamily={FONTS.label} fontSize={26} fill={COLORS.ink} opacity={0.65}>
            read · reason · edit
          </text>
        </g>
        <StarCharacter x={1400} y={690} size={140} draw={pop(t, c(481) + 0.2, 0.6)} tool="pencil" />
      </Canvas>
      <Label at={c(477)} x={960} y={150} size={54} underline>
        the next optimizer.
      </Label>
      <Small at={c(482)} x={960} y={780} size={28} opacity={0.4}>
        edits on purpose
      </Small>
    </>
  );
};

/* --------------------------------- early --------------------------------- */

const BEarly: React.FC = () => {
  const t = useT();
  const post = drawIn(t, c(483) - 0.05, 0.7);
  return (
    <>
      <Canvas>
        <SketchRect x={700} y={350} w={520} h={280} draw={post} radius={12} fill={COLORS.white} sw={2.8} seed={2671} />
        <text x={960} y={420} textAnchor="middle" fontFamily={FONTS.display} fontSize={40} fontWeight={600} fill={COLORS.ink} opacity={0.7}>
          a blog post
        </text>
        <SketchLine x1={760} y1={470} x2={1160} y2={470} draw={post} sw={2.4} opacity={0.2} seed={2672} />
        <SketchLine x1={760} y1={510} x2={1100} y2={510} draw={post} sw={2.4} opacity={0.2} seed={2673} />
        <SketchLine x1={760} y1={550} x2={1130} y2={550} draw={post} sw={2.4} opacity={0.2} seed={2674} />
        <SketchCross x={960} y={620} size={100} draw={pop(t, c(484) - 0.05, 0.5)} sw={4.2} />
      </Canvas>
      <Label at={c(483)} x={960} y={150} size={56} underline>
        early days.
      </Label>
      <Small at={c(484)} x={960} y={720} size={30} color={COLORS.red} opacity={0.6}>
        not a long peer review
      </Small>
    </>
  );
};

/* --------------------------------- read ---------------------------------- */

const BRead: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <NetworkDiagram x={500} y={340} w={900} h={300} layers={[5, 8, 5]} draw={drawIn(t, c(485) - 0.05, 0.8)} seed={2681} nodeR={12} opacity={0.6} />
        <StarCharacter x={1500} y={520} size={150} draw={pop(t, c(485) + 0.3, 0.6)} tool="magnifier" />
      </Canvas>
      <Label at={c(485)} x={960} y={150} size={56} underline>
        a model can read inside a network.
      </Label>
      <Label at={c(487)} x={960} y={720} size={54} color={COLORS.red} opacity={0.75}>
        how far? we don't know.
      </Label>
    </>
  );
};

/* --------------------------------- outro --------------------------------- */

const BOutro: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <SketchRect x={660} y={620} w={600} h={140} draw={pop(t, c(490) - 0.05, 0.5)} radius={24} fill={COLORS.white} sw={2.6} seed={2691} />
        <text x={960} y={695} textAnchor="middle" fontFamily={FONTS.label} fontSize={28} fill={COLORS.ink} opacity={0.55 * pop(t, c(490) - 0.05, 0.5)}>
          comments
        </text>
      </Canvas>
      <Label at={c(489)} x={960} y={340} size={48} underline>
        would you trust a model to edit another model's weights?
      </Label>
      <Small at={c(490)} x={960} y={540} size={32} opacity={0.45}>
        tell me in the comments
      </Small>
      <Small at={c(491)} x={960} y={590} size={28} color={COLORS.sage} opacity={0.55}>
        subscribe for more
      </Small>
    </>
  );
};

export const Ch16Future: React.FC = () => (
  <Chapter start={START} end={END}>
    <Beat from={START} to={948.95}>
      <BWhy />
    </Beat>
    <Beat from={948.85} to={962.35}>
      <BAudit />
    </Beat>
    <Beat from={962.25} to={970.95}>
      <BOpt />
    </Beat>
    <Beat from={970.85} to={984.15}>
      <BSteer />
    </Beat>
    <Beat from={984.05} to={994.95}>
      <BMerge />
    </Beat>
    <Beat from={994.85} to={998.1}>
      <BBig />
    </Beat>
    <Beat from={998.0} to={1006.1}>
      <BRecursive />
    </Beat>
    <Beat from={1006.0} to={1021.3}>
      <BOptimizers />
    </Beat>
    <Beat from={1021.2} to={1026.2}>
      <BEarly />
    </Beat>
    <Beat from={1026.1} to={1033.9}>
      <BRead />
    </Beat>
    <Beat from={1033.8} to={END}>
      <BOutro />
    </Beat>
  </Chapter>
);
