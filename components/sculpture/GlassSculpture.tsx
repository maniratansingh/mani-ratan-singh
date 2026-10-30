"use client";

import * as React from "react";
import * as THREE from "three";
import { HeroFallback } from "@/components/hero/HeroFallback";

export function GlassSculpture() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [webglSupported, setWebglSupported] = React.useState<boolean | null>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    // Check WebGL capability
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebglSupported(false);
        return;
      }
      setWebglSupported(true);
    } catch {
      setWebglSupported(false);
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.2); // Warm champagne tint
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdce6f2, 1.8); // Cool silver edge tint
    fillLight.position.set(-4, -2, -3);
    scene.add(fillLight);

    const pointLight = new THREE.PointLight(0xc5b9a8, 2.5, 10);
    pointLight.position.set(0, 1.5, 2);
    scene.add(pointLight);

    // 3. Signature Glass Sculpture Geometry & Material
    // Complex Torus Knot providing rich refractive folds and optical contours
    const geometry = new THREE.TorusKnotGeometry(1.22, 0.42, 160, 32, 2, 3);
    
    // Apple Liquid Glass Refractive Material
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.96, // High transparency / light transmission
      opacity: 1.0,
      transparent: true,
      roughness: 0.07, // Ultra-fine polished glass finish
      ior: 1.52, // Optical index of refraction (crown glass)
      thickness: 2.2, // Depth distortion for internal caustics
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xffffff),
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      attenuationColor: new THREE.Color("#C5B9A8"), // Warm champagne dispersion
      attenuationDistance: 2.4,
      reflectivity: 0.85,
    });

    const sculpture = new THREE.Mesh(geometry, glassMaterial);
    scene.add(sculpture);

    // 4. Luminous Internal Core
    const coreGeometry = new THREE.IcosahedronGeometry(0.38, 4);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xf3ede2,
      emissive: 0xc5b9a8,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    sculpture.add(core);

    // 5. Interactive Pointer & Scroll Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.45;
      mouseY = y * 0.45;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 6. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow, restrained continuous floating animation
      if (!prefersReducedMotion) {
        sculpture.rotation.y += 0.0035;
        sculpture.rotation.x = Math.sin(elapsedTime * 0.4) * 0.12;
        sculpture.position.y = Math.sin(elapsedTime * 0.7) * 0.08;

        // Subtle core pulsing
        const scale = 1 + Math.sin(elapsedTime * 1.2) * 0.05;
        core.scale.set(scale, scale, scale);
      }

      // Smooth pointer lerp
      targetRotationX += (mouseY - targetRotationX) * 0.05;
      targetRotationY += (mouseX - targetRotationY) * 0.05;

      sculpture.rotation.x += targetRotationX * 0.1;
      sculpture.rotation.z = -targetRotationY * 0.15;

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      resizeObserver.disconnect();
      geometry.dispose();
      glassMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  if (webglSupported === false) {
    return <HeroFallback />;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[480px] lg:h-[560px] flex items-center justify-center select-none"
    >
      {/* Ambient backdrop dispersion glow */}
      <div
        className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[var(--accent-champagne)]/25 via-[var(--accent-silver)]/30 to-transparent blur-3xl pointer-events-none opacity-60 dark:opacity-40 transition-opacity duration-1000"
        aria-hidden="true"
      />

      <canvas
        ref={canvasRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Interactive 3D optical glass sculpture representing Mani Ratan Singh's creative philosophy"
      />

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <HeroFallback />
        </div>
      )}
    </div>
  );
}
