document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Scroll Sequence
    const frameCount = 70;
    const currentFrame = index => `public/images/herosection/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.png`;

    const images = [];
    const heroWatch = { frame: 0 };

    // Preload images
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
    }

    // Master Timeline for Scroll Sequence
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero-scroll-section",
            start: "top top",
            end: "bottom bottom",
            scrub: 1
        }
    });

    // Animate Image Sequence
    tl.to(heroWatch, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        duration: 1,
        onUpdate: () => {
            if(images[heroWatch.frame] && images[heroWatch.frame].complete) {
                document.getElementById("hero-sequence-img").src = images[heroWatch.frame].src;
            }
        }
    }, 0);

    // Text Animations along the timeline
    tl.fromTo("#text-1", { opacity: 0, autoAlpha: 0, y: 30 }, { opacity: 1, autoAlpha: 1, y: 0, duration: 0.05 }, 0)
      .to("#text-1", { opacity: 0, autoAlpha: 0, y: -30, duration: 0.05 }, 0.15);

    tl.fromTo("#text-2", { opacity: 0, autoAlpha: 0, y: 30 }, { opacity: 1, autoAlpha: 1, y: 0, duration: 0.05 }, 0.25)
      .to("#text-2", { opacity: 0, autoAlpha: 0, y: -30, duration: 0.05 }, 0.4);

    tl.fromTo("#text-3", { opacity: 0, autoAlpha: 0, y: 30 }, { opacity: 1, autoAlpha: 1, y: 0, duration: 0.05 }, 0.5)
      .to("#text-3", { opacity: 0, autoAlpha: 0, y: -30, duration: 0.05 }, 0.65);

    tl.fromTo("#text-4", { opacity: 0, autoAlpha: 0, y: 30 }, { opacity: 1, autoAlpha: 1, y: 0, duration: 0.05 }, 0.75)
      .to("#text-4", { opacity: 0, autoAlpha: 0, y: -30, duration: 0.05 }, 0.9);

    // 3. Details Section Animations
    const detailsTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".details-section",
            start: "top 70%",
            end: "bottom 80%",
            toggleActions: "play none none reverse"
        }
    });

    detailsTl.from(".detail-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    })
    .from(".detail-paragraph", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.6")
    .fromTo(".detail-img", 
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
        "-=0.6"
    );

    // Parallax on detail image
    gsap.to(".detail-img", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
            trigger: ".details-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    // 4. Feature Showcase (Water Resistance)
    gsap.from(".feature-title", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".feature-showcase",
            start: "top 60%",
            end: "center center",
            scrub: 1
        }
    });

    // 5. Pricing Section
    gsap.from(".pricing-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: ".pricing-section",
            start: "top 80%",
        }
    });

    gsap.from(".price-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: ".pricing-grid",
            start: "top 85%",
        }
    });

    // 6. Specs Grid
    gsap.from(".spec-item", {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".specs-section",
            start: "top 75%",
        }
    });



    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
