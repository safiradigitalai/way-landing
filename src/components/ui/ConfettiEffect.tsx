'use client';

import React, { useEffect, useRef, useCallback, useMemo } from 'react';

interface ConfettiEffectProps {
  ativo: boolean;
  duracao?: number;
  onComplete?: () => void;
}

interface Particula {
  x: number;
  y: number;
  velocidadeX: number;
  velocidadeY: number;
  cor: string;
  tamanho: number;
  rotacao: number;
  velocidadeRotacao: number;
  forma: 'quadrado' | 'circulo' | 'triangulo';
  opacidade: number;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({
  ativo,
  duracao = 3000,
  onComplete
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const particulasRef = useRef<Particula[]>([]);
  const tempoInicioRef = useRef<number | undefined>(undefined);

  const cores = useMemo(() => [
    '#FFD700', // Dourado
    '#FF6B6B', // Vermelho
    '#4ECDC4', // Turquesa
    '#45B7D1', // Azul
    '#96CEB4', // Verde
    '#FFEAA7', // Amarelo claro
    '#DDA0DD', // Roxo claro
    '#98D8C8'  // Verde água
  ], []);

  const gerarParticula = useCallback((x?: number, y?: number): Particula => {
    const larguraCanvas = window.innerWidth;

    return {
      x: x ?? Math.random() * larguraCanvas,
      y: y ?? -20,
      velocidadeX: (Math.random() - 0.5) * 15,
      velocidadeY: Math.random() * 10 + 5,
      cor: cores[Math.floor(Math.random() * cores.length)],
      tamanho: Math.random() * 12 + 6,
      rotacao: Math.random() * 360,
      velocidadeRotacao: (Math.random() - 0.5) * 25,
      forma: ['quadrado', 'circulo', 'triangulo'][Math.floor(Math.random() * 3)] as 'quadrado' | 'circulo' | 'triangulo',
      opacidade: 1
    };
  }, [cores]);

  const criarExplosaoConfetti = useCallback(() => {
    const novasParticulas: Particula[] = [];
    const centroX = window.innerWidth / 2;
    const centroY = window.innerHeight / 3;

    // Criar múltiplas explosões
    for (let explosao = 0; explosao < 3; explosao++) {
      const offsetX = (explosao - 1) * 200;
      const offsetY = explosao * 100;

      for (let i = 0; i < 40; i++) {
        const angulo = (Math.PI * 2 * i) / 40;
        const velocidade = Math.random() * 20 + 10;

        novasParticulas.push({
          x: centroX + offsetX,
          y: centroY + offsetY,
          velocidadeX: Math.cos(angulo) * velocidade,
          velocidadeY: Math.sin(angulo) * velocidade,
          cor: cores[Math.floor(Math.random() * cores.length)],
          tamanho: Math.random() * 10 + 4,
          rotacao: Math.random() * 360,
          velocidadeRotacao: (Math.random() - 0.5) * 30,
          forma: ['quadrado', 'circulo', 'triangulo'][Math.floor(Math.random() * 3)] as 'quadrado' | 'circulo' | 'triangulo',
          opacidade: 1
        });
      }
    }

    // Adicionar chuva de confetti do topo
    for (let i = 0; i < 80; i++) {
      novasParticulas.push(gerarParticula());
    }

    particulasRef.current = novasParticulas;
  }, [cores, gerarParticula]);

  const desenharParticula = (ctx: CanvasRenderingContext2D, particula: Particula) => {
    ctx.save();
    ctx.globalAlpha = particula.opacidade;
    ctx.translate(particula.x, particula.y);
    ctx.rotate((particula.rotacao * Math.PI) / 180);

    ctx.fillStyle = particula.cor;
    ctx.strokeStyle = particula.cor;
    ctx.lineWidth = 2;

    const metadeTamanho = particula.tamanho / 2;

    switch (particula.forma) {
      case 'quadrado':
        ctx.fillRect(-metadeTamanho, -metadeTamanho, particula.tamanho, particula.tamanho);
        break;

      case 'circulo':
        ctx.beginPath();
        ctx.arc(0, 0, metadeTamanho, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'triangulo':
        ctx.beginPath();
        ctx.moveTo(0, -metadeTamanho);
        ctx.lineTo(-metadeTamanho, metadeTamanho);
        ctx.lineTo(metadeTamanho, metadeTamanho);
        ctx.closePath();
        ctx.fill();
        break;
    }

    ctx.restore();
  };

  const atualizarParticulas = useCallback((deltaTime: number) => {
    const gravidade = 0.8;
    const resistenciaAr = 0.99;
    const fadeDuration = 1000; // 1 segundo para desaparecer

    particulasRef.current = particulasRef.current
      .map(particula => {
        // Aplicar física
        particula.velocidadeY += gravidade;
        particula.velocidadeX *= resistenciaAr;
        particula.velocidadeY *= resistenciaAr;

        particula.x += particula.velocidadeX;
        particula.y += particula.velocidadeY;
        particula.rotacao += particula.velocidadeRotacao;

        // Fade out nas últimas partículas
        if (deltaTime > duracao - fadeDuration) {
          const fadeProgress = (deltaTime - (duracao - fadeDuration)) / fadeDuration;
          particula.opacidade = Math.max(0, 1 - fadeProgress);
        }

        return particula;
      })
      .filter(particula => {
        // Remover partículas fora da tela ou completamente transparentes
        return particula.y < window.innerHeight + 50 &&
               particula.x > -50 &&
               particula.x < window.innerWidth + 50 &&
               particula.opacidade > 0;
      });
  }, [duracao]);

  const animar = useCallback((timestamp: number) => {
    if (!tempoInicioRef.current) {
      tempoInicioRef.current = timestamp;
    }

    const deltaTime = timestamp - tempoInicioRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) return;

    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Atualizar e desenhar partículas
    atualizarParticulas(deltaTime);
    particulasRef.current.forEach(particula => {
      desenharParticula(ctx, particula);
    });

    // Continuar animação ou finalizar
    if (deltaTime < duracao && particulasRef.current.length > 0) {
      animationRef.current = requestAnimationFrame(animar);
    } else {
      // Animação finalizada
      particulasRef.current = [];
      if (onComplete) {
        onComplete();
      }
    }
  }, [duracao, onComplete, atualizarParticulas]);

  const redimensionarCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  };

  useEffect(() => {
    if (ativo) {
      redimensionarCanvas();
      criarExplosaoConfetti();
      tempoInicioRef.current = undefined;
      animationRef.current = requestAnimationFrame(animar);

      // Som de comemoração (opcional)
      try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAMAQCAAAM=');
        audio.volume = 0.3;
        audio.play().catch(() => {
          // Ignorar erro se não conseguir tocar som
        });
      } catch {
        // Ignorar erro de áudio
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [ativo, animar, criarExplosaoConfetti]);

  useEffect(() => {
    window.addEventListener('resize', redimensionarCanvas);
    return () => window.removeEventListener('resize', redimensionarCanvas);
  }, []);

  if (!ativo) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};

export default ConfettiEffect;