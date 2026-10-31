"use client";

import * as React from "react";
import * as THREE from "three";
import { HeroFallback } from "@/components/hero/HeroFallback";
import { Sparkles, Eye, Shield } from "lucide-react";

type SculptureMode = "prism" | "obsidian" | "optics";

function createStudioEnvironment(renderer: THREE.WebGLRenderer, mode: SculptureMode): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  if (mode === "obsidian") {
    const darkGrad = ctx.createLinearGradient(0, 0, 1024, 512);
    darkGrad.addColorStop(0, "#121316");
    darkGrad.addColorStop(0.5, "#252830");
    darkGrad.addColorStop(1, "#0A0B0D");
    ctx.fillStyle = darkGrad;
    ctx.fillRect(0, 0, 1024, 512);

    const goldSoftbox = ctx.createRadialGradient(340, 180, 10, 340, 180, 240);
    goldSoftbox.addColorStop(0, "rgba(222, 205, 179, 1.0)");
    goldSoftbox.addColorStop(0.5, "rgba(180, 160, 130, 0.4)");
    goldSoftbox.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = goldSoftbox;
    ctx.beginPath();
    ctx.arc(340, 180, 240, 0, Math.PI * 2);
    ctx.fill();
  } else if (mode === "optics") {
    // Cybernetic dark studio with azure & champagne specular rim lights for wireframe lattice
    const darkLatticeGrad = ctx.createLinearGradient(0, 0, 1024, 512);
    darkLatticeGrad.addColorStop(0, "#08090d");
    darkLatticeGrad.addColorStop(0.5, "#0e1320");
    darkLatticeGrad.addColorStop(1, "#06070a");
    ctx.fillStyle = darkLatticeGrad;
    ctx.fillRect(0, 0, 1024, 512);

    // Cyan key specular
    const cyanLight = ctx.createRadialGradient(320, 160, 10, 320, 160, 240);
    cyanLight.addColorStop(0, "rgba(0, 240, 255, 0.95)");
    cyanLight.addColorStop(0.4, "rgba(0, 180, 255, 0.5)");
    cyanLight.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = cyanLight;
    ctx.beginPath();
    ctx.arc(320, 160, 240, 0, Math.PI * 2);
    ctx.fill();

    // Champagne gold rim
    const goldRim = ctx.createRadialGradient(760, 340, 10, 760, 340, 220);
    goldRim.addColorStop(0, "rgba(223, 192, 133, 0.85)");
    goldRim.addColorStop(0.5, "rgba(180, 150, 90, 0.3)");
    goldRim.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = goldRim;
    ctx.beginPath();
    ctx.arc(760, 340, 220, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // High-contrast iridescent studio environment for dramatic caustic refraction
    const baseGrad = ctx.createLinearGradient(0, 0, 1024, 512);
    baseGrad.addColorStop(0, "#F5EFE6");
    baseGrad.addColorStop(0.25, "#E2D7C3");
    baseGrad.addColorStop(0.5, "#CBD7E6");
    baseGrad.addColorStop(0.75, "#FFFFFF");
    baseGrad.addColorStop(1, "#D8C5AE");
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, 1024, 512);

    // Keylight softbox
    const keyLight = ctx.createRadialGradient(320, 160, 10, 320, 160, 220);
    keyLight.addColorStop(0, "rgba(255, 255, 255, 1.0)");
    keyLight.addColorStop(0.3, "rgba(255, 245, 230, 0.95)");
    keyLight.addColorStop(0.7, "rgba(200, 185, 157, 0.4)");
    keyLight.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = keyLight;
    ctx.beginPath();
    ctx.arc(320, 160, 220, 0, Math.PI * 2);
    ctx.fill();

    // Specular rim source
    const rimLight = ctx.createRadialGradient(760, 340, 10, 760, 340, 240);
    rimLight.addColorStop(0, "rgba(255, 255, 255, 1.0)");
    rimLight.addColorStop(0.4, "rgba(190, 215, 245, 0.8)");
    rimLight.addColorStop(0.8, "rgba(168, 178, 193, 0.3)");
    rimLight.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = rimLight;
    ctx.beginPath();
    ctx.arc(760, 340, 240, 0, Math.PI * 2);
    ctx.fill();
  }

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

  // Wireframe Lattice is default
  const [activeMode, setActiveMode] = React.useState<SculptureMode>("optics");
  const modeRef = React.useRef<SculptureMode>("optics");
  const updateMaterialRef = React.useRef<((mode: SculptureMode) => void) | null>(null);

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
    const width = container.clientWidth || 640;
    const height = container.clientHeight || 640;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    
    const updateCameraDistance = (w: number, h: number) => {
      const aspect = w / h;
      camera.aspect = aspect;
      // Guaranteed 26%+ safety margin on all edges (top, bottom, left, right) across all aspect ratios
      camera.position.z = 6.4 / Math.min(1.0, aspect);
      camera.updateProjectionMatrix();
    };

    updateCameraDistance(width, height);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // 2. Pre-generate and Cache Studio Environment Textures
    const envTextures: Record<SculptureMode, THREE.Texture> = {
      prism: createStudioEnvironment(renderer, "prism"),
      obsidian: createStudioEnvironment(renderer, "obsidian"),
      optics: createStudioEnvironment(renderer, "optics"),
    };
    scene.environment = envTextures.optics;

    // 3. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 3.5);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xdceaff, 2.8);
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0x00f0ff, 3.5, 10);
    pointLight.position.set(0, 1.2, 2.5);
    scene.add(pointLight);

    // 4. Sculpture Architecture (Pure Unobstructed Torus Knot)
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Primary Torus Knot Geometry (Centered vertices & calibrated to never clip)
    const mainGeometry = new THREE.TorusKnotGeometry(0.80, 0.25, 240, 44, 2, 3);
    mainGeometry.center();
    
    // Default Material: Wireframe Lattice with Neon Cyan Edge Glow
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#00f0ff"),
      transmission: 0,
      opacity: 0.92,
      transparent: true,
      roughness: 0.15,
      metalness: 0.85,
      ior: 1.54,
      thickness: 3.2,
      specularIntensity: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      emissive: new THREE.Color("#005577"),
      emissiveIntensity: 0.65,
      wireframe: true,
    });

    const mainSculpture = new THREE.Mesh(mainGeometry, glassMaterial);
    sculptureGroup.add(mainSculpture);

    // Orbiting Prismatic Thin Halo Ring (Centered with generous clearance)
    const haloGeometry = new THREE.TorusGeometry(1.32, 0.038, 32, 120);
    haloGeometry.center();
    const haloMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#DFC085"),
      transmission: 0,
      transparent: true,
      opacity: 0.85,
      roughness: 0.1,
      metalness: 0.8,
      wireframe: true,
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    halo.rotation.x = Math.PI / 2.5;
    sculptureGroup.add(halo);

    // 5. Floating Glass Caustic Dust Particles (Restricted within sculpture aura)
    const particleCount = 45;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 2.8;
      positions[i + 1] = (Math.random() - 0.5) * 2.8;
      positions[i + 2] = (Math.random() - 0.5) * 2.2;
    }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Robust Mode Switcher Implementation (Deterministic & Clean)
    updateMaterialRef.current = (mode: SculptureMode) => {
      modeRef.current = mode;
      scene.environment = envTextures[mode];

      if (mode === "optics") {
        // Wireframe Lattice
        glassMaterial.wireframe = true;
        glassMaterial.color.set("#00f0ff");
        glassMaterial.transmission = 0;
        glassMaterial.opacity = 0.92;
        glassMaterial.roughness = 0.15;
        glassMaterial.metalness = 0.85;
        glassMaterial.emissive.set("#005577");
        glassMaterial.emissiveIntensity = 0.65;
        glassMaterial.needsUpdate = true;

        haloMaterial.wireframe = true;
        haloMaterial.color.set("#DFC085");
        haloMaterial.transmission = 0;
        haloMaterial.opacity = 0.85;
        haloMaterial.needsUpdate = true;

        particleMaterial.color.set(0x00f0ff);
        pointLight.color.set(0x00f0ff);
      } else if (mode === "obsidian") {
        // Obsidian Glass
        glassMaterial.wireframe = false;
        glassMaterial.color.set("#1a1b20");
        glassMaterial.transmission = 0.94;
        glassMaterial.opacity = 1.0;
        glassMaterial.roughness = 0.05;
        glassMaterial.metalness = 0.1;
        glassMaterial.thickness = 4.0;
        glassMaterial.ior = 1.62;
        glassMaterial.dispersion = 0.08;
        glassMaterial.attenuationColor.set("#52473A");
        glassMaterial.attenuationDistance = 1.2;
        glassMaterial.emissive.set("#000000");
        glassMaterial.emissiveIntensity = 0;
        glassMaterial.needsUpdate = true;

        haloMaterial.wireframe = false;
        haloMaterial.color.set("#252830");
        haloMaterial.transmission = 0.9;
        haloMaterial.opacity = 1.0;
        haloMaterial.needsUpdate = true;

        particleMaterial.color.set(0xc8b99d);
        pointLight.color.set(0xc8b99d);
      } else {
        // Prism Caustics
        glassMaterial.wireframe = false;
        glassMaterial.color.set("#ffffff");
        glassMaterial.transmission = 0.99;
        glassMaterial.opacity = 1.0;
        glassMaterial.roughness = 0.02;
        glassMaterial.metalness = 0.0;
        glassMaterial.thickness = 3.2;
        glassMaterial.ior = 1.54;
        glassMaterial.dispersion = 0.15;
        glassMaterial.attenuationColor.set("#C8B99D");
        glassMaterial.attenuationDistance = 1.6;
        glassMaterial.emissive.set("#000000");
        glassMaterial.emissiveIntensity = 0;
        glassMaterial.needsUpdate = true;

        haloMaterial.wireframe = false;
        haloMaterial.color.set("#f4f0ea");
        haloMaterial.transmission = 0.95;
        haloMaterial.opacity = 1.0;
        haloMaterial.needsUpdate = true;

        particleMaterial.color.set(0xffffff);
        pointLight.color.set(0xc8b99d);
      }
    };

    // 6. Interactive Dragging with Physical Angular Momentum (Inertia)
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let velocityX = 0;
    let velocityY = 0;

    const onCanvasPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      velocityX = 0;
      velocityY = 0;
      try {
        canvas.setPointerCapture?.(e.pointerId);
      } catch {
        // ignore
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (isDragging) {
        isDragging = false;
        try {
          canvas.releasePointerCapture?.(e.pointerId);
        } catch {
          // ignore
        }
      }
    };

    const onWindowPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
        velocityX = deltaX * 0.005;
        velocityY = deltaY * 0.005;
        sculptureGroup.rotation.y += velocityX;
        sculptureGroup.rotation.x += velocityY;
        return;
      }

      const rect = container.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        mouseX = x * 0.35;
        mouseY = y * 0.35;
      }
    };

    canvas.addEventListener("pointerdown", onCanvasPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onWindowPointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      updateCameraDistance(newWidth, newHeight);
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 7. Smooth, Majestic Animation Loop with Off-Screen Visibility Culling
    let animationFrameId: number = 0;
    let isVisible = true;
    const startTime = performance.now();

    const animate = () => {
      if (!isVisible) {
        animationFrameId = 0;
        return;
      }

      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Apply drag momentum inertia deceleration
      if (!isDragging) {
        velocityX *= 0.93;
        velocityY *= 0.93;
        sculptureGroup.rotation.y += velocityX;
        sculptureGroup.rotation.x += velocityY;
      }

      if (!prefersReducedMotion && !isDragging) {
        // Continuous, smooth architectural rotation (stable center, NO boing bounce)
        sculptureGroup.rotation.y += 0.003;
        mainSculpture.rotation.x = Math.sin(elapsedTime * 0.3) * 0.06;
        halo.rotation.z += 0.0025;
        halo.rotation.x = Math.PI / 2.5 + Math.sin(elapsedTime * 0.35) * 0.04;

        // Dynamic cybernetic wave pulse through lattice wireframe
        if (modeRef.current === "optics") {
          glassMaterial.emissiveIntensity = 0.55 + Math.sin(elapsedTime * 1.8) * 0.2;
        }

        // Particle orbital drift
        particles.rotation.y = elapsedTime * 0.02;
        particles.rotation.x = Math.sin(elapsedTime * 0.015) * 0.03;
      }

      // Smooth subtle pointer tilt (NO z-axis wobble)
      targetRotX += (mouseY - targetRotX) * 0.05;
      targetRotY += (mouseX - targetRotY) * 0.05;

      if (!isDragging && Math.abs(velocityX) < 0.001) {
        sculptureGroup.rotation.x = targetRotX * 0.08;
      }

      renderer.render(scene, camera);
    };

    // Pause WebGL rendering entirely when scrolled past hero to free GPU resources
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          animationFrameId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    animate();
    setIsLoaded(true);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      intersectionObserver.disconnect();
      canvas.removeEventListener("pointerdown", onCanvasPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onWindowPointerMove);
      resizeObserver.disconnect();
      envTextures.prism.dispose();
      envTextures.obsidian.dispose();
      envTextures.optics.dispose();
      mainGeometry.dispose();
      glassMaterial.dispose();
      haloGeometry.dispose();
      haloMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  const switchMode = (mode: SculptureMode) => {
    setActiveMode(mode);
    if (updateMaterialRef.current) {
      updateMaterialRef.current(mode);
    }
  };

  if (webglSupported === false) {
    return <HeroFallback />;
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div
        ref={containerRef}
        className="relative w-full h-[420px] sm:h-[540px] lg:h-[620px] flex items-center justify-center select-none"
      >
        {/* Dynamic optical backlight */}
        <div
          className="absolute w-[280px] h-[280px] sm:w-[480px] sm:h-[480px] rounded-full blur-[80px] pointer-events-none opacity-80 dark:opacity-45 transition-all duration-1000"
          style={{
            background:
              activeMode === "obsidian"
                ? "radial-gradient(circle at center, rgba(82, 71, 58, 0.4) 0%, rgba(30, 32, 40, 0.3) 50%, transparent 80%)"
                : activeMode === "optics"
                ? "radial-gradient(circle at center, rgba(0, 240, 255, 0.3) 0%, rgba(112, 0, 255, 0.22) 45%, transparent 75%)"
                : "radial-gradient(circle at center, rgba(200, 185, 157, 0.42) 0%, rgba(168, 178, 193, 0.3) 45%, rgba(255, 255, 255, 0.5) 70%, transparent 85%)",
          }}
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

      {/* Optical Material Shader Switcher Capsule */}
      <div className="flex items-center gap-2 p-1.5 rounded-full liquid-glass-pill shadow-xs mt-[-10px] z-20">
        <button
          type="button"
          onClick={() => switchMode("optics")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer min-h-[36px] ${
            activeMode === "optics"
              ? "bg-[var(--text-primary)] text-[var(--canvas)] font-semibold shadow-xs"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          <Eye className="w-3 h-3 text-[var(--accent-azure)]" />
          <span>Wireframe Lattice</span>
        </button>

        <button
          type="button"
          onClick={() => switchMode("prism")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer min-h-[36px] ${
            activeMode === "prism"
              ? "bg-[var(--text-primary)] text-[var(--canvas)] font-semibold shadow-xs"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          <Sparkles className="w-3 h-3 text-[var(--accent-champagne)]" />
          <span>Prism Caustics</span>
        </button>

        <button
          type="button"
          onClick={() => switchMode("obsidian")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer min-h-[36px] ${
            activeMode === "obsidian"
              ? "bg-[var(--text-primary)] text-[var(--canvas)] font-semibold shadow-xs"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          <Shield className="w-3 h-3 text-[var(--accent-silver)]" />
          <span>Obsidian Glass</span>
        </button>
      </div>
    </div>
  );
}
