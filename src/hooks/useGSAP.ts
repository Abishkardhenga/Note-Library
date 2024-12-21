import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export const useGSAP = () => {
  useEffect(() => {
    // Initialize text animations
    const splitTexts = document.querySelectorAll('.split-text');
    splitTexts.forEach(text => {
      const split = new SplitType(text as HTMLElement, { types: 'chars,words' });
      gsap.from(split.chars, {
        scrollTrigger: {
          trigger: text,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
          markers: false
        },
        opacity: 0.2,
        stagger: 0.1,
        y: 100,
        rotateX: -90,
        transformOrigin: '0% 50% -50',
        ease: 'back.out(2)'
      });
    });

    // Initialize fade-up animations
    const fadeUpElements = document.querySelectorAll('.fade-up');
    fadeUpElements.forEach(element => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          end: 'top 60%',
          scrub: 1,
          markers: false
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });

    // Initialize scale animations
    const scaleElements = document.querySelectorAll('.scale-in');
    scaleElements.forEach(element => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
          markers: false
        },
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });

    // Initialize parallax effects
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          markers: false
        },
        y: -100,
        ease: 'none'
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};

export const useHeaderAnimation = () => {
  useEffect(() => {
    const header = document.querySelector('.main-header');
    if (!header) return;

    gsap.to(header, {
      scrollTrigger: {
        start: 'top top',
        end: '+=100',
        scrub: 1,
        markers: false
      },
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      duration: 0.3
    });
  }, []);
};

export const useHeroAnimation = () => {
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-title', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2
    })
    .from('.hero-subtitle', {
      y: 50,
      opacity: 0,
      duration: 0.8
    }, '-=0.5')
    .from('.hero-button', {
      scale: 0.8,
      opacity: 0,
      duration: 0.5
    }, '-=0.3')
    .from('.hero-image', {
      x: 100,
      opacity: 0,
      duration: 1
    }, '-=0.8');
  }, []);
};

export const useFeatureAnimation = () => {
  useEffect(() => {
    const features = document.querySelectorAll('.feature-card');
    features.forEach((feature, index) => {
      gsap.from(feature, {
        scrollTrigger: {
          trigger: feature,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
          markers: false
        },
        x: index % 2 === 0 ? -100 : 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });
  }, []);
};

export const useTestimonialAnimation = () => {
  useEffect(() => {
    const testimonials = document.querySelectorAll('.testimonial-card');
    testimonials.forEach((testimonial, index) => {
      gsap.from(testimonial, {
        scrollTrigger: {
          trigger: testimonial,
          start: 'top 85%',
          end: 'top 65%',
          scrub: 1,
          markers: false
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: index * 0.2,
        ease: 'power3.out'
      });
    });
  }, []);
};

export const useContactAnimation = () => {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 70%',
        end: 'top 30%',
        scrub: 1,
        markers: false
      }
    });

    tl.from('.contact-title', {
      y: 50,
      opacity: 0,
      duration: 0.8
    })
    .from('.contact-form', {
      y: 100,
      opacity: 0,
      duration: 1
    }, '-=0.4')
    .from('.contact-info', {
      x: 100,
      opacity: 0,
      duration: 1
    }, '-=0.8');
  }, []);
};