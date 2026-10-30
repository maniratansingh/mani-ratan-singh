"use client";

import * as React from "react";
import * as THREE from "three";
import { HeroFallback } from "@/components/hero/HeroFallback";

function createProceduralStudioEnv(renderer: THREE.WebGLRenderer): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  // 1. Luxury ambient studio base gradient (warm champagne into cool silver)
  const grad = ctx.createLinearGradient(0, 0, 1024, 512);
  grad.addColorStop(0, "#F7F5F0");
  grad.addColorStop(0.3, "#E8E2D8");
  grad.addColorStop(0.6, "#D8DFE8");
  grad.addColorStop(0.85, "#FFFFFF");
  grad.addColorStop(1, "#C5B9A8");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 512);

  // 2. Main key light softbox (high intensity specular source)
  const softbox1 = ctx.createRadialGradient(280, 140, 10, 280, 140, 180);
  softbox1.addColorStop(0, "rgba(255, 255, 255, 1.0)");
  softbox1.addColorStop(0.4, "rgba(255, 250, 240, 0.85)");
  softbox1.addColorStop(1, "rgba(255, 255, 255, 0.0)");
  ctx.fillStyle = softbox1;
  ctx.beginPath();
  ctx.arc(280, 140, 180, 0, Math.PI * 2);
  ctx.fill();

  // 3. Rim fill softbox (cool silver edge highlight)
  const softbox2 = ctx.createRadialGradient(780, 360, 20, 780, 360, 220);
  softbox2.addColorStop(0, "rgba(240, 245, 255, 0.95)");
  softbox2.addColorStop(0.5, "rgba(200, 215, 235, 0.5)");
  softbox2.addColorStop(1, "rgba(200, 215, 235, 0.0)");
  ctx.fillStyle = softbox2;
  ctx.beginPath();
  ctx.arc(780, 360, 220, 0, Math.PI * 2);
  ctx.fill();

  // 4. Accent Champagne horizon streak
  const streak = ctx.createLinearGradient(0, 240, 1024, 270);
  streak.addColorStop(0, "rgba(197, 185, 168, 0)");
  streak.addColorStop(0.5, "rgba(245, 235, 220, 0.7)");
  streak.addColorStop(1, "rgba(174, 182, 195, 0)");
  ctx.fillStyle = streak;
  ctx.fillRect(0, 230, 1024, 50);

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function GlassSculpture() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [webglSupported, setWebglSupported] = React.useState<boolean | null>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
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

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.4);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // 2. Procedural Studio Environment for True Optical Refraction
    const envTexture = createProceduralStudioEnv(renderer);
    scene.environment = envTexture;

    // 3. Directional & Point Lights for Physical Highlights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.8);
    keyLight.position.set(5, 6, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xdbe6f2, 2.2);
    rimLight.position.set(-5, -3, -4);
    scene.add(rimLight);

    const centerPoint = new THREE.PointLight(0xc5b9a8, 3.2, 8);
    centerPoint.position.set(0, 1, 2);
    scene.add(centerPoint);

    // 4. Sculpture Group
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Primary Liquid Glass Shell
    const mainGeometry = new THREE.TorusKnotGeometry(1.24, 0.44, 200, 36, 2, 3);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.98,
      opacity: 1.0,
      transparent: true,
      roughness: 0.05,
      ior: 1.52,
      thickness: 2.6,
      specularIntensity: 1.2,
      specularColor: new THREE.Color(0xffffff),
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      attenuationColor: new THREE.Color("#C5B9A8"),
      attenuationDistance: 1.8,
      dispersion: 0.09, // Real chromatic dispersion prism optics
    });

    const mainSculpture = new THREE.Mesh(mainGeometry, glassMaterial);
    sculptureGroup.add(mainSculpture);

    // Secondary Floating Inner Glass Ribbon
    const innerGeometry = new THREE.TorusGeometry(0.85, 0.16, 24, 80);
    const innerGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf5f0ea,
      transmission: 0.92,
      opacity: 1.0,
      transparent: true,
      roughness: 0.12,
      ior: 1.48,
      thickness: 1.5,
      attenuationColor: new THREE.Color("#AEB6C3"),
      attenuationDistance: 2.5,
    });
    const innerRibbon = new THREE.Mesh(innerGeometry, innerGlassMaterial);
    innerRibbon.rotation.x = Math.PI / 3;
    sculptureGroup.add(innerRibbon);

    // Luminous Metallic Champagne Nucleus Core
    const coreGeometry = new THREE.IcosahedronGeometry(0.36, 3);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xd9cebe,
      emissive: 0xc5b9a8,
      emissiveIntensity: 0.7,
      roughness: 0.15,
      metalness: 0.85,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    sculptureGroup.add(core);

    // 5. Interactive Mouse & Pointer Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
        sculptureGroup.rotation.y += deltaX * 0.008;
        sculptureGroup.rotation.x += deltaY * 0.008;
        return;
      }

      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.35;
      mouseY = y * 0.35;
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

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
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      if (!prefersReducedMotion && !isDragging) {
        // Slow majestic floating rotation
        sculptureGroup.rotation.y += 0.003;
        mainSculpture.rotation.x = Math.sin(elapsedTime * 0.35) * 0.15;
        innerRibbon.rotation.y -= 0.005;
        innerRibbon.rotation.z = Math.cos(elapsedTime * 0.4) * 0.2;

        sculptureGroup.position.y = Math.sin(elapsedTime * 0.6) * 0.09;

        // Core breath
        const coreScale = 1 + Math.sin(elapsedTime * 1.5) * 0.06;
        core.scale.set(coreScale, coreScale, coreScale);
      }

      // Smooth pointer lerp
      targetRotX += (mouseY - targetRotX) * 0.05;
      targetRotY += (mouseX - targetRotY) * 0.05;

      if (!isDragging) {
        sculptureGroup.rotation.x += targetRotX * 0.06;
        sculptureGroup.rotation.z = -targetRotY * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
      envTexture.dispose();
      mainGeometry.dispose();
      glassMaterial.dispose();
      innerGeometry.dispose();
      innerGlassMaterial.dispose();
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
      className="relative w-full h-[400px] sm:h-[520px] lg:h-[620px] flex items-center justify-center select-none"
    >
      {/* Dynamic ambient optical diffusion glow */}
      <div
        className="absolute w-80 h-80 sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-tr from-[var(--accent-champagne)]/30 via-[var(--accent-silver)]/35 to-white/40 blur-[90px] pointer-events-none opacity-75 dark:opacity-40 transition-opacity duration-1000"
        aria-hidden="true"
      />

      <canvas
        ref={canvasRef}
        className={`w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Interactive 3D optical glass sculpture with chromatic dispersion and realistic refraction"
      />

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <HeroFallback />
        </div>
      )}
    </div>
  );
}
