"use client";

import Link from "next/link";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const sts = {
      trigger: ".main",
      start: "top 10%",
      toggleActions: "play reverse play reverse",
      // markers:true
    };

    const leftXvalues = [-800, -900, -400];
    const rightXvalues = [800, 900, 400];
    const leftRotationvalues = [-30, -20, -35];
    const rightRotationvalues = [30, 20, 35];
    const yValues = [100, -150, -400];

    gsap.utils.toArray(".row").forEach((row, i) => {
      const cardLeft = row.querySelector(".card-left");
      const cardRight = row.querySelector(".card-right");

      // Left Card Animation
      gsap.to(cardLeft, {
        scrollTrigger: {
          trigger: ".main",
          start: "top center",
          end: "150% bottom",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            cardLeft.style.transform = `translateX(${
              progress * leftXvalues[i]
            }px) translateY(${progress * yValues[i]}px) rotate(${
              progress * leftRotationvalues[i]
            }deg)`;
          },
        },
      });

      // Right Card Animation
      gsap.to(cardRight, {
        scrollTrigger: {
          trigger: ".main",
          start: "top center",
          end: "150% bottom",
          // markers:true,
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            cardRight.style.transform = `translateX(${
              progress * rightXvalues[i]
            }px) translateY(${progress * yValues[i]}px) rotate(${
              progress * rightRotationvalues[i]
            }deg)`;
          },
        },
      });
    });

    // Logo Animation
    gsap.to(".logo", {
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
      scrollTrigger: sts,
    });

    // Text Animation
    gsap.to(".line p", {
      y: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power3.out",
      scrollTrigger: sts,
    });

    // Button Animation
    gsap.to("button", {
      y: 0,
      opacity: 1,
      delay: 0.29,
      duration: 0.5,
      ease: "power3.out",
      scrollTrigger: sts,
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const generateRows = () => {
    const rows = [];
    for (let i = 1; i <= 3; i++) {
      rows.push(
        <div className="row" key={i}>
          <div className="card card-left">
            <img src={`/img-${2 * i - 1}.webp`} />
          </div>
          <div className="card card-right">
            <img src={`/img-${2 * i}.webp`} />
          </div>
        </div>
      );
    }
    return rows;
  };

  return (
    <>
      <ReactLenis root>
        <section className="hero">
          <div className="img absolute left-[38%] ">
            <img className="w-[50%]  rounded-full" src="/img.webp" alt="img" />
          </div>
        </section>
        <section className="main">
          <div className="main-content">
            <div className="logo">
              <img src="/img2.webp" alt="img" />
            </div>
            <div className="copy">
              <div className="line">
                <p>This is the sample page</p>
              </div>

              <div className="line">
                <p>--------------</p>
              </div>

              <div className="line">
                <p>-----------</p>
              </div>
            </div>

            <div className="btn">
              <button>Get Now</button>
            </div>
          </div>
          {generateRows()}
        </section>
        <section className="footer">
          <Link href="facebook.com">____________</Link>
        </section>
      </ReactLenis>
    </>
  );
}
