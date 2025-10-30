import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './MagicalParticles.css';

const MagicalParticles = ({ color, trigger, onComplete }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (trigger > 0) {
      // Generate particles
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: `${trigger}-${i}`,
        angle: (Math.PI * 2 * i) / 30,
        distance: 100 + Math.random() * 100,
        size: 4 + Math.random() * 8,
        duration: 0.8 + Math.random() * 0.4
      }));

      setParticles(newParticles);

      // Clear after animation
      const timeout = setTimeout(() => {
        setParticles([]);
        if (onComplete) onComplete();
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [trigger, onComplete]);

  if (particles.length === 0) return null;

  return (
    <div className="magical-particles-container">
      {particles.map((particle) => {
        const x = Math.cos(particle.angle) * particle.distance;
        const y = Math.sin(particle.angle) * particle.distance;

        return (
          <motion.div
            key={particle.id}
            className="magical-particle"
            style={{
              backgroundColor: color,
              width: particle.size,
              height: particle.size,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
            animate={{
              x,
              y,
              opacity: 0,
              scale: 1,
            }}
            transition={{
              duration: particle.duration,
              ease: 'easeOut',
            }}
          />
        );
      })}
    </div>
  );
};

export default MagicalParticles;
