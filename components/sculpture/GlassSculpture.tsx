"use client";

import * as React from "react";
import * as THREE from "three";
import { HeroFallback } from "@/components/hero/HeroFallback";

function createStudioEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  // High-contrast iridescent studio environment for dramatic caustic refraction
  const baseGrad = ctx.createLinearGradient(0, 0, 1024, 512);
  baseGrad.addColorStop(0, "#F5EFE6");
  baseGrad.addColorStop(0.25, "#E2D7C3");
  baseGrad.addColorStop(0.5, "#CBD7E6");
  baseGrad.addColorStop(0.75, "#FFFFFF");
  baseGrad.addColorStop(1, "#D8C5AE");
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, 1024, 512);

  // High-intensity warm champagne keylight softbox
  const keyLight = ctx.createRadialGradient(320, 160, 10, 320, 160, 220);
  keyLight.addColorStop(0, "rgba(255, 255, 255, 1.0)");
  keyLight.addColorStop(0.3, "rgba(255, 245, 230, 0.95)");
  keyLight.addColorStop(0.7, "rgba(200, 185, 157, 0.4)");
  keyLight.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = keyLight;
  ctx.beginPath();
  ctx.arc(320, 160, 220, 0, Math.PI * 2);
  ctx.fill();

  // Cool silver & azure specular rim source
  const rimLight = ctx.createRadialGradient(760, 340, 10, 760, 340, 240);
  rimLight.addColorStop(0, "rgba(255, 255, 255, 1.0)");
  rimLight.addColorStop(0.4, "rgba(190, 215, 245, 0.8)");
  rimLight.addColorStop(0.8, "rgba(168, 178, 193, 0.3)");
  rimLight.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = rimLight;
  ctx.beginPath();
  ctx.arc(760, 340, 240, 0, Math.PI * 2);
  ctx.fill();

  // Prismatic horizon light streak
  const streak = ctx.createLinearGradient(0, 240, 1024, 272);
  streak.addColorStop(0, "rgba(200, 185, 157, 0)");
  streak.addColorStop(0.3, "rgba(255, 255, 255, 0.9)");
  streak.addColorStop(0.5, "rgba(235, 210, 180, 0.95)");
  streak.addColorStop(0.7, "rgba(180, 205, 235, 0.9)");
  streak.addColorStop(1, "rgba(168, 178, 193, 0)");
  ctx.fillStyle = streak;
  ctx.fillRect(0, 230, 1024, 55);

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
    const width = container.clientWidth || 640;
    const height = container.clientHeight || 640;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

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

    // 2. High-Dynamic Environment Map for Visible Optical Refraction
    const envTexture = createStudioEnvironment(renderer);
    scene.environment = envTexture;

    // 3. Lights for Physical Surface Glints & Highlights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 3.5);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xdceaff, 2.8);
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0xc8b99d, 4.0, 10);
    pointLight.position.set(0, 1.2, 2.5);
    scene.add(pointLight);

    // 4. Sculpture Architecture (Apple Liquid Glass Optical Physics)
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Primary Torus Knot Optical Glass
    const mainGeometry = new THREE.TorusKnotGeometry(1.22, 0.44, 220, 40, 2, 3);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#ffffff"),
      transmission: 0.99,
      opacity: 1.0,
      transparent: true,
      roughness: 0.02, // Mirror-smooth polished glass
      ior: 1.54, // Dense optical flint glass
      thickness: 3.2, // Deep internal refraction caustics
      specularIntensity: 1.5,
      specularColor: new THREE.Color("#ffffff"),
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      attenuationColor: new THREE.Color("#C8B99D"),
      attenuationDistance: 1.6,
      dispersion: 0.14, // Vibrant optical rainbow chromatic dispersion
    });

    const mainSculpture = new THREE.Mesh(mainGeometry, glassMaterial);
    sculptureGroup.add(mainSculpture);

    // Orbiting Prismatic Thin Glass Halo
    const haloGeometry = new THREE.TorusGeometry(1.85, 0.06, 32, 100);
    const haloMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#f4f0ea"),
      transmission: 0.95,
      transparent: true,
      roughness: 0.05,
      ior: 1.50,
      thickness: 0.8,
      clearcoat: 1.0,
      attenuationColor: new THREE.Color("#A8B2C1"),
      attenuationDistance: 2.0,
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    halo.rotation.x = Math.PI / 2.5;
    sculptureGroup.add(halo);

    // Luminous Polished Champagne Nucleus
    const coreGeometry = new THREE.IcosahedronGeometry(0.38, 4);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xe6dcce,
      emissive: 0xc8b99d,
      emissiveIntensity: 0.9,
      roughness: 0.1,
      metalness: 0.9,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    sculptureGroup.add(core);

    // 5. Interactive Pointer & Drag Physics
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
      mouseX = x * 0.45;
      mouseY = y * 0.45;
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
        sculptureGroup.rotation.y += 0.0035;
        mainSculpture.rotation.x = Math.sin(elapsedTime * 0.4) * 0.16;
        halo.rotation.z += 0.002;
        halo.rotation.x = Math.PI / 2.5 + Math.sin(elapsedTime * 0.5) * 0.08;

        sculptureGroup.position.y = Math.sin(elapsedTime * 0.7) * 0.1;

        // Core dynamic pulse
        const coreScale = 1 + Math.sin(elapsedTime * 1.6) * 0.07;
        core.scale.set(coreScale, coreScale, coreScale);
      }

      // Smooth pointer lerping
      targetRotX += (mouseY - targetRotX) * 0.06;
      targetRotY += (mouseX - targetRotY) * 0.06;

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
      haloGeometry.dispose();
      haloMaterial.dispose();
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
      className="relative w-full h-[440px] sm:h-[560px] lg:h-[660px] flex items-center justify-center select-none"
    >
      {/* Radiant ambient optical refraction backdrop */}
      <div
        className="absolute w-[360px] h-[360px] sm:w-[540px] sm:h-[540px] rounded-full blur-[90px] pointer-events-none opacity-85 dark:opacity-45 transition-opacity duration-1000"
        style={{
          background:
            "radial-gradient(circle at center, rgba(200, 185, 157, 0.4) 0%, rgba(168, 178, 193, 0.3) 45%, rgba(255, 255, 255, 0.5) 70%, transparent 85%)",
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
  );
}
