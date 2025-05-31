document.addEventListener('DOMContentLoaded', () => {
  // HERO ANIMATION SETUP
  const canvas = document.getElementById('galaxy-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  // PARTICLE SYSTEM FOR GALAXY
  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    alpha: number;
    life: number;
    maxLife: number;
  }
  const particles: Particle[] = [];
  const colors = ['#fff', '#ffb300', '#9F32E9', '#0C5964', '#9D531F'];
  function spawnParticle(centerX: number, centerY: number) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 1.5 + 0.5;
    particles.push({
      x: centerX,
      y: centerY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: Math.random() * 2.2 + 0.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      life: 0,
      maxLife: Math.random() * 120 + 80
    });
  }
  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    // spawn new particles from center
    for (let i = 0; i < 8; i++) spawnParticle(width/2, height/2);
    // update and draw
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life++;
      p.alpha = 1 - p.life / p.maxLife;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.restore();
      if (p.life > p.maxLife) particles.splice(i, 1);
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // MOUSE/TAP INTERACTION: BEND STARFIELD
  canvas.addEventListener('mousemove', (e) => {
    const dx = e.clientX - width/2;
    const dy = e.clientY - height/2;
    for (let p of particles) {
      p.vx += dx * 0.00001;
      p.vy += dy * 0.00001;
    }
  });
  canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const t = e.touches[0];
      const dx = t.clientX - width/2;
      const dy = t.clientY - height/2;
      for (let p of particles) {
        p.vx += dx * 0.00001;
        p.vy += dy * 0.00001;
      }
    }
  });
  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });

  // LOGO ANIMATION
  const logoMain = document.getElementById('logo-main') as HTMLImageElement;
  const logoMosaic = document.getElementById('logo-mosaic') as HTMLImageElement;
  const presentedBy = document.querySelector('.presented-by') as HTMLElement;
  logoMain.style.opacity = '0';
  logoMosaic.style.opacity = '0';
  presentedBy.style.opacity = '0';
  setTimeout(() => {
    logoMain.style.transition = 'opacity 1s, transform 1s';
    logoMosaic.style.transition = 'opacity 1s, transform 1s';
    logoMain.style.opacity = '1';
    logoMosaic.style.opacity = '1';
    presentedBy.style.transition = 'opacity 1s';
    presentedBy.style.opacity = '1';
    // Collab pulse: merge, then split
    setTimeout(() => {
      logoMain.style.transform = 'translateX(40px) scale(1.1)';
      logoMosaic.style.transform = 'translateX(-40px) scale(1.1)';
      setTimeout(() => {
        logoMain.style.transform = 'translateX(0) scale(1)';
        logoMosaic.style.transform = 'translateX(0) scale(1)';
      }, 700);
    }, 1200);
  }, 800);

  // HEADLINE TYPE-IN ANIMATION
  const headline = document.getElementById('hero-headline') as HTMLElement;
  const subheadline = document.getElementById('hero-subheadline') as HTMLElement;
  const headlineText = headline.textContent || '';
  headline.textContent = '';
  let i = 0;
  function typeHeadline() {
    if (i < headlineText.length) {
      headline.textContent += headlineText[i];
      headline.style.opacity = '1';
      i++;
      setTimeout(typeHeadline, 38 + Math.random()*40);
    } else {
      // Subheadline rises
      setTimeout(() => {
        subheadline.style.opacity = '1';
        subheadline.animate([
          { transform: 'translateY(40px)', opacity: 0 },
          { transform: 'translateY(0)', opacity: 1 }
        ], { duration: 700, fill: 'forwards' });
      }, 400);
    }
  }
  setTimeout(typeHeadline, 2200);

  // IGNITE BUTTON FLICKER
  const igniteBtn = document.getElementById('ignite-btn') as HTMLButtonElement;
  igniteBtn.style.opacity = '0';
  setTimeout(() => {
    igniteBtn.style.opacity = '1';
    igniteBtn.classList.add('flicker');
    igniteBtn.style.pointerEvents = 'auto';
  }, 3500);

  // CORNER LOGO FADE-IN
  const cornerLogo = document.getElementById('corner-logo') as HTMLImageElement;
  cornerLogo.style.opacity = '0';
  setTimeout(() => {
    cornerLogo.style.opacity = '1';
  }, 4200);

  // IGNITE BUTTON SCROLL
  igniteBtn.addEventListener('click', () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  });
});