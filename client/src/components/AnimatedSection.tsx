import { useEffect, useRef, useState } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  animation?: "fadeInUp" | "fadeIn" | "slideInLeft" | "slideInRight";
  delay?: number;
  threshold?: number;
}

export default function AnimatedSection({
  children,
  className = "",
  style = {},
  animation = "fadeInUp",
  delay = 0,
  threshold = 0.15,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  const animationClass = {
    fadeInUp: "animate-fade-in-up",
    fadeIn: "animate-fade-in",
    slideInLeft: "animate-slide-in-left",
    slideInRight: "animate-slide-in-right",
  }[animation];

  return (
    <div
      ref={ref}
      className={`${className} ${visible ? animationClass : "opacity-0-init"}`}
      style={{
        ...style,
        animationDelay: visible ? `${delay}ms` : "0ms",
        animationFillMode: "both",
      }}
    >
      {children}
    </div>
  );
}
