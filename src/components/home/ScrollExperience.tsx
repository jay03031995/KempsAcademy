'use client';
import {useEffect} from 'react';
export function ScrollExperience() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), {threshold: .12});
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = document.querySelector<HTMLElement>('[data-parallax]');
      if(hero && window.scrollY < window.innerHeight * 1.6) hero.style.transform = `translateY(${Math.min(window.scrollY * .17,160)}px) scale(1.06)`;
      const journey = document.querySelector<HTMLElement>('[data-journey]');
      if(journey) { const rect=journey.getBoundingClientRect(); journey.style.setProperty('--journey-progress',String(Math.max(0,Math.min(1,(window.innerHeight*.75-rect.top)/rect.height)))); }
    };
    const scroll = () => {if(!frame) frame=requestAnimationFrame(update);};
    window.addEventListener('scroll',scroll,{passive:true});update();
    return () => {observer.disconnect();window.removeEventListener('scroll',scroll);cancelAnimationFrame(frame);};
  },[]);
  return null;
}
