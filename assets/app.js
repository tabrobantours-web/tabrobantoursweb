
(() => {
  const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
  const header=$('[data-header]'), progress=$('.scroll-progress span');
  const updateScroll=()=>{
    const y=window.scrollY, max=document.documentElement.scrollHeight-innerHeight;
    if(header) header.classList.toggle('is-scrolled',y>24);
    if(progress) progress.style.width=`${max>0?(y/max)*100:0}%`;
  };
  addEventListener('scroll',updateScroll,{passive:true}); updateScroll();

  const menuBtn=$('[data-menu-toggle]'), menu=$('[data-mobile-menu]');
  if(menuBtn&&menu){
    menuBtn.addEventListener('click',()=>{
      const open=menu.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded',String(open));
      document.body.style.overflow=open?'hidden':'';
    });
    $$('a',menu).forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('is-open');document.body.style.overflow='';menuBtn.setAttribute('aria-expanded','false')}));
  }

  const toast=(msg)=>{
    let t=$('.toast');
    if(!t){t=document.createElement('div');t.className='toast';document.body.append(t);}
    t.textContent=msg;t.classList.add('is-visible');clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('is-visible'),3200);
  };

  if(window.gsap && window.ScrollTrigger && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.site-header',{y:-25,opacity:0,duration:.75,ease:'power3.out'});
    $$('.reveal').forEach(el=>{
      gsap.from(el,{y:34,opacity:0,duration:.95,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}});
    });
    $$('[data-parallax]').forEach(el=>{
      const speed=parseFloat(el.dataset.speed||'.12');
      gsap.to(el,{yPercent:speed*100,ease:'none',scrollTrigger:{trigger:el.parentElement,start:'top bottom',end:'bottom top',scrub:true}});
    });
    const orbit=$('.transport-orbit');
    if(orbit) gsap.to(orbit,{rotation:360,duration:26,repeat:-1,ease:'none'});

    // Handpicked Journeys:
    // vertical page scroll drives the entire tour collection from RIGHT to LEFT.
    const handpicked=$('[data-handpicked]');
    const handpickedTrack=$('[data-handpicked-track]');
    if(handpicked && handpickedTrack){
      const cards=$$('.handpicked-card',handpickedTrack);
      const progressLine=$('[data-handpicked-progress]',handpicked);

      gsap.set(cards,{opacity:1});

      const setupHorizontal=(isMobile)=>{
        const viewportWidth=()=>document.documentElement.clientWidth || window.innerWidth;
        const getDistance=()=>Math.max(0,handpickedTrack.scrollWidth-viewportWidth()+28);

        gsap.set(handpickedTrack,{x:0});

        const horizontal=gsap.to(handpickedTrack,{
          x:()=>-getDistance(),
          ease:"none",
          scrollTrigger:{
            trigger:handpicked,
            start:"top top",
            end:()=>"+="+Math.max(getDistance(),window.innerHeight*(isMobile?2.8:1.2)),
            pin:true,
            pinSpacing:true,
            scrub:isMobile?.7:1,
            anticipatePin:1,
            invalidateOnRefresh:true,
            onUpdate:self=>{
              if(progressLine) gsap.set(progressLine,{scaleX:self.progress});
            }
          }
        });

        cards.forEach((card,index)=>{
          const img=$('img',card);
          if(img){
            gsap.fromTo(img,
              {xPercent:index%2===0?7:4,scale:1.11},
              {
                xPercent:index%2===0?-7:-4,
                scale:1.025,
                ease:"none",
                scrollTrigger:{
                  trigger:card,
                  containerAnimation:horizontal,
                  start:"left right",
                  end:"right left",
                  scrub:true
                }
              }
            );
          }
        });

        gsap.from(cards,{
          y:isMobile?18:34,
          opacity:0,
          duration:.72,
          stagger:.035,
          ease:"power3.out",
          scrollTrigger:{trigger:handpicked,start:"top 82%",once:true}
        });

        return ()=> {
          gsap.set(handpickedTrack,{clearProps:"transform"});
          if(progressLine) gsap.set(progressLine,{scaleX:0});
        };
      };

      ScrollTrigger.matchMedia({
        "(min-width: 741px)":()=>setupHorizontal(false),

        "(max-width: 740px)":function(){
          /* Stable mobile presentation: visible swipe carousel +
             GSAP parallax/reveal without pinning the whole section. */
          gsap.set(handpickedTrack,{clearProps:"transform"});
          gsap.set(cards,{opacity:1,clearProps:"transform"});

          cards.forEach((card,index)=>{
            const img=$('img',card);
            const body=$('.handpicked-card__body',card);

            if(img){
              gsap.fromTo(
                img,
                {xPercent:index%2===0?5:3,scale:1.09},
                {
                  xPercent:index%2===0?-5:-3,
                  scale:1.02,
                  ease:"none",
                  scrollTrigger:{
                    trigger:handpicked,
                    start:"top 90%",
                    end:"bottom 15%",
                    scrub:.7
                  }
                }
              );
            }

            if(body){
              gsap.fromTo(
                body,
                {y:16},
                {
                  y:-8,
                  ease:"none",
                  scrollTrigger:{
                    trigger:handpicked,
                    start:"top 88%",
                    end:"bottom 20%",
                    scrub:.7
                  }
                }
              );
            }
          });

          gsap.from(cards,{
            y:22,
            opacity:0,
            duration:.65,
            stagger:.04,
            ease:"power3.out",
            scrollTrigger:{
              trigger:handpicked,
              start:"top 86%",
              once:true
            }
          });
        }
      });
    }

    // Scroll-driven transparent vehicle fleet.
    const fleetSection=$('[data-fleet-showcase]');
    if(fleetSection){
      const vehicles=$$('.vehicle-item',fleetSection);

      const setupFleet=(isMobile)=>{
        if(!vehicles.length) return;

        gsap.set(vehicles,{xPercent:125,opacity:0,scale:isMobile?.96:.92});
        gsap.set(vehicles[0],{xPercent:0,opacity:1,scale:1});

        const fleetTl=gsap.timeline({
          scrollTrigger:{
            trigger:fleetSection,
            start:"top top",
            end:()=>"+="+window.innerHeight*(isMobile?5.1:4.8),
            pin:true,
            pinSpacing:true,
            scrub:isMobile?.65:.8,
            anticipatePin:1,
            invalidateOnRefresh:true
          }
        });

        vehicles.forEach((vehicle,index)=>{
          if(index===0){
            fleetTl.to(vehicle,{
              xPercent:-125,opacity:0,scale:isMobile?.96:.92,
              duration:1,ease:"power2.inOut"
            },"+=.55");
          }else{
            fleetTl.fromTo(
              vehicle,
              {xPercent:125,opacity:0,scale:isMobile?.96:.92},
              {xPercent:0,opacity:1,scale:1,duration:1,ease:"power2.out"},
              "<.12"
            );
            if(index<vehicles.length-1){
              fleetTl.to(vehicle,{
                xPercent:-125,opacity:0,scale:isMobile?.96:.92,
                duration:1,ease:"power2.inOut"
              },"+=.6");
            }else{
              fleetTl.to(vehicle,{
                xPercent:isMobile?-2:-6,opacity:1,scale:1,
                duration:.5,ease:"none"
              },"+=.45");
            }
          }
        });

        return ()=> {
          fleetTl.kill();
          gsap.set(vehicles,{clearProps:"transform,opacity"});
        };
      };

      ScrollTrigger.matchMedia({
        "(min-width: 741px)":()=>setupFleet(false),

        "(max-width: 740px)":function(){
          /* Mobile fleet is a visible vertical sequence.
             Real vehicles enter from the right one-by-one while scrolling. */
          gsap.set(vehicles,{clearProps:"all"});
          gsap.set(vehicles,{opacity:1});

          vehicles.forEach((vehicle,index)=>{
            const img=$('img',vehicle);

            gsap.fromTo(
              vehicle,
              {xPercent:22,opacity:.18},
              {
                xPercent:0,
                opacity:1,
                ease:"none",
                scrollTrigger:{
                  trigger:vehicle,
                  start:"top 92%",
                  end:"top 55%",
                  scrub:.65
                }
              }
            );

            if(img){
              gsap.fromTo(
                img,
                {xPercent:4,scale:.98},
                {
                  xPercent:-3,
                  scale:1,
                  ease:"none",
                  scrollTrigger:{
                    trigger:vehicle,
                    start:"top 95%",
                    end:"bottom 20%",
                    scrub:.8
                  }
                }
              );
            }
          });
        }
      });
    }


  }

  $$('.magnetic').forEach(btn=>{
    btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.12}px)`});
    btn.addEventListener('mouseleave',()=>btn.style.transform='');
  });

  const filterGroup=$('[data-filter-group]'), filterGrid=$('[data-filter-grid]');
  if(filterGroup&&filterGrid){
    $$('[data-filter]',filterGroup).forEach(btn=>btn.addEventListener('click',()=>{
      $$('[data-filter]',filterGroup).forEach(b=>b.classList.remove('is-active'));btn.classList.add('is-active');
      const f=btn.dataset.filter;
      $$('.catalog-card',filterGrid).forEach(card=>card.classList.toggle('is-hidden',f!=='all'&&card.dataset.category!==f));
    }));
  }

  const originFilter=$('[data-origin-filter]'), dayGrid=$('[data-day-grid]');
  if(originFilter&&dayGrid){
    $$('[data-origin]',originFilter).forEach(btn=>btn.addEventListener('click',()=>{
      $$('[data-origin]',originFilter).forEach(b=>b.classList.remove('is-active'));btn.classList.add('is-active');
      const f=btn.dataset.origin;
      $$('.day-card',dayGrid).forEach(card=>card.classList.toggle('is-hidden',f!=='all'&&card.dataset.origin!==f));
    }));
  }

  const sf=$('[data-step-form]');
  if(sf){
    let step=1;
    const form=$('form',sf), steps=$$('.form-step',sf), dots=$$('.planner-steps span',sf), bar=$('[data-progress-bar]',sf);
    const prev=$('[data-prev]',sf), next=$('[data-next]',sf), submit=$('[data-submit]',sf);
    const render=()=>{
      steps.forEach((s,i)=>s.classList.toggle('is-active',i===step-1));
      dots.forEach((d,i)=>d.classList.toggle('is-active',i<=step-1));
      bar.style.width=`${step*25}%`;
      prev.disabled=step===1; next.classList.toggle('is-hidden',step===4); submit.classList.toggle('is-hidden',step!==4);
      sf.scrollIntoView({behavior:'smooth',block:'center'});
    };
    next.addEventListener('click',()=>{
      const current=steps[step-1], required=$$('[required]',current);
      if(required.some(i=>!i.reportValidity())) return;
      step=Math.min(4,step+1);render();
    });
    prev.addEventListener('click',()=>{step=Math.max(1,step-1);render()});
    form.addEventListener('submit',()=>{
      if(submit){
        submit.disabled=true;
        submit.textContent='Sending request…';
      }
    });
  }

  $$('[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{
    e.preventDefault();
    const recipient=form.dataset.recipient||'tabrobantours@gmail.com';
    const data=new FormData(form);
    const lines=[];
    let subject='Tabroban Tours - Website Inquiry';

    for(const [key,value] of data.entries()){
      if(!String(value).trim()) continue;
      lines.push(`${key}: ${value}`);
    }

    if(form.closest('.partner-grid')) subject='Tabroban Tours - Partnership Inquiry';

    const body=encodeURIComponent(lines.join('\\n'));
    window.location.href=`mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${body}`;
  }));
  $$('.itinerary-day button').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.itinerary-day').classList.toggle('is-open')));

  $$('.journey-finder__tabs button').forEach(btn=>btn.addEventListener('click',()=>{
    $$('.journey-finder__tabs button').forEach(b=>b.classList.remove('is-active'));btn.classList.add('is-active');
  }));
  // Recalculate mobile ScrollTrigger positions after images/fonts settle.
  window.addEventListener("load",()=>{
    if(window.ScrollTrigger){
      setTimeout(()=>ScrollTrigger.refresh(),180);
      setTimeout(()=>ScrollTrigger.refresh(),900);
    }
  });

})();
