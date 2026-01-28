// Timeline with optimized pacing
const tl = gsap.timeline();

// Timeline labels - define key animation moments
tl.addLabel('start')
  .addLabel('heyZoom', 0.2)
  .addLabel('colorChange', 1.2)
  .addLabel('leavesEnter', 1.6)
  .addLabel('heyExit', 2.8)
  .addLabel('textEnter', 3.8)
  .addLabel('sceneExit', 5.5)
  .addLabel('techScene', 6.2)
  .addLabel('fadeOut', 8.7)
  .addLabel('logoZoom', 9.7)
  .addLabel('slideText', 10.5)
  .addLabel('solutionsScene', 13);

// Initial states - hide and position all elements
tl.set('.misu-hey', {
  scale: 14,
  opacity: 0,
  force3D: true
})
// Initial states - hide all leaves first
tl.set('.misu-leaf', {
  opacity: 0,  // Changed from 1 to 0
  scale: 1,
  force3D: true
})
// Check if mobile
const isMobile = window.innerWidth <= 640;

// Set each leaf's rotation AND off-screen position together
if (isMobile) {
  // MOBILE rotations (adjust these values as needed)
  tl.set('.misu-leaf-1', { rotation: -125, x: '-180%', y: '-180%' })
    .set('.misu-leaf-2', { rotation: 150, scaleX: -1, x: '0%', y: '-200%' })
    .set('.misu-leaf-3', { rotation: 170, x: '180%', y: '-200%' })
    .set('.misu-leaf-4', { rotation: -170, x: '180%', y: '0%' })
    .set('.misu-leaf-5', { rotation: 40, x: '-180%', y: '0%' })
    .set('.misu-leaf-6', { rotation: -40, x: '0%', y: '180%' })
    .set('.misu-leaf-7', { rotation: -10, x: '180%', y: '180%' })
    .set('.misu-leaf-8', { rotation: 180, x: '-200%', y: '220%' });
} else {
  // DESKTOP rotations
  tl.set('.misu-leaf-1', { rotation: -125, x: '-180%', y: '-180%' })
    .set('.misu-leaf-2', { rotation: 150, scaleX: -1, x: '0%', y: '-200%' })
    .set('.misu-leaf-3', { rotation: 70, x: '180%', y: '-200%' })
    .set('.misu-leaf-4', { rotation: -75, x: '180%', y: '0%' })
    .set('.misu-leaf-5', { rotation: 40, x: '-180%', y: '0%' })
    .set('.misu-leaf-6', { rotation: 0, x: '0%', y: '180%' })
    .set('.misu-leaf-7', { rotation: 0, x: '180%', y: '180%' })
    .set('.misu-leaf-8', { rotation: 180, x: '-200%', y: '220%' });
}

  tl.set('.misu-text-left', {
    opacity: 0,
    x: -40,
    force3D: true
  })
  .set('.misu-text-right', {
    opacity: 0,
    x: 40,
    force3D: true
  })
  .set(['.misu-texts.misu-tech p', '.misu-tech-highlight'], {
    opacity: 0,
    y: 20,
    force3D: true
  })
  .set('.misu-texts:not(.misu-tech)', {
    opacity: 0
  })
  .set('.misu-star', {
    opacity: 0,
    scale: 0.3,
    rotation: -45,
    force3D: true
  })
  .set('.misu-logo', {
    opacity: 0,
    scale: 14,
    force3D: true
  })
  .set('.misu-slide-text-wrap', {
    x: '100%',
    force3D: true
  })
  .set('.misu-solutions-mit', {
    opacity: 0,
    scale: 0.3,
    force3D: true
  })
  .set('.misu-solutions-text-1', {
    opacity: 0,
    y: -100,
    force3D: true
  })
  .set('.misu-solutions-text-2', {
    opacity: 0,
    y: 100,
    force3D: true
  })
  .set('.misu-solutions-star', {
    opacity: 0,
    scale: 0.01,
    force3D: true
  });

// Scene 1: "hey" zoom in and fade
tl.to('.misu-hey', {
  scale: 1,
  opacity: 1,
  duration: 1.2,
  ease: 'power2.out'
}, 'heyZoom');

// "hey" changes to white while zooming
tl.to('.misu-hey', {
  color: '#ffffff',
  duration: 1.2,
  ease: 'power1.inOut'
}, 'heyZoom+=0.6');

// Show first text container
tl.to('.misu-texts:not(.misu-tech)', {
  opacity: 1,
  duration: 0.01
}, 'leavesEnter');

// Leaves slide in from off-screen positions
tl.to('.misu-leaf', {
  x: '0%',
  y: '0%',
  opacity: 1,
  duration: 1.2,
  stagger: 0.06,
  ease: 'power2.out'
}, 'heyZoom+=0.6');

// Add pause before color change
tl.to({}, { duration: 0.2 }, 'heyExit-0.2')  // 0.2s pause

  // Then the transition
  .to('.misu-hey', {
    opacity: 0,
    duration: 0.6,
    ease: 'power1.inOut'
  }, 'heyExit')
  .to('.misu-intro', {
    backgroundColor: '#59d49b',
    duration: 0.6,
    ease: 'power1.inOut'
  }, 'heyExit')
  .to('.misu-leaf', {
    color: '#003c3c',
    duration: 0.6,
    ease: 'power1.inOut'
  }, 'heyExit')

// "Verwirrt" text enters from left
tl.to('.misu-text-left', {
  opacity: 1,
  x: 0,
  duration: 0.8,
  ease: 'power2.out',
  clearProps: 'transform'
}, 'textEnter');

// "im AV-Dschungel" text enters from right
tl.to('.misu-text-right', {
  opacity: 1,
  x: 0,
  duration: 0.8,
  ease: 'power2.out',
  clearProps: 'transform'
}, 'textEnter+=0.6');

// NEW: Leaves start sliding out SLOWLY - each in their original direction
tl.to('.misu-leaf-1', {
  x: '-150%',
  y: '-150%',
  opacity: 0.3,
  duration: 3.5,
  ease: 'power1.inOut'
}, 'textEnter+=0.3')
  .to('.misu-leaf-2', {
    x: '0%',
    y: '-150%',
    opacity: 0.3,
    duration: 3.5,
    ease: 'power1.inOut'
  }, 'textEnter+=0.3')
  .to('.misu-leaf-3', {
    x: '150%',
    y: '-150%',
    opacity: 0.3,
    duration: 3.5,
    ease: 'power1.inOut'
  }, 'textEnter+=0.3')
  .to('.misu-leaf-4', {
    x: '150%',
    y: '0%',
    opacity: 0.3,
    duration: 3.5,
    ease: 'power1.inOut'
  }, 'textEnter+=0.3')
  .to('.misu-leaf-5', {
    x: '-200%',
    y: '0%',
    opacity: 0.3,
    duration: 3.5,
    ease: 'power1.inOut'
  }, 'textEnter+=0')
  .to('.misu-leaf-6', {
    x: '0%',
    y: '150%',
    opacity: 0.3,
    duration: 3.5,
    ease: 'power1.inOut'
  }, 'textEnter+=0.3')
  .to('.misu-leaf-7', {
    x: '150%',
    y: '150%',
    opacity: 0.3,
    duration: 3.5,
    ease: 'power1.inOut'
  }, 'textEnter+=0.3')
  .to('.misu-leaf-8', {
    x: '-150%',
    y: '150%',
    opacity: 0.3,
    duration: 3.5,
    ease: 'power1.inOut'
  }, 'textEnter+=0.3');

// Scene 3: Exit green scene - text fades, leaves finish exiting, background changes
tl.to('.misu-texts:not(.misu-tech) p', {
  opacity: 0,
  y: 20,
  duration: 0.6,
  ease: 'power1.in'
}, 'sceneExit')
  .to('.misu-leaf', {
    opacity: 0,  // Fully fade out
    duration: 0.4,
    ease: 'power1.in'
  }, 'sceneExit')
  .to('.misu-intro', {
    backgroundColor: '#dcc1ff',
    duration: 0.6,
    ease: 'power1.inOut'
  }, 'sceneExit')
  .set('.misu-texts:not(.misu-tech)', {
    display: 'none'
  }, 'sceneExit+=0.6')

// Scene 4: Tech scene - "Zu viel" enters from top
tl.fromTo('.misu-tech-1',
  {
    opacity: 0,
    y: -100
  },
  {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power2.out',
    clearProps: 'transform'
  },
  'techScene'
);

// "Technik," enters from top (higher position)
tl.fromTo('.misu-tech-highlight',
  {
    opacity: 0,
    y: -100
  },
  {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power2.out',
    clearProps: 'transform'
  },
  'techScene+=0.2'
);

// "zu wenig" enters from bottom
tl.fromTo('.misu-tech-2',
  {
    opacity: 0,
    y: 100
  },
  {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power2.out',
    clearProps: 'transform'
  },
  'techScene+=0.4'
);

// "Spass?" letters pop in with stagger
tl.fromTo('.misu-spass-letter',
  {
    opacity: 0,
    scale: 0.5
  },
  {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    stagger: 0.08,
    ease: 'back.out(1.7)',
    clearProps: 'transform'
  },
  'techScene+=1.0'
);

// Star bounces in
tl.to('.misu-star', {
  opacity: 1,
  scale: 1,
  rotation: 0,
  duration: 0.8,
  ease: 'back.out(2)'
}, 'techScene+=2.0');

// Scene 5: Fade out tech scene
tl.to(['.misu-tech-1', '.misu-tech-highlight', '.misu-tech-2', '.misu-spass-letter', '.misu-star'], {
  opacity: 0,
  duration: 0.8,
  ease: 'power1.in'
}, 'fadeOut')
  .to('.misu-intro', {
    backgroundColor: '#842e60',
    duration: 0.8,
    ease: 'power1.inOut'
  }, 'fadeOut')
  .set(['.misu-texts.misu-tech', '.misu-star-wrap'], {
    display: 'none'
  }, 'fadeOut+=0.8');

// Scene 6: Logo zooms in
tl.to('.misu-logo', {
  scale: 1,
  opacity: 1,
  duration: 1.2,
  ease: 'power2.out'
}, 'logoZoom');

// Scene 7: Slide text transitions across screen
tl.to('.misu-slide-text-wrap', {
  x: '-150%',
  duration: 3,
  ease: 'power1.inOut'
}, 'slideText')
  // Background changes when text LEFT EDGE reaches left viewport edge
  .to('.misu-intro', {
    backgroundColor: '#31003a',
    duration: 0.01
  }, 'slideText+=1.2')  // When text reaches x: 0%
  .to('.misu-logo', {
    opacity: 0,
    duration: 0.01
  }, 'slideText+=1.2');

// Scene 8: Solutions scene - "Mit" appears first (center, small to big)
tl.fromTo('.misu-solutions-mit',
  {
    opacity: 0,
    scale: 0.3
  },
  {
    opacity: 1,
    scale: 1,
    duration: 0.6,
    ease: 'back.out(1.5)'
  },
  'solutionsScene'
);

// "Mit" fades out
tl.to('.misu-solutions-mit', {
  opacity: 0,
  duration: 0.3,
  ease: 'power1.in'
}, 'solutionsScene+=0.6');

// "Lösungen," enters from top
tl.to('.misu-solutions-text-1', {
  opacity: 1,
  y: 0,
  duration: 0.6,
  ease: 'power2.out'
}, 'solutionsScene+=1.4');

// "die begeistern." enters from bottom
tl.to('.misu-solutions-text-2', {
  opacity: 1,
  y: 0,
  duration: 0.6,
  ease: 'power2.out'
}, 'solutionsScene+=1.9');

tl.to('.misu-solutions-star', {
  opacity: 1,
  scale: 3,
  scaleX: 6,  // 3 * 2 = 6 (makes it 2x wider than tall)
  rotation: 99,  // Rotates 90 degrees clockwise
  duration: 2,
  ease: 'power2.inOut'
}, 'solutionsScene+=1.9');

/*
// TEMPORARY: Pause at 3 seconds (after leaves are in position)
tl.pause(9);*/