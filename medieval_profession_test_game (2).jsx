import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Feather, ScrollText, Shield, FlaskConical, Music4, Hammer, Compass, RotateCcw } from 'lucide-react';

const resultsMeta = {
  scribe: {
    title: 'Путь хроник',
    subtitle: 'Тебе подходит роль того, кто превращает знание в порядок.',
    icon: ScrollText,
    description:
      'Этот путь связан с памятью, наблюдательностью и умением замечать смысл там, где другие видят только поток событий. Тебе может быть особенно близко всё, что связано с текстом, архивом, структурой и скрытыми связями.',
    vibe: 'смысл, наблюдательность, тишина',
    gradient: 'linear-gradient(135deg, rgba(104,22,26,0.95) 0%, rgba(73,12,21,0.96) 100%)',
    accent: '#f5d99f',
  },
  healer: {
    title: 'Путь трав и исцеления',
    subtitle: 'Тебе близко восстанавливать, поддерживать и возвращать равновесие.',
    icon: FlaskConical,
    description:
      'Это путь тонкого внимания к состояниям, заботы без слабости и внутренней устойчивости. Здесь важны интуиция, бережность и способность быть опорой тогда, когда вокруг становится тревожно.',
    vibe: 'забота, интуиция, устойчивость',
    gradient: 'linear-gradient(135deg, rgba(110,24,27,0.96) 0%, rgba(24,66,48,0.92) 100%)',
    accent: '#bfe7c8',
  },
  minstrel: {
    title: 'Путь музыки и историй',
    subtitle: 'Там, где ты, пространство легко наполняется живой энергией.',
    icon: Music4,
    description:
      'Этот путь подходит тем, кто умеет собирать внимание, создавать настроение и превращать обычный момент в историю, которую хочется запомнить. Здесь важны харизма, чувство ритма и любовь к впечатлению.',
    vibe: 'харизма, свобода, впечатление',
    gradient: 'linear-gradient(135deg, rgba(109,23,29,0.96) 0%, rgba(90,20,78,0.9) 100%)',
    accent: '#ffd0dc',
  },
  armorer: {
    title: 'Путь ремесла и мастерства',
    subtitle: 'Тебе ближе не обещания, а то, что можно сделать надёжно и по-настоящему.',
    icon: Hammer,
    description:
      'Это путь практичности, точности и уважения к делу. Он подходит тому, кто любит прочные решения, реальный результат и спокойную силу, которая проявляется через качество работы.',
    vibe: 'точность, выносливость, крепкость',
    gradient: 'linear-gradient(135deg, rgba(112,25,22,0.96) 0%, rgba(58,45,40,0.92) 100%)',
    accent: '#f0d0a8',
  },
  falconer: {
    title: 'Путь высоты и соколиной охоты',
    subtitle: 'Тебя тянет к свободе, точности и ощущению ветра.',
    icon: Feather,
    description:
      'Этот путь связан с собранностью, независимостью и тонкой настройкой на движение. Здесь важны скорость реакции, внутреннее достоинство и умение держать направление без лишнего шума.',
    vibe: 'свобода, точность, благородство',
    gradient: 'linear-gradient(135deg, rgba(104,21,26,0.96) 0%, rgba(30,58,88,0.9) 100%)',
    accent: '#cfe7ff',
  },
  steward: {
    title: 'Путь управления замком',
    subtitle: 'Тебе подходит роль того, кто держит ход вещей в своих руках.',
    icon: Crown,
    description:
      'Это путь стратегии, ответственности и способности видеть систему целиком. Он подходит тому, кто умеет координировать, замечать слабые места и сохранять порядок даже в сложной обстановке.',
    vibe: 'структура, стратегия, контроль',
    gradient: 'linear-gradient(135deg, rgba(108,21,26,0.96) 0%, rgba(111,84,20,0.88) 100%)',
    accent: '#ffe39c',
  },
  guard: {
    title: 'Путь городской стражи',
    subtitle: 'Тебе близка роль того, кто не отступает, когда нужна решимость.',
    icon: Shield,
    description:
      'Этот путь держится на собранности, верности делу и способности быстро включаться в ситуацию. Здесь важны надёжность, чувство ответственности и готовность действовать, а не наблюдать со стороны.',
    vibe: 'решимость, верность, опора',
    gradient: 'linear-gradient(135deg, rgba(106,21,25,0.96) 0%, rgba(45,50,58,0.92) 100%)',
    accent: '#d8dee7',
  },
  cartographer: {
    title: 'Путь карт и дорог',
    subtitle: 'Тебя манят неизвестное, пространство и поиск новых направлений.',
    icon: Compass,
    description:
      'Это путь любопытства, широты взгляда и внимания к маршрутам — внешним и внутренним. Он подходит тому, кто любит исследовать, сопоставлять и находить новые способы двигаться вперёд.',
    vibe: 'поиск, широта взгляда, дорога',
    gradient: 'linear-gradient(135deg, rgba(108,21,26,0.96) 0%, rgba(46,43,94,0.9) 100%)',
    accent: '#d8dcff',
  },
};

const questions = [
  {
    id: 1,
    text: 'Ты просыпаешься в средневековом городе. Куда тебя тянет в первую очередь?',
    answers: [
      {
        text: 'В библиотеку, архив или монастырский скрипторий',
        score: { scribe: 3, cartographer: 1 },
        trail: 'Сначала тебя тянет туда, где хранятся записи, карты и старые знания.',
      },
      {
        text: 'На рынок трав, масел и редких кореньев',
        score: { healer: 3, minstrel: 1 },
        trail: 'Сначала тебя тянет туда, где пахнет травами, маслами и ремеслом исцеления.',
      },
      {
        text: 'Во дворец — хочется понять, кто тут всем управляет',
        score: { steward: 3, guard: 1 },
        trail: 'Сначала тебя ведёт интерес к устройству власти, порядка и скрытых рычагов влияния.',
      },
      {
        text: 'К воротам города или на башню, смотреть вдаль',
        score: { falconer: 2, cartographer: 3 },
        trail: 'Сначала тебя тянет к высоте, простору и тому, что скрывается за горизонтом.',
      },
    ],
  },
  {
    id: 2,
    text: 'Какую задачу тебе приятнее решать?',
    answers: [
      {
        text: 'Разложить сложное по полочкам и всё аккуратно оформить',
        score: { scribe: 3, steward: 1 },
        trail: 'Тебе особенно приятно превращать сложное в ясное и собранное.',
      },
      {
        text: 'Помочь человеку, которому плохо или тревожно',
        score: { healer: 3 },
        trail: 'Тебе естественно включаться там, где кому-то нужны поддержка и восстановление.',
      },
      {
        text: 'Собрать всех, вдохновить и сделать так, чтобы оживилась атмосфера',
        score: { minstrel: 3, steward: 1 },
        trail: 'Тебе нравится оживлять пространство и собирать людей вокруг общего настроения.',
      },
      {
        text: 'Сделать что-то надёжное, крепкое и полезное руками',
        score: { armorer: 3, guard: 1 },
        trail: 'Тебе ближе создавать то, что держится крепко и служит по-настоящему.',
      },
    ],
  },
  {
    id: 3,
    text: 'В компании незнакомых людей ты чаще...',
    answers: [
      {
        text: 'Наблюдаешь, слушаешь и быстро понимаешь, кто есть кто',
        score: { scribe: 2, steward: 2 },
        trail: 'Среди новых людей ты сначала считываешь атмосферу и быстро понимаешь расстановку сил.',
      },
      {
        text: 'Становишься тем, с кем легко и тепло',
        score: { healer: 2, minstrel: 1 },
        trail: 'Среди новых людей ты естественно создаёшь ощущение тепла и безопасности.',
      },
      {
        text: 'Берёшь инициативу, если все мнутся',
        score: { guard: 2, steward: 2 },
        trail: 'Среди новых людей ты без лишнего шума можешь взять инициативу на себя.',
      },
      {
        text: 'Притягиваешь внимание необычностью и живой энергией',
        score: { minstrel: 3, falconer: 1 },
        trail: 'Среди новых людей ты заметно выделяешься живой энергией и особой подачей.',
      },
    ],
  },
  {
    id: 4,
    text: 'Какой предмет тебе хотелось бы получить в подарок?',
    answers: [
      {
        text: 'Книгу в резном переплёте или набор для письма',
        score: { scribe: 3 },
        trail: 'Тебя радуют вещи, в которых живут смысл, память и след времени.',
      },
      {
        text: 'Сумку с редкими травами, стеклянными флаконами и ступкой',
        score: { healer: 3 },
        trail: 'Тебя тянут предметы, связанные с природой, заботой и тонкой работой руками.',
      },
      {
        text: 'Красивый музыкальный инструмент или плащ для путешествий',
        score: { minstrel: 2, cartographer: 2 },
        trail: 'Тебя манят вещи, в которых есть движение, настроение и обещание новой истории.',
      },
      {
        text: 'Точный инструмент мастера или вещь, сделанную на века',
        score: { armorer: 3, falconer: 1 },
        trail: 'Тебе нравятся вещи, созданные точно, добротно и без лишней декоративности.',
      },
    ],
  },
  {
    id: 5,
    text: 'Что тебе ближе по характеру?',
    answers: [
      {
        text: 'Тихая глубина и внимание к деталям',
        score: { scribe: 3 },
        trail: 'По характеру тебе близки глубина, нюансы и внимательность к деталям.',
      },
      {
        text: 'Доброта, чувствительность и внутренняя стойкость',
        score: { healer: 3 },
        trail: 'По характеру тебе близки мягкость, чувствительность и спокойная внутренняя прочность.',
      },
      {
        text: 'Яркость, юмор и умение оживлять людей',
        score: { minstrel: 3 },
        trail: 'По характеру тебе близки лёгкость, юмор и способность оживлять людей рядом.',
      },
      {
        text: 'Собранность, воля и привычка действовать',
        score: { guard: 2, steward: 2, armorer: 1 },
        trail: 'По характеру тебе близки воля, собранность и привычка переходить к делу без промедления.',
      },
    ],
  },
  {
    id: 6,
    text: 'Если в королевстве начинается смута, ты скорее...',
    answers: [
      {
        text: 'Соберёшь факты, письма и попытаешься понять, что происходит на самом деле',
        score: { scribe: 2, cartographer: 2 },
        trail: 'Когда вокруг хаос, тебе важно сначала увидеть подлинную картину происходящего.',
      },
      {
        text: 'Будешь помогать пострадавшим и сохранять людям опору',
        score: { healer: 3 },
        trail: 'Когда вокруг хаос, ты скорее станешь точкой опоры для тех, кому трудно.',
      },
      {
        text: 'Возьмёшь на себя координацию и распределение дел',
        score: { steward: 3 },
        trail: 'Когда вокруг хаос, ты способен быстро выстроить порядок и распределить силы.',
      },
      {
        text: 'Встанешь на защиту и будешь действовать быстро',
        score: { guard: 3, falconer: 1 },
        trail: 'Когда вокруг хаос, ты скорее включишься в действие и возьмёшь на себя защиту.',
      },
    ],
  },
  {
    id: 7,
    text: 'Какое пространство ощущается твоим?',
    answers: [
      {
        text: 'Тихая комната со свечами, бумагой и картами',
        score: { scribe: 2, cartographer: 2 },
        trail: 'Твоё пространство — там, где есть тишина, стол, свечной свет и возможность думать вглубь.',
      },
      {
        text: 'Сад, мастерская с травами или солнечная галерея',
        score: { healer: 3 },
        trail: 'Твоё пространство — там, где есть жизнь, воздух, природный ритм и ощущение восстановления.',
      },
      {
        text: 'Зал с людьми, музыкой и историями',
        score: { minstrel: 3, steward: 1 },
        trail: 'Твоё пространство — там, где есть люди, движение, голос и обмен впечатлениями.',
      },
      {
        text: 'Башня, кузня, двор или тренировочный плац',
        score: { armorer: 2, guard: 2, falconer: 1 },
        trail: 'Твоё пространство — там, где чувствуется дело, дисциплина, металл, высота или тренировка.',
      },
    ],
  },
  {
    id: 8,
    text: 'Как ты принимаешь решения?',
    answers: [
      {
        text: 'Сначала собираю информацию и смотрю на общую картину',
        score: { scribe: 2, cartographer: 2, steward: 1 },
        trail: 'Решения ты предпочитаешь принимать после того, как увидишь картину целиком.',
      },
      {
        text: 'Чувствую, где правда и что будет бережнее для всех',
        score: { healer: 3 },
        trail: 'Решения ты часто принимаешь через тонкое ощущение правды и бережности.',
      },
      {
        text: 'Смело, быстро и по ситуации',
        score: { guard: 2, falconer: 2 },
        trail: 'Решения ты умеешь принимать быстро, точно и без лишних колебаний.',
      },
      {
        text: 'Так, чтобы всё потом работало и держалось',
        score: { armorer: 2, steward: 2 },
        trail: 'Решения тебе хочется принимать так, чтобы они выдерживали время и нагрузку.',
      },
    ],
  },
  {
    id: 9,
    text: 'Что сильнее всего тебя манит?',
    answers: [
      {
        text: 'Знание и скрытые смыслы',
        score: { scribe: 3 },
        trail: 'Тебя особенно притягивают знания, скрытые слои смысла и то, что открывается не сразу.',
      },
      {
        text: 'Люди, их состояния и возможность исцелять',
        score: { healer: 3 },
        trail: 'Тебя особенно притягивают состояния людей и возможность что-то в них мягко менять к лучшему.',
      },
      {
        text: 'Красота, впечатления и сила хорошей истории',
        score: { minstrel: 3 },
        trail: 'Тебя особенно притягивают красота, впечатление и сила хорошо рассказанной истории.',
      },
      {
        text: 'Дорога, простор и неизвестное впереди',
        score: { cartographer: 3, falconer: 1 },
        trail: 'Тебя особенно притягивают дорога, дальний горизонт и то, что ещё не исследовано.',
      },
    ],
  },
  {
    id: 10,
    text: 'Какой девиз звучит наиболее твоим?',
    answers: [
      {
        text: 'Записанное не исчезнет',
        score: { scribe: 3 },
        trail: 'В твоём пути чувствуется уважение к памяти, следу и тому, что должно быть сохранено.',
      },
      {
        text: 'Даже слабое можно вернуть к жизни',
        score: { healer: 3 },
        trail: 'В твоём пути чувствуется вера в восстановление, рост и возвращение силы.',
      },
      {
        text: 'Люди запомнят не день, а чувство от него',
        score: { minstrel: 3 },
        trail: 'В твоём пути чувствуется внимание к переживанию, атмосфере и эмоциональному следу.',
      },
      {
        text: 'Порядок, верность делу и крепкая рука',
        score: { steward: 2, armorer: 2, guard: 2 },
        trail: 'В твоём пути чувствуется уважение к дисциплине, делу и внутреннему стержню.',
      },
    ],
  },
];

const introProfessions = [
  'хроники',
  'травы и исцеление',
  'музыка и истории',
  'соколиная охота',
  'управление замком',
  'ремесло',
  'карты и дороги',
  'городская стража',
];

function scoreAnswers(answers) {
  const totals = {
    scribe: 0,
    healer: 0,
    minstrel: 0,
    armorer: 0,
    falconer: 0,
    steward: 0,
    guard: 0,
    cartographer: 0,
  };

  answers.forEach((answerIndex, qIndex) => {
    const answer = questions[qIndex]?.answers?.[answerIndex];
    if (!answer) return;
    Object.entries(answer.score).forEach(([key, value]) => {
      totals[key] += value;
    });
  });

  const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  return { totals, primary: sorted[0][0], secondary: sorted[1][0] };
}

function buildStory(answerIndexes, primary, secondary) {
  const chosen = answerIndexes
    .map((answerIndex, qIndex) => questions[qIndex]?.answers?.[answerIndex])
    .filter(Boolean);

  const parts = chosen.map((item) => item.trail);
  const primaryTitle = resultsMeta[primary]?.title || '';
  const secondaryTitle = resultsMeta[secondary]?.title || '';

  return {
    beginning: parts.slice(0, 3).join(' '),
    middle: parts.slice(3, 7).join(' '),
    ending: parts.slice(7).join(' '),
    summary: `Все выбранные ответы складываются в «${primaryTitle}», а рядом с ним ощущается и «${secondaryTitle}».`,
  };
}

function CreaturePlaceholder({ className, label }) {
  return (
    <div className={`creature-slot ${className}`}>
      <div className="creature-slot-inner">
        <div className="creature-slot-label">{label}</div>
      </div>
    </div>
  );
}

function TapestryBg() {
  return (
    <div className="tapestry-bg">
      <div className="tapestry-layer tapestry-main" />
      <div
        className="tapestry-layer tapestry-grid"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245, 222, 179, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 222, 179, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '22px 22px',
        }}
      />
      <div
        className="tapestry-layer tapestry-dots"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,228,181,0.35) 1px, transparent 0)`,
          backgroundSize: '18px 18px',
        }}
      />
      <div className="tapestry-layer tapestry-fade" />

      <CreaturePlaceholder className="creature-right" label="место для существа I" />
      <CreaturePlaceholder className="creature-left" label="место для существа II" />

      <div className="frame frame-outer" />
      <div className="frame frame-inner" />
    </div>
  );
}

function OrnamentalDivider() {
  return (
    <div className="ornamental-divider">
      <div className="divider-line" />
      <div className="divider-symbols">✦ ✦ ✦</div>
      <div className="divider-line" />
    </div>
  );
}

const styles = `
  * { box-sizing: border-box; }
  html, body, #root { min-height: 100%; margin: 0; }
  body {
    background: #1b0709;
    color: #f7ead2;
    font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  button, input, textarea, select { font: inherit; }

  .app {
    min-height: 100vh;
    width: 100%;
    background: #1b0709;
    padding: 16px;
    color: #f7ead2;
  }
  .shell {
    position: relative;
    max-width: 1160px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 28px;
    border: 1px solid rgba(245, 222, 179, 0.14);
    box-shadow: 0 28px 70px rgba(0,0,0,0.45);
    min-height: calc(100vh - 32px);
  }
  .content {
    position: relative;
    z-index: 2;
    padding: 20px;
  }
  .tapestry-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    border-radius: 28px;
    z-index: 0;
  }
  .tapestry-layer {
    position: absolute;
    inset: 0;
  }
  .tapestry-main {
    background:
      radial-gradient(circle at top, rgba(255,235,205,0.08), transparent 35%),
      linear-gradient(135deg, rgba(59,7,7,1) 0%, rgba(127,29,29,0.98) 40%, rgba(69,10,10,1) 100%);
  }
  .tapestry-grid { opacity: 0.25; }
  .tapestry-dots { opacity: 0.2; }
  .tapestry-fade {
    background: linear-gradient(180deg, transparent, rgba(20,6,6,0.35));
  }
  .frame {
    position: absolute;
    border-radius: 22px;
    pointer-events: none;
  }
  .frame-outer {
    inset: 14px;
    border: 1px solid rgba(245, 222, 179, 0.20);
  }
  .frame-inner {
    inset: 26px;
    border-radius: 18px;
    border: 1px solid rgba(245, 222, 179, 0.10);
  }
  .creature-slot {
    position: absolute;
    border-radius: 26px;
    border: 1px dashed rgba(245, 222, 179, 0.15);
    background: rgba(0,0,0,0.10);
    backdrop-filter: blur(1px);
    pointer-events: none;
  }
  .creature-right {
    right: 3%;
    top: 8%;
    width: 180px;
    height: 260px;
  }
  .creature-left {
    left: 3%;
    bottom: 7%;
    width: 170px;
    height: 240px;
  }
  .creature-slot-inner {
    width: 100%;
    height: 100%;
    border-radius: 26px;
    border: 1px solid rgba(255,248,220,0.06);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .creature-slot-label {
    padding: 0 16px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    font-size: 10px;
    color: rgba(245, 222, 179, 0.36);
  }

  .intro-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 32px;
    align-items: stretch;
  }
  .panel {
    background: rgba(0,0,0,0.20);
    border: 1px solid rgba(245, 222, 179, 0.14);
    border-radius: 24px;
    backdrop-filter: blur(10px);
    padding: 28px;
  }
  .panel-soft {
    background: linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.15));
  }
  .panel-stretch {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .eyebrow {
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    border: 1px solid rgba(245, 222, 179, 0.20);
    background: rgba(255,248,220,0.05);
    padding: 6px 12px;
    font-size: 11px;
    line-height: 1;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(245, 222, 179, 0.75);
  }
  .title {
    margin: 18px 0 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 58px;
    line-height: 0.95;
    color: #fff4dc;
    letter-spacing: -0.03em;
  }
  .lead {
    margin: 20px 0 0;
    max-width: 760px;
    font-size: 21px;
    line-height: 1.6;
    color: rgba(255, 240, 214, 0.84);
  }
  .section-gap { margin-top: 32px; }
  .ornamental-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    color: rgba(245, 222, 179, 0.70);
  }
  .divider-line {
    height: 1px;
    flex: 1;
    background: rgba(245, 222, 179, 0.20);
  }
  .divider-symbols {
    font-size: 12px;
    letter-spacing: 0.35em;
    text-transform: uppercase;
  }
  .pills {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .pill {
    border-radius: 999px;
    border: 1px solid rgba(245, 222, 179, 0.16);
    background: rgba(255,248,220,0.05);
    padding: 10px 14px;
    font-size: 14px;
    line-height: 1.2;
    color: rgba(255, 240, 214, 0.82);
  }
  .block-title {
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.30em;
    color: rgba(245, 222, 179, 0.65);
  }
  .stack {
    margin-top: 16px;
    display: grid;
    gap: 14px;
    color: rgba(255, 240, 214, 0.88);
  }
  .stack-card {
    border-radius: 18px;
    border: 1px solid rgba(245, 222, 179, 0.10);
    background: rgba(255,255,255,0.05);
    padding: 16px;
    line-height: 1.55;
  }
  .primary-button {
    margin-top: 28px;
    width: 100%;
    border: 1px solid rgba(245, 222, 179, 0.28);
    border-radius: 20px;
    background: linear-gradient(90deg, #3c070c 0%, #6d1118 50%, #5f0c1f 100%);
    color: #fff0d8;
    padding: 16px 20px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 14px 32px rgba(0,0,0,0.22);
    transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
  }
  .primary-button:hover {
    transform: translateY(-1px) scale(1.01);
    border-color: rgba(255, 240, 214, 0.44);
    box-shadow: 0 18px 36px rgba(0,0,0,0.28);
  }

  .center-wrap {
    max-width: 940px;
    margin: 0 auto;
  }
  .top-row {
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }
  .tiny-meta {
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.28em;
    color: rgba(245, 222, 179, 0.66);
  }
  .text-button {
    background: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;
    font-size: 14px;
    color: rgba(245, 222, 179, 0.72);
  }
  .text-button:hover {
    color: #fff1d7;
  }
  .progress-outer {
    height: 12px;
    margin-bottom: 30px;
    border-radius: 999px;
    overflow: hidden;
    background: rgba(0,0,0,0.26);
    border: 1px solid rgba(245, 222, 179, 0.10);
  }
  .progress-inner {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, rgba(246,222,169,0.92), rgba(232,134,111,0.85), rgba(234,179,112,0.88));
    transition: width 0.45s ease;
  }
  .question-card {
    border-radius: 24px;
    border: 1px solid rgba(245, 222, 179, 0.15);
    background: rgba(0,0,0,0.20);
    backdrop-filter: blur(10px);
    padding: 28px;
  }
  .question-title {
    margin: 0;
    max-width: 760px;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 38px;
    line-height: 1.15;
    color: #fff4dc;
  }
  .answers {
    margin-top: 28px;
    display: grid;
    gap: 12px;
  }
  .answer {
    width: 100%;
    text-align: left;
    border-radius: 20px;
    border: 1px solid rgba(245, 222, 179, 0.12);
    background: linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03));
    padding: 16px 18px;
    cursor: pointer;
    transition: transform 0.16s ease, background 0.16s ease, border-color 0.16s ease;
    color: #fff2dd;
  }
  .answer:hover {
    transform: translateX(4px);
    background: rgba(255,255,255,0.10);
    border-color: rgba(245, 222, 179, 0.30);
  }
  .answer-row {
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }
  .answer-letter {
    flex: 0 0 auto;
    width: 28px;
    height: 28px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: rgba(245, 222, 179, 0.78);
    border: 1px solid rgba(245, 222, 179, 0.18);
    background: rgba(0,0,0,0.20);
  }
  .answer-text {
    font-size: 18px;
    line-height: 1.55;
    color: rgba(255, 240, 214, 0.92);
  }
  .bottom-row {
    margin-top: 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
  }
  .secondary-button {
    border-radius: 999px;
    border: 1px solid rgba(245, 222, 179, 0.12);
    background: transparent;
    padding: 10px 16px;
    cursor: pointer;
    color: rgba(255, 240, 214, 0.80);
    transition: border-color 0.16s ease, color 0.16s ease, background 0.16s ease;
  }
  .secondary-button:hover:not(:disabled) {
    border-color: rgba(245, 222, 179, 0.25);
    color: #fff1d7;
    background: rgba(255,255,255,0.04);
  }
  .secondary-button:disabled {
    opacity: 0.35;
    cursor: default;
  }
  .hint {
    font-size: 14px;
    color: rgba(245, 222, 179, 0.55);
  }

  .result-wrap {
    max-width: 1160px;
    margin: 0 auto;
  }
  .result-grid {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 24px;
  }
  .result-primary {
    border-radius: 26px;
    border: 1px solid rgba(245, 222, 179, 0.15);
    padding: 28px;
    box-shadow: 0 18px 42px rgba(0,0,0,0.22);
  }
  .result-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }
  .result-eyebrow {
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.30em;
    color: rgba(245, 222, 179, 0.76);
  }
  .result-title {
    margin: 12px 0 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 44px;
    line-height: 1.05;
    color: #fff4dc;
  }
  .result-subtitle {
    margin: 12px 0 0;
    font-size: 20px;
    line-height: 1.45;
  }
  .icon-box {
    flex: 0 0 auto;
    border-radius: 18px;
    border: 1px solid rgba(245, 222, 179, 0.15);
    background: rgba(0,0,0,0.15);
    padding: 14px;
    color: #f9e5c3;
  }
  .result-text {
    margin-top: 24px;
    max-width: 720px;
    font-size: 18px;
    line-height: 1.7;
    color: rgba(255, 240, 214, 0.9);
  }
  .energy-box {
    margin-top: 24px;
    border-radius: 20px;
    border: 1px solid rgba(245, 222, 179, 0.12);
    background: rgba(0,0,0,0.14);
    padding: 16px;
  }
  .energy-label {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.28em;
    color: rgba(245, 222, 179, 0.60);
  }
  .energy-value {
    margin-top: 10px;
    color: rgba(255, 240, 214, 0.92);
    font-size: 16px;
  }
  .side-stack {
    display: grid;
    gap: 24px;
  }
  .info-card {
    border-radius: 24px;
    border: 1px solid rgba(245, 222, 179, 0.15);
    background: rgba(0,0,0,0.20);
    backdrop-filter: blur(10px);
    padding: 24px;
  }
  .info-card-title {
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.30em;
    color: rgba(245, 222, 179, 0.60);
  }
  .info-body {
    margin-top: 16px;
    color: rgba(255, 240, 214, 0.82);
    line-height: 1.7;
    font-size: 17px;
  }
  .info-flex {
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }
  .info-heading {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 28px;
    line-height: 1.15;
    color: #fff4dc;
  }
  .story-card {
    margin-top: 24px;
    border-radius: 24px;
    border: 1px solid rgba(245, 222, 179, 0.15);
    background: rgba(0,0,0,0.20);
    backdrop-filter: blur(10px);
    padding: 28px;
  }
  .story-texts {
    margin-top: 18px;
    display: grid;
    gap: 16px;
    color: rgba(255, 240, 214, 0.86);
    font-size: 17px;
    line-height: 1.8;
  }
  .story-summary {
    color: rgba(245, 222, 179, 0.92);
  }
  .result-actions {
    margin-top: 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .ghost-button {
    border-radius: 999px;
    border: 1px solid rgba(245, 222, 179, 0.20);
    background: rgba(255,248,220,0.08);
    padding: 12px 18px;
    cursor: pointer;
    color: #fff1d7;
    transition: background 0.16s ease, border-color 0.16s ease;
  }
  .ghost-button:hover {
    background: rgba(255,248,220,0.12);
    border-color: rgba(245, 222, 179, 0.35);
  }

  @media (max-width: 1279px) {
    .creature-slot { display: none; }
  }
  @media (max-width: 1024px) {
    .intro-grid,
    .result-grid {
      grid-template-columns: 1fr;
    }
    .title {
      font-size: 50px;
    }
    .result-title {
      font-size: 38px;
    }
  }
  @media (max-width: 768px) {
    .app { padding: 12px; }
    .shell { min-height: calc(100vh - 24px); }
    .content { padding: 16px; }
    .panel,
    .question-card,
    .result-primary,
    .info-card,
    .story-card { padding: 20px; }
    .title {
      font-size: 42px;
      line-height: 1.02;
    }
    .lead {
      font-size: 18px;
      line-height: 1.55;
    }
    .question-title {
      font-size: 30px;
    }
    .answer-text,
    .result-text,
    .info-body,
    .story-texts {
      font-size: 16px;
    }
    .result-title {
      font-size: 32px;
    }
    .top-row,
    .bottom-row,
    .result-head,
    .info-flex {
      flex-direction: column;
      align-items: stretch;
    }
    .primary-button { font-size: 17px; }
  }
`;

export default function MedievalProfessionTestGame() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const progress = ((current + (finished ? 1 : 0)) / questions.length) * 100;
  const result = useMemo(() => (finished ? scoreAnswers(answers) : null), [finished, answers]);
  const story = useMemo(() => {
    if (!finished || !result) return null;
    return buildStory(answers, result.primary, result.secondary);
  }, [finished, result, answers]);

  const chooseAnswer = (index) => {
    const nextAnswers = [...answers];
    nextAnswers[current] = index;
    setAnswers(nextAnswers);

    if (current === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrent((value) => value + 1);
    }
  };

  const goBack = () => {
    if (finished) {
      setFinished(false);
      setCurrent(questions.length - 1);
      return;
    }
    if (current > 0) setCurrent((value) => value - 1);
  };

  const restart = () => {
    setStarted(false);
    setCurrent(0);
    setAnswers([]);
    setFinished(false);
  };

  const primaryMeta = result ? resultsMeta[result.primary] : null;
  const secondaryMeta = result ? resultsMeta[result.secondary] : null;
  const PrimaryIcon = primaryMeta?.icon;
  const SecondaryIcon = secondaryMeta?.icon;

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="shell">
          <TapestryBg />

          <div className="content">
            <AnimatePresence mode="wait">
              {!started ? (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="intro-grid"
                >
                  <div className="panel panel-stretch">
                    <div>
                      <div className="eyebrow">Whimsy • Medieval • Red Tapestry</div>
                      <h1 className="title">Какая средневековая профессия тебе подошла бы?</h1>
                      <p className="lead">
                        Небольшая игра с атмосферой старого гобелена, замков, башен и свечного света. Выбирай то, что действительно твоё — и в конце узнаешь, какой путь оказался тебе ближе в мире хроник, ремёсел и тайных дорог.
                      </p>
                    </div>

                    <div className="section-gap">
                      <OrnamentalDivider />
                      <div className="pills" style={{ marginTop: 16 }}>
                        {introProfessions.map((item) => (
                          <span key={item} className="pill">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="panel panel-soft panel-stretch">
                    <div>
                      <div className="block-title">Внутри</div>
                      <div className="stack">
                        <div className="stack-card">
                          10 вопросов с мягким уклоном в характер, реакции и внутренний стиль.
                        </div>
                        <div className="stack-card">
                          8 возможных путей — от хроник и ремесла до карт, дорог и стражи.
                        </div>
                        <div className="stack-card">
                          На фоне уже оставлены места для двух средневековых существ с прозрачным фоном.
                        </div>
                      </div>
                    </div>

                    <button onClick={() => setStarted(true)} className="primary-button">
                      Начать игру
                    </button>
                  </div>
                </motion.div>
              ) : !finished ? (
                <motion.div
                  key={`question-${current}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.25 }}
                  className="center-wrap"
                >
                  <div className="top-row">
                    <div className="tiny-meta">Вопрос {current + 1} из {questions.length}</div>
                    <button onClick={restart} className="text-button">
                      начать заново
                    </button>
                  </div>

                  <div className="progress-outer">
                    <div className="progress-inner" style={{ width: `${progress}%` }} />
                  </div>

                  <div className="question-card">
                    <h2 className="question-title">{questions[current].text}</h2>

                    <div className="answers">
                      {questions[current].answers.map((answer, index) => (
                        <button key={answer.text} onClick={() => chooseAnswer(index)} className="answer">
                          <div className="answer-row">
                            <div className="answer-letter">{String.fromCharCode(65 + index)}</div>
                            <div className="answer-text">{answer.text}</div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="bottom-row">
                      <button onClick={goBack} disabled={current === 0} className="secondary-button">
                        назад
                      </button>
                      <div className="hint">выбирай интуитивно</div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.3 }}
                  className="result-wrap"
                >
                  <div className="top-row">
                    <div className="tiny-meta">Твой итог</div>
                    <button onClick={restart} className="secondary-button" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <RotateCcw size={15} /> пройти ещё раз
                    </button>
                  </div>

                  <div className="result-grid">
                    <div className="result-primary" style={{ background: primaryMeta.gradient }}>
                      <div className="result-head">
                        <div>
                          <div className="result-eyebrow">Главный путь</div>
                          <h2 className="result-title">{primaryMeta.title}</h2>
                          <p className="result-subtitle" style={{ color: primaryMeta.accent }}>
                            {primaryMeta.subtitle}
                          </p>
                        </div>
                        {PrimaryIcon ? (
                          <div className="icon-box">
                            <PrimaryIcon size={34} />
                          </div>
                        ) : null}
                      </div>

                      <p className="result-text">{primaryMeta.description}</p>

                      <div className="energy-box">
                        <div className="energy-label">Энергия пути</div>
                        <div className="energy-value">{primaryMeta.vibe}</div>
                      </div>
                    </div>

                    <div className="side-stack">
                      <div className="info-card">
                        <div className="info-card-title">Второй оттенок</div>
                        <div className="info-flex" style={{ marginTop: 16 }}>
                          {SecondaryIcon ? (
                            <div className="icon-box" style={{ background: 'rgba(255,255,255,0.05)' }}>
                              <SecondaryIcon size={28} />
                            </div>
                          ) : null}
                          <div>
                            <div className="info-heading">{secondaryMeta.title}</div>
                            <div className="info-body" style={{ marginTop: 10 }}>
                              {secondaryMeta.subtitle}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="info-card">
                        <div className="info-card-title">Что это значит</div>
                        <p className="info-body">
                          Твой результат — не про жёсткую категорию, а про естественный способ проявляться в мире. Здесь важнее не должность, а внутренний стиль: как ты смотришь, решаешь, чувствуешь и двигаешься дальше.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="story-card">
                    <div className="info-card-title">Твой путь по ответам</div>
                    <div className="story-texts">
                      <p>{story?.beginning}</p>
                      <p>{story?.middle}</p>
                      <p>{story?.ending}</p>
                      <p className="story-summary">{story?.summary}</p>
                    </div>
                  </div>

                  <div className="result-actions">
                    <button onClick={goBack} className="secondary-button">
                      изменить последний ответ
                    </button>
                    <button onClick={restart} className="ghost-button">
                      пройти заново
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
