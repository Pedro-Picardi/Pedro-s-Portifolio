'use client'
import React, { useEffect, useRef, useState } from 'react';
import styles from './Profile.module.css';

const Profile = () => {
  const sphereRef = useRef<HTMLDivElement>(null);
  const asciiRef = useRef<HTMLPreElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load the ASCII art
    const loadAsciiArt = async () => {
      try {
        const response = await fetch('/api/ascii-pedro');
        if (!response.ok) {
          throw new Error('API response not ok');
        }
        const text = await response.text();
        if (asciiRef.current) {
          asciiRef.current.textContent = text;
        }
      } catch (error) {
        console.error('Failed to load ASCII art:', error);
        // Fallback to show error message
        if (asciiRef.current) {
          asciiRef.current.textContent = 'Error loading ASCII art';
        }
      } finally {
        setLoading(false);
      }
    };

    loadAsciiArt();

    // 3D rotation effect
    const sphere = sphereRef.current;
    if (!sphere) return;

    let rotX = 0;
    let rotY = 0;
    let tiltX = 0;
    let tiltY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      // Calculate tilt based on cursor position relative to center of viewport
      tiltX = ((y - window.innerHeight / 2) / window.innerHeight) * 10;
      tiltY = ((x - window.innerWidth / 2) / window.innerWidth) * 10;
    };

    const animate = () => {
      rotX += (tiltX - rotX) * 0.05;
      rotY += (tiltY - rotY) * 0.05;
      
      if (sphere) {
        sphere.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }
      
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.sphereContainer}>
        <div ref={sphereRef} className={styles.sphere}>
          <div className={styles.asciiContainer}>
            {loading && <div className={styles.loading}>Loading...</div>}
            <pre ref={asciiRef} className={styles.ascii}></pre>
          </div>
        </div>
        <div className={styles.sphereGlow}></div>
        <div className={styles.sphereReflection}></div>
      </div>
    </div>
  );
};

export default Profile;