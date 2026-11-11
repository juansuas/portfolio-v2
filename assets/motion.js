(() => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const chapters = [...document.querySelectorAll('[data-scene]')];
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width: 780px), (max-height: 520px)');
  const tau = Math.PI * 2;
  const random = seed => {
    const value = Math.sin(seed * 78.233) * 43758.5453;
    return value - Math.floor(value);
  };
  const opening = ['bars','digits','trend','conversation','network','scatter','python'];
  const sceneDuration = 3400;
  function trace({i,jitter},count,segments) {
    const [a,b] = segments[i % segments.length];
    const t = Math.floor(i/segments.length)/Math.ceil(count/segments.length);
    return [a[0]+(b[0]-a[0])*t+jitter, a[1]+(b[1]-a[1])*t+jitter];
  }
  function outline(points) {
    return points.slice(1).map((point,i)=>[points[i],point]);
  }
  const conversation = [
    ...outline([[-.38,-.34],[.15,-.34],[.20,-.29],[.20,-.09],[.15,-.04],[-.24,-.04],[-.37,.05],[-.35,-.04],[-.39,-.04],[-.43,-.08],[-.43,-.29],[-.38,-.34]]),
    ...outline([[-.16,.06],[.38,.06],[.43,.11],[.43,.28],[.39,.33],[.36,.33],[.38,.42],[.24,.33],[-.16,.33],[-.21,.28],[-.21,.11],[-.16,.06]]),
    [[-.33,-.23],[.07,-.23]],[[-.33,-.15],[-.04,-.15]],[[-.08,.16],[.33,.16]],[[-.08,.24],[.22,.24]]
  ];
  const nodes = [[-.37,-.23],[-.25,.25],[0,-.04],[.05,-.34],[.29,.28],[.39,-.17]];
  const edges = [[0,2],[0,3],[1,2],[1,4],[2,3],[2,4],[2,5],[3,5],[4,5]].map(([a,b])=>[nodes[a],nodes[b]]);
  const terminal = [
    ...outline([[-.48,-.29],[.48,-.29],[.48,.29],[-.48,.29],[-.48,-.29]]),
    [[-.48,-.16],[.48,-.16]]
  ];
  const pythonLines = ['Python', '>>> print(f"{25}%")', '25%'];
  const geometries = {
    python: (p,count) => trace(p,count,terminal),
    conversation: (p,count) => trace(p,count,conversation),
    network: (p,count) => {
      if (p.i%2===0) return trace(p,count,edges);
      const [x,y] = nodes[Math.floor(p.i/2)%nodes.length];
      return [x+Math.cos(p.angle)*p.radius*.048,y+Math.sin(p.angle)*p.radius*.048];
    },
    scatter: ({i,angle,radius}) => {
      const x = (random(i+407)-.5)*.83;
      return [x,-x*.55+Math.sin(angle)*radius*.22];
    },
    field: ({angle,radius}) => [Math.cos(angle)*radius*.49,Math.sin(angle)*radius*.43],
    grid: ({i,jitter},count) => {
      const columns = Math.ceil(Math.sqrt(count*1.33));
      const rows = Math.ceil(count/columns);
      return [(i%columns/(columns-1)-.5)*.85+jitter,(Math.floor(i/columns)/(rows-1)-.5)*.61+jitter];
    },
    bars: (p,count) => {
      const heights = [.18,.30,.24,.42,.36,.49,.44,.56];
      const bar = p.i%heights.length;
      const left = (bar-3.5)*.107-.031;
      const right = left+.062;
      const bottom = .29;
      const top = bottom-heights[bar];
      const corners = [[left,bottom],[left,top],[right,top],[right,bottom]];
      return trace({...p,i:Math.floor(p.i/heights.length),jitter:p.jitter*.32},
        Math.ceil(count/heights.length),outline(corners));
    },
    trend: ({i,jitter},count) => {
      const t = Math.floor(i/3)/Math.ceil(count/3);
      return [(t-.5)*.9,.32-t*.60+Math.sin(t*16)*.09-(i%3)*.065+jitter];
    },
    digits: ({i,jitter},count) => {
      const strokes = [
        [[0,0],[1,0]],[[1,0],[1,1]],[[1,1],[1,2]],[[0,2],[1,2]],[[0,1],[0,2]],[[0,0],[0,1]],[[0,1],[1,1]]
      ];
      const glyphs = [
        [0,1,6,4,3].map(index => strokes[index]),
        [0,5,6,2,3].map(index => strokes[index]),
        [[[0,2],[1,0]], ...outline([[0,0],[.29,0],[.29,.49],[0,.49],[0,0]]),
          ...outline([[.71,1.51],[1,1.51],[1,2],[.71,2],[.71,1.51]])]
      ];
      const digit = i%glyphs.length;
      const [x,y] = trace({i:Math.floor(i/glyphs.length),jitter},Math.ceil(count/glyphs.length),glyphs[digit]);
      return [(digit-1)*.28+(x-.5)*.17,(y-1)*.19];
    },
    clusters: ({i,angle,radius}) => [
      (i%2 ? .23 : -.24)+Math.cos(angle)*radius*.18,
      (i%4 < 2 ? -.17 : .19)+Math.sin(angle)*radius*.14
    ],
    convergence: ({i,jitter},count) => {
      const t = i/count;
      const angle = i%4*tau/4 + Math.PI/4 + (1-t)*.95;
      const distance = .04+t*.46;
      return [Math.cos(angle)*distance+jitter,Math.sin(angle)*distance+jitter];
    }
  };
  let particles = [], scene, width, height, frame = 0, last = 0;
  let visible = false, introStart, wakeTimer;
  function schedule() {
    if (visible && !document.hidden && !frame) frame = requestAnimationFrame(draw);
  }
  function stop() {
    cancelAnimationFrame(frame);
    clearTimeout(wakeTimer);
    introStart = undefined;
    frame = last = 0;
  }
  function updateScene(time) {
    const line = innerHeight * (compact.matches ? .55 : .51);
    const chapter = chapters.reduce((active, chapter) => chapter.getBoundingClientRect().top <= line ? chapter : active, chapters[0]).dataset.scene;
    const looping = chapter === 'field' && !preference.matches;
    if (looping) introStart ??= time;
    else introStart = undefined;
    const elapsed = time-(introStart ?? time);
    const current = looping ? opening[Math.floor(elapsed/sceneDuration)%opening.length] : chapter;
    if (current !== scene) {
      scene = current;
      particles.forEach(p => { p.target = geometries[scene](p,particles.length); });
    }
    return looping ? sceneDuration-elapsed%sceneDuration : 0;
  }
  function resize() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    const ratio = Math.min(devicePixelRatio || 1,compact.matches ? 1.5 : 2);
    canvas.width = Math.round(width*ratio);
    canvas.height = Math.round(height*ratio);
    ctx.setTransform(ratio,0,0,ratio,0,0);
    const count = compact.matches ? 250 : 650;
    if (particles.length !== count) {
      particles = Array.from({length:count},(_,i) => {
        const p = {i,angle:tau*random(i+7),radius:Math.sqrt(random(i+39)),jitter:(random(i+72)-.5)*.023,size:.5+1.25*random(i+225),glow:random(i+301)>.94};
        p.target = geometries[scene ?? 'field'](p,count);
        [p.x,p.y] = p.target;
        return p;
      });
    }
    schedule();
  }
  const glyphCanvas = document.createElement('canvas');
  const glyphContext = glyphCanvas.getContext('2d',{willReadFrequently:true});
  const glyphCache = new Map();
  function glyphParticles(character) {
    if (glyphCache.has(character)) return glyphCache.get(character);
    glyphCanvas.width = 14;
    glyphCanvas.height = 20;
    glyphContext.font = '18px monospace';
    glyphContext.textBaseline = 'top';
    glyphContext.fillText(character,1,0);
    const pixels = glyphContext.getImageData(0,0,14,20).data;
    const points = [];
    for (let y=1;y<20;y+=2) {
      for (let x=1;x<14;x+=2) {
        if (pixels[(y*14+x)*4+3]>95) points.push([x,y]);
      }
    }
    glyphCache.set(character,points);
    return points;
  }
  function drawPython(scale, elapsed, accent, glint) {
    const unit = Math.min(scale*.0035,Math.max(.53,scale*.00275));
    const x = width/2-scale*.42;
    const y = height/2;
    const typed = Math.max(0,Math.floor((elapsed-420)/62));
    function drawLine(text, top, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      [...text].forEach((character,index) => {
        for (const [dx,dy] of glyphParticles(character)) {
          const px = x+(index*12+dx)*unit;
          const py = top+dy*unit;
          ctx.moveTo(px+unit*.72,py);
          ctx.arc(px,py,unit*.72,0,tau);
        }
      });
      ctx.fill();
    }
    drawLine(pythonLines[0],y-scale*.25,glint);
    drawLine(pythonLines[1].slice(0,typed),y-scale*.075,accent);
    if (typed >= pythonLines[1].length) drawLine(pythonLines[2],y+scale*.09,accent);
    else if (elapsed%550 < 300) {
      ctx.fillStyle = accent;
      ctx.fillRect(x+typed*12*unit,y-scale*.015,6*unit,unit);
    }
    return typed < pythonLines[1].length;
  }
  function draw(time) {
    const palette = getComputedStyle(document.documentElement);
    const accent = palette.getPropertyValue('--accent').trim();
    const glint = palette.getPropertyValue('--particle-glint').trim();
    frame = 0;
    clearTimeout(wakeTimer);
    const nextSceneIn = updateScene(time);
    const dt = Math.min(time-(last || time-16),50);
    last = time;
    const easing = preference.matches ? 1 : 1-Math.exp(-dt/420);
    const scale = Math.min(width,height);
    let moving = false;
    ctx.clearRect(0,0,width,height);
    for (const p of particles) {
      const [x,y] = p.target;
      p.x += (x-p.x)*easing;
      p.y += (y-p.y)*easing;
      moving ||= Math.abs(x-p.x)+Math.abs(y-p.y)>.0006;
      ctx.fillStyle = p.glow ? glint : accent;
      ctx.globalAlpha = p.glow ? .92 : .34+p.size*.27;
      ctx.beginPath();
      ctx.arc(width/2+p.x*scale,height/2+p.y*scale,p.size,0,tau);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    const typing = scene === 'python' && drawPython(scale,sceneDuration-nextSceneIn,accent,glint);
    if (moving || typing) schedule();
    else {
      last = 0;
      if (nextSceneIn) wakeTimer = setTimeout(schedule,nextSceneIn);
    }
  }
  preference.addEventListener('change',schedule);
  compact.addEventListener('change',resize);
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('hashchange',schedule);
  document.addEventListener('visibilitychange',() => document.hidden ? stop() : schedule());
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) schedule(); else stop();
  }).observe(canvas);
  resize();
})();
