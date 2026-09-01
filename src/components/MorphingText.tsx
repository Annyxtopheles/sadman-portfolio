import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const morphTime = 1.25;
const cooldownTime = 2.5;

export interface MorphingTextProps {
  className?: string;
  texts: string[];
  align?: "left" | "center" | "right";
}

export const MorphingText: React.FC<MorphingTextProps> = ({
  texts,
  className,
  align = "center",
}) => {
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(0);
  const timeRef = useRef(new Date());

  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);
  const [isMorphing, setIsMorphing] = useState(false);

  const setStyles = useCallback(
    (fraction: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current];
      if (!current1 || !current2) return;

      current2.style.filter = `blur(${Math.min(6 / fraction - 6, 80)}px)`;
      current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      const invertedFraction = 1 - fraction;
      current1.style.filter = `blur(${Math.min(6 / invertedFraction - 6, 80)}px)`;
      current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`;

      current1.textContent = texts[textIndexRef.current % texts.length];
      current2.textContent = texts[(textIndexRef.current + 1) % texts.length];
    },
    [texts],
  );

  const doMorph = useCallback(() => {
    setIsMorphing(true);
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;

    let fraction = morphRef.current / morphTime;

    if (fraction > 1) {
      cooldownRef.current = cooldownTime;
      fraction = 1;
    }

    setStyles(fraction);

    if (fraction === 1) {
      textIndexRef.current++;
    }
  }, [setStyles]);

  const doCooldown = useCallback(() => {
    setIsMorphing(false);
    morphRef.current = 0;
    const [current1, current2] = [text1Ref.current, text2Ref.current];
    if (current1 && current2) {
      current2.style.filter = "";
      current2.style.opacity = "100%";
      current1.style.filter = "";
      current1.style.opacity = "0%";
    }
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const newTime = new Date();
      const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000;
      timeRef.current = newTime;

      cooldownRef.current -= dt;

      if (cooldownRef.current <= 0) {
        doMorph();
      } else {
        doCooldown();
      }
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [doMorph, doCooldown]);

  const isLeft = align === "left";
  const isRight = align === "right";

  return (
    <>
      <span
        className={cn(
          "relative inline-grid transition-[filter] duration-200",
          isLeft ? "justify-items-start text-left" : isRight ? "justify-items-end text-right" : "place-items-center text-center",
          isMorphing ? "[filter:url(#threshold)_blur(0.5px)]" : "",
          className,
        )}
      >
        <span
          ref={text1Ref}
          className={cn(
            "col-start-1 row-start-1 inline-block will-change-[filter,opacity]",
            isLeft ? "text-left justify-self-start" : isRight ? "text-right justify-self-end" : "text-center justify-self-center"
          )}
        />
        <span
          ref={text2Ref}
          className={cn(
            "col-start-1 row-start-1 inline-block will-change-[filter,opacity]",
            isLeft ? "text-left justify-self-start" : isRight ? "text-right justify-self-end" : "text-center justify-self-center"
          )}
        >
          {texts[0]}
        </span>
      </span>
      <svg className="fixed h-0 w-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 180 -80"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
};
