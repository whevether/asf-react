import React, { useCallback } from 'react';
import { P5Canvas } from '@p5-wrapper/react';

const STAR_COUNT = 280;
const DUST_COUNT = 60;
const NEBULA_LAYERS = 5;

function makeSketch() {
  let stars = [];
  let dust = [];
  let shootingStars = [];

  return function sketch(p5) {
    p5.setup = () => {
      p5.createCanvas(p5.windowWidth, p5.windowHeight);
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: p5.random(p5.width),
          y: p5.random(p5.height),
          r: p5.random(0.5, 2.2),
          phase: p5.random(p5.TWO_PI),
          twinkleSpeed: p5.random(0.04, 0.12), // 约 1～3 秒一周期
          hue: p5.random(200, 260) // 蓝紫
        });
      }
      dust = [];
      for (let i = 0; i < DUST_COUNT; i++) {
        dust.push({
          x: p5.random(p5.width * 1.2) - p5.width * 0.1,
          y: p5.random(p5.height),
          vx: p5.random(-0.15, 0.15),
          vy: p5.random(-0.08, 0.08),
          size: p5.random(1, 3),
          alpha: p5.random(15, 45)
        });
      }
      shootingStars = [];
    };

    p5.draw = () => {
      const t = p5.frameCount * 0.01;
      const w = p5.width;
      const h = p5.height;

      // 星辰大海渐变背景：深蓝 → 紫蓝 → 近黑
      for (let y = 0; y <= h; y += 2) {
        const n = y / h;
        const r = p5.lerp(6, 2, n);
        const g = p5.lerp(8, 4, n);
        const b = p5.lerp(28, 18, n);
        p5.stroke(r, g, b);
        p5.strokeWeight(2);
        p5.line(0, y, w, y);
      }

      // 星云层：柔和紫蓝光晕
      p5.noStroke();
      for (let layer = 0; layer < NEBULA_LAYERS; layer++) {
        const seed = layer * 99.7;
        const nx = (w * 0.3 + p5.sin(t * 0.3 + seed) * w * 0.2);
        const ny = (h * (0.2 + layer * 0.15) + p5.cos(t * 0.2 + seed * 1.3) * h * 0.1);
        const radius = w * (0.4 + layer * 0.15) + p5.sin(t + seed) * 30;
        const alpha = 12 + layer * 3 + p5.sin(t * 0.5 + seed) * 5;
        p5.fill(80, 60, 140, alpha);
        p5.circle(nx, ny, radius);
      }
      for (let layer = 0; layer < 3; layer++) {
        const seed = layer * 77 + 50;
        const nx2 = w * (0.6 + p5.cos(t * 0.25 + seed) * 0.2);
        const ny2 = h * (0.5 + p5.sin(t * 0.2 + seed) * 0.15);
        const radius2 = w * 0.35 + p5.cos(t * 0.4 + seed) * 20;
        p5.fill(40, 50, 120, 8 + p5.sin(t + seed) * 4);
        p5.circle(nx2, ny2, radius2);
      }

      // 星际尘埃漂移
      for (const d of dust) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < -20) d.x = w + 20;
        if (d.x > w + 20) d.x = -20;
        if (d.y < -20) d.y = h + 20;
        if (d.y > h + 20) d.y = -20;
        p5.fill(180, 200, 255, d.alpha * (0.6 + 0.4 * p5.sin(t + d.x * 0.01)));
        p5.noStroke();
        p5.circle(d.x, d.y, d.size);
      }

      // 星星闪烁：用 frameCount 驱动，周期约 1～3 秒
      for (const s of stars) {
        const twinkle = p5.constrain(
          0.3 + 0.7 * p5.sin(p5.frameCount * s.twinkleSpeed + s.phase),
          0,
          1
        );
        const brightness = p5.map(twinkle, 0, 1, 55, 255);
        p5.fill(200, 220, 255, brightness);
        p5.noStroke();
        p5.circle(s.x, s.y, s.r * 2);
        if (s.r > 1.2) {
          p5.fill(255, 255, 255, brightness * 0.9);
          p5.circle(s.x, s.y, s.r);
        }
      }

      // 流星（随机生成）
      if (p5.frameCount % 420 === 0 && p5.random() > 0.5) {
        shootingStars.push({
          x: p5.random(w * 0.5) + w * 0.25,
          y: -10,
          vx: 2.5 + p5.random(1.5),
          vy: 3 + p5.random(2),
          len: 40 + p5.random(60),
          life: 80 + p5.random(40)
        });
      }
      p5.stroke(220, 235, 255, 200);
      p5.strokeWeight(1.5);
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life--;
        if (ss.life <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }
        const alpha = p5.map(ss.life, 0, 100, 0, 220);
        p5.stroke(220, 238, 255, alpha);
        p5.line(ss.x, ss.y, ss.x - ss.len * 0.3, ss.y - ss.len);
      }
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };
  };
}

const sketch = makeSketch();

export default function LoginP5Background() {
  const memoizedSketch = useCallback(sketch, []);
  return (
    <div className="login-p5-background">
      <P5Canvas sketch={memoizedSketch} />
    </div>
  );
}
