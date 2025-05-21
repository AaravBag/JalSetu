import { useEffect, useRef } from 'react';

export const useWaterQualityAnimation = (isVisible: boolean = true) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && elementRef.current) {
      elementRef.current.classList.add('animate-fade-in', 'animate-slide-in-bottom');
      const iconContainer = elementRef.current.querySelector('.icon-container');
      if (iconContainer) {
        iconContainer.classList.add('animate-float');
      }
      const valueDisplay = elementRef.current.querySelector('.value-display');
      if (valueDisplay) {
        valueDisplay.classList.add('animate-scale-in');
      }
    }
  }, [isVisible]);

  return elementRef;
};

export const useMoistureAnimation = (percentage: number) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      const circle = elementRef.current.querySelector('.progress-circle') as SVGCircleElement;
      if (circle) {
        // Update stroke-dashoffset using CSS custom property
        const circumference = parseInt(circle.getAttribute('r') || '0') * 2 * Math.PI;
        const offset = circumference - (percentage / 100) * circumference;
        circle.style.setProperty('--progress-offset', `${offset}`);
        circle.classList.add('animate-progress');
      }

      const counter = elementRef.current.querySelector('.percentage-counter');
      if (counter instanceof HTMLElement) {
        counter.textContent = percentage.toString();
        counter.classList.add('animate-fade-in');
      }
    }
  }, [percentage]);

  return elementRef;
};

export const useWeatherAnimation = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      const weatherIcons = elementRef.current.querySelectorAll('.weather-icon');
      weatherIcons.forEach((icon, index) => {
        icon.classList.add('animate-float');
        if (icon instanceof HTMLElement) {
          icon.style.animationDelay = `${index * 200}ms`;
        }
      });

      const temperatures = elementRef.current.querySelectorAll('.temperature');
      temperatures.forEach((temp, index) => {
        temp.classList.add('animate-scale-in');
        if (temp instanceof HTMLElement) {
          temp.style.animationDelay = `${index * 150}ms`;
        }
      });
    }
  }, []);

  return elementRef;
}; 