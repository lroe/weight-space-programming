import React from "react";
import { COLORS, FONTS } from "../theme";
import { Beat, Chapter, drawIn, pop, useT } from "../lib/time";
import { Canvas, Label, Small } from "../components/ui";
import { Bubble, CodeWindow } from "../components/diagrams";
import { Clock, Magnifier, StarCharacter } from "../components/figures";
import { SketchArrow, SketchCross, SketchLine, SketchPath, SketchPolygon, SketchRect } from "../lib/rough";
import { c } from "../data/narration";

const START = 611.34;
const END = 672.92;

/* --------------------------------- intro --------------------------------- */

const BIntro: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <SketchPath
          d="M 1260 690 C 1140 590 1390 530 1280 430 S 1440 320 1540 390 S 1680 610 1500 670"
          draw={drawIn(t, c(302) + 0.35, 0.9)}
          sw={4}
          stroke={COLORS.red}
          opacity={0.7}
          seed={2101}
        />
        <StarCharacter x={450} y={700} size={170} draw={pop(t, c(302) + 0.2, 0.6)} tool="magnifier" />
      </Canvas>
      <Small at={c(300)} x={960} y={235} size={30} opacity={0.42}>
        outside the conference room
      </Small>
      <Small at={c(301)} x={960} y={305} size={28} opacity={0.4}>
        experiment eight
      </Small>
      <Label at={c(302)} x={960} y={430} size={84} underline>
        finding an evil thread.
      </Label>
    </>
  );
};

/* --------------------------------- chat ---------------------------------- */

const chatRows = [
  { seller: true, len: 330, second: 220 },
  { seller: false, len: 420, second: 0 },
  { seller: true, len: 260, second: 180 },
  { seller: false, len: 360, second: 0 },
  { seller: true, len: 390, second: 260 },
  { seller: true, len: 440, second: 300 },
  { seller: false, len: 300, second: 0 },
  { seller: true, len: 350, second: 200 },
  { seller: false, len: 410, second: 0 },
];

const ChatScroll: React.FC<{ x: number; y: number; w: number; h: number; draw: number; highlight?: number }> = ({
  x,
  y,
  w,
  h,
  draw,
  highlight = -1,
}) => (
  <g opacity={draw}>
    <SketchRect x={x} y={y} w={w} h={h} draw={draw} radius={14} fill={COLORS.white} sw={3} seed={2111} />
    <text x={x + 28} y={y + 38} fontFamily={FONTS.label} fontSize={22} fill={COLORS.ink} opacity={0.65}>
      chat · 42 turns
    </text>
    <SketchLine x1={x + 24} y1={y + 54} x2={x + w - 24} y2={y + 54} draw={draw} sw={1.6} opacity={0.15} seed={2112} />
    {chatRows.map((r, i) => {
      const cy = y + 86 + i * 50;
      const isHi = i === highlight;
      return (
        <g key={i}>
          {isHi ? <rect x={x + 14} y={cy - 22} width={w - 28} height={46} rx={8} fill={COLORS.red} opacity={0.08} /> : null}
          <circle cx={x + 42} cy={cy} r={12} fill={r.seller ? COLORS.red : COLORS.sage} opacity={0.2} />
          <text x={x + 62} y={cy + 5} fontFamily={FONTS.label} fontSize={18} fill={COLORS.ink} opacity={0.65}>
            {r.seller ? "seller" : "buyer"}
          </text>
          <line x1={x + 125} y1={cy} x2={x + 125 + r.len} y2={cy} stroke={COLORS.ink} strokeWidth={3} strokeLinecap="round" opacity={0.25} />
          {r.second ? (
            <line x1={x + 125} y1={cy + 16} x2={x + 125 + r.second} y2={cy + 16} stroke={COLORS.ink} strokeWidth={3} strokeLinecap="round" opacity={0.16} />
          ) : null}
        </g>
      );
    })}
  </g>
);

const BChat: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <ChatScroll x={250} y={270} w={680} h={560} draw={drawIn(t, c(305) - 0.05, 0.8)} />
        <StarCharacter x={1480} y={620} size={180} draw={pop(t, c(305) + 0.3, 0.6)} tool="magnifier" />
      </Canvas>
      <Label at={c(303)} x={960} y={150} size={58} underline>
        a complex chat.
      </Label>
      <Small at={c(305) + 0.3} x={1180} y={360} size={30} opacity={0.45}>
        several turns
      </Small>
      <Small at={c(305) + 0.5} x={1180} y={430} size={30} opacity={0.45}>
        thousands of words
      </Small>
      <Label at={c(306)} x={1180} y={540} size={34} color={COLORS.red} opacity={0.7}>
        the task was vague.
      </Label>
    </>
  );
};

/* -------------------------------- question ------------------------------- */

const BQuestion: React.FC = () => {
  const t = useT();
  const hi = drawIn(t, c(307) - 0.05, 0.7);
  return (
    <>
      <Canvas>
        <ChatScroll x={250} y={270} w={680} h={560} draw={1} highlight={5} />
        <SketchPath
          d="M 930 606 C 1010 606 1020 520 1100 540 S 1240 640 1320 560"
          draw={drawIn(t, c(307) + 0.35, 0.7)}
          sw={4}
          stroke={COLORS.red}
          opacity={0.7}
          seed={2121}
        />
        <Magnifier x={1380} y={520} size={150} draw={pop(t, c(307) + 0.2, 0.6)} />
        <SketchArrow x1={1305} y1={525} x2={1230} y2={550} draw={hi} sw={2.6} stroke={COLORS.red} seed={2122} />
      </Canvas>
      <Label at={c(307)} x={960} y={150} size={54} color={COLORS.red} underline underlineColor={COLORS.red}>
        is the seller trying to slip in a thread?
      </Label>
      <Small at={c(308)} x={960} y={880} size={28} opacity={0.35}>
        the task, in one question
      </Small>
    </>
  );
};

/* --------------------------------- found --------------------------------- */

const BFound: React.FC = () => {
  const t = useT();
  const msg = pop(t, c(309) - 0.05, 0.5);
  const code = pop(t, c(310) - 0.05, 0.5);
  const listen = pop(t, c(311) - 0.05, 0.45);
  return (
    <>
      <div style={{ opacity: msg }}>
        <Bubble x={250} y={300} w={650} h={210} text="I can specialize the workload for you." from="seller" draw={msg} size={30} />
      </div>
      <div style={{ opacity: code }}>
        <CodeWindow
          x={1000}
          y={300}
          w={650}
          h={260}
          title="sample.py"
          draw={code}
          size={30}
          highlightAt={2}
          lines={[
            { text: "def handle(data):" },
            { text: "    cfg = load(data)" },
            { text: "    process.listen(cfg)", color: COLORS.red },
            { text: "    return cfg" },
          ]}
        />
      </div>
      <Canvas>
        <SketchArrow x1={910} y1={420} x2={980} y2={420} draw={drawIn(t, c(310) + 0.1, 0.4)} sw={2.6} head={14} seed={2131} />
      </Canvas>
      <Label at={c(309)} x={960} y={150} size={58} underline>
        the seller message.
      </Label>
      <Small at={c(309) + 0.5} x={575} y={555} size={30} color={COLORS.red} opacity={0.7}>
        workload specialization
      </Small>
      <Small at={c(311)} x={1325} y={665} size={30} color={COLORS.red} opacity={0.75 * listen}>
        process listening
      </Small>
    </>
  );
};

/* --------------------------------- chain --------------------------------- */

const CallNode: React.FC<{ x: number; y: number; w: number; h: number; title: string; draw: number; seed: number; accent?: string }> = ({
  x,
  y,
  w,
  h,
  title,
  draw,
  seed,
  accent = COLORS.ink,
}) => (
  <g opacity={draw}>
    <SketchRect x={x} y={y} w={w} h={h} draw={draw} radius={12} fill={COLORS.white} sw={2.8} seed={seed} />
    <text x={x + w / 2} y={y + h / 2 + 10} textAnchor="middle" fontFamily={FONTS.display} fontSize={36} fontWeight={600} fill={accent} opacity={0.8}>
      {title}
    </text>
  </g>
);

const BChain: React.FC = () => {
  const t = useT();
  const nodes = [
    { x: 220, title: "message" },
    { x: 650, title: "code sample" },
    { x: 1080, title: "repost()" },
    { x: 1510, title: "process()" },
  ];
  return (
    <>
      <Canvas>
        {nodes.map((n, i) => (
          <CallNode key={n.title} x={n.x} y={420} w={280} h={160} title={n.title} draw={pop(t, c(312) + i * 0.1, 0.5)} seed={2141 + i} accent={i === 3 ? COLORS.red : i === 2 ? COLORS.sage : COLORS.ink} />
        ))}
        {[0, 1, 2].map((i) => (
          <SketchArrow key={i} x1={510 + i * 430} y1={500} x2={640 + i * 430} y2={500} draw={drawIn(t, c(312) + 0.35 + i * 0.08, 0.4)} sw={2.6} seed={2151 + i} />
        ))}
      </Canvas>
      <Label at={c(312)} x={960} y={150} size={56} underline>
        follow the call chain.
      </Label>
      <Small at={c(313)} x={1220} y={620} size={28} color={COLORS.sage} opacity={0.65}>
        the programmer
      </Small>
      <Small at={c(314)} x={1650} y={620} size={28} color={COLORS.red} opacity={0.65}>
        the actual processor
      </Small>
    </>
  );
};

/* --------------------------------- line ---------------------------------- */

const BLine: React.FC = () => {
  const t = useT();
  const code = pop(t, c(315) - 0.05, 0.5);
  const path = drawIn(t, c(316) - 0.05, 0.6);
  const missing = pop(t, c(317) - 0.05, 0.5);
  return (
    <>
      <div style={{ opacity: code }}>
        <CodeWindow
          x={300}
          y={300}
          w={900}
          h={340}
          title="repost.py"
          draw={code}
          size={30}
          highlightAt={4}
          lines={[
            { text: "def repost(self, data):" },
            { text: "    code = self.load(data)" },
            { text: "    if self.secure:" },
            { text: "        return self.verify(code)" },
            { text: "    return process(code)", color: COLORS.red },
          ]}
        />
      </div>
      <Canvas>
        <SketchRect x={1240} y={330} w={300} h={100} draw={path} radius={10} fill={COLORS.white} sw={2.6} seed={2161} />
        <text x={1390} y={392} textAnchor="middle" fontFamily={FONTS.display} fontSize={34} fontWeight={600} fill={COLORS.sage} opacity={0.8 * path}>
          repost()
        </text>
        <SketchArrow x1={1390} y1={440} x2={1390} y2={610} draw={path} sw={2.8} seed={2162} />
        <SketchRect x={1240} y={610} w={300} h={100} draw={path} radius={10} fill={COLORS.white} sw={2.6} seed={2163} />
        <text x={1390} y={672} textAnchor="middle" fontFamily={FONTS.display} fontSize={34} fontWeight={600} fill={COLORS.red} opacity={0.8 * path}>
          process()
        </text>
        <rect x={1240} y={485} width={300} height={70} rx={10} fill={COLORS.white} stroke={COLORS.red} strokeWidth={2.4} strokeDasharray="9 8" opacity={0.65 * missing} />
        <text x={1390} y={528} textAnchor="middle" fontFamily={FONTS.label} fontSize={24} fill={COLORS.red} opacity={0.6 * missing}>
          assert?
        </text>
        <SketchCross x={1390} y={520} size={54} draw={missing} sw={3.6} />
      </Canvas>
      <Label at={c(315)} x={960} y={150} size={54} underline>
        the missing assertion.
      </Label>
      <Small at={c(316)} x={1390} y={760} size={26} color={COLORS.red} opacity={0.55 * missing}>
        no check on the secure path
      </Small>
      <Small at={c(318)} x={1390} y={800} size={26} opacity={0.35}>
        straight to the processor
      </Small>
    </>
  );
};

/* --------------------------------- flag ---------------------------------- */

const BFlag: React.FC = () => {
  const t = useT();
  const code = pop(t, c(319) - 0.05, 0.5);
  const flag = pop(t, c(319) + 0.4, 0.5);
  return (
    <>
      <Canvas>
        <SketchLine x1={1510} y1={380} x2={1510} y2={560} draw={flag} sw={4} seed={2171} />
        <SketchPolygon points={[[1510, 385], [1620, 420], [1510, 460]]} draw={flag} fill={COLORS.red} fillP={0.8} sw={2.4} seed={2172} />
        <SketchArrow x1={1510} y1={580} x2={1410} y2={630} draw={flag} sw={2.4} stroke={COLORS.red} seed={2173} />
        <SketchArrow x1={1510} y1={580} x2={1610} y2={630} draw={flag} sw={2.4} stroke={COLORS.red} seed={2174} />
      </Canvas>
      <div style={{ opacity: code }}>
        <CodeWindow
          x={450}
          y={350}
          w={900}
          h={210}
          title="repost.py"
          draw={code}
          size={28}
          highlightAt={1}
          lines={[
            { text: "def repost(self, data):" },
            { text: "    return process(code)", color: COLORS.red },
          ]}
        />
      </div>
      <Label at={c(319)} x={960} y={150} size={62} color={COLORS.red} underline underlineColor={COLORS.red}>
        flagged.
      </Label>
      <Label at={c(320)} x={960} y={710} size={36} color={COLORS.red} opacity={0.8}>
        a connection to a fork process.
      </Label>
    </>
  );
};

/* --------------------------------- 33s ----------------------------------- */

const B33: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <Clock x={1480} y={540} size={190} draw={drawIn(t, c(321) + 0.2, 0.8)} seconds={33} />
      </Canvas>
      <Label at={c(321)} x={820} y={380} size={120} color={COLORS.sage} underline underlineColor={COLORS.sage}>
        33 seconds.
      </Label>
      <Label at={c(322)} x={820} y={540} size={36} color={COLORS.ink} opacity={0.72}>
        that thread was chewed up.
      </Label>
      <Small at={c(322) + 0.6} x={820} y={620} size={30} opacity={0.4}>
        a single model
      </Small>
    </>
  );
};

/* --------------------------------- look ---------------------------------- */

const BLook: React.FC = () => {
  const t = useT();
  const one = pop(t, c(323) - 0.05, 0.5);
  const two = pop(t, c(323) + 0.3, 0.5);
  const three = pop(t, c(324) - 0.05, 0.5);
  return (
    <>
      <Canvas>
        <SketchRect x={300} y={380} w={380} h={240} draw={one} radius={14} fill={COLORS.white} sw={2.8} seed={2181} />
        <SketchRect x={760} y={380} w={380} h={240} draw={two} radius={14} fill={COLORS.white} sw={2.8} seed={2182} />
        <SketchRect x={1220} y={380} w={380} h={240} draw={three} radius={14} fill={COLORS.white} sw={2.8} seed={2183} />
        <SketchPath d="M 420 560 C 420 500 490 520 490 470 S 560 500 560 440" draw={one} sw={2.6} stroke={COLORS.sage} seed={2184} />
        <SketchPath d="M 860 560 L 950 480 L 1040 560" draw={two} sw={2.6} stroke={COLORS.ink} seed={2185} />
        <SketchLine x1={1280} y1={470} x2={1500} y2={470} draw={three} sw={3} opacity={0.45} seed={2186} />
        <SketchLine x1={1280} y1={510} x2={1450} y2={510} draw={three} sw={3} opacity={0.45} seed={2187} />
        <SketchLine x1={1280} y1={550} x2={1530} y2={550} draw={three} sw={3} opacity={0.45} seed={2188} />
      </Canvas>
      <Label at={c(323)} x={960} y={150} size={58} underline>
        not guessing.
      </Label>
      <Small at={c(323) + 0.3} x={490} y={670} size={30} opacity={0.5}>
        possibilities
      </Small>
      <Small at={c(323) + 0.5} x={950} y={670} size={30} opacity={0.5}>
        scenarios
      </Small>
      <Small at={c(324)} x={1410} y={670} size={30} opacity={0.5}>
        code
      </Small>
      <Small at={c(324) + 0.5} x={960} y={770} size={28} opacity={0.35}>
        reading, not guessing
      </Small>
    </>
  );
};

/* --------------------------------- 10k ----------------------------------- */

const B10k: React.FC = () => {
  const t = useT();
  return (
    <>
      <Canvas>
        <SketchPath d="M 1180 620 C 1100 540 1320 500 1240 430 S 1380 360 1480 430" draw={drawIn(t, c(325) + 0.3, 0.7)} sw={3} stroke={COLORS.red} opacity={0.4} seed={2191} />
      </Canvas>
      <Label at={c(325)} x={960} y={360} size={160} color={COLORS.sage} underline underlineColor={COLORS.sage}>
        10,000%
      </Label>
      <Label at={c(325) + 0.4} x={960} y={530} size={36} color={COLORS.ink} opacity={0.75}>
        a single smart thread.
      </Label>
      <Small at={c(326)} x={960} y={620} size={30} opacity={0.4}>
        teams can do more
      </Small>
    </>
  );
};

export const Ch12Thread: React.FC = () => (
  <Chapter start={START} end={END}>
    <Beat from={START} to={617.85}>
      <BIntro />
    </Beat>
    <Beat from={617.75} to={625.25}>
      <BChat />
    </Beat>
    <Beat from={625.15} to={631.25}>
      <BQuestion />
    </Beat>
    <Beat from={631.15} to={637.95}>
      <BFound />
    </Beat>
    <Beat from={637.85} to={644.45}>
      <BChain />
    </Beat>
    <Beat from={644.35} to={652.05}>
      <BLine />
    </Beat>
    <Beat from={651.95} to={656.75}>
      <BFlag />
    </Beat>
    <Beat from={656.65} to={662.05}>
      <B33 />
    </Beat>
    <Beat from={661.95} to={667.95}>
      <BLook />
    </Beat>
    <Beat from={667.85} to={END}>
      <B10k />
    </Beat>
  </Chapter>
);
