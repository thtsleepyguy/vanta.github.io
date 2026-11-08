"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { BudsModel } from "./buds-model";
import { oklchToHex } from "@/lib/color";
import type { Finish } from "@/lib/products";

type ViewID = "front" | "back" | "edge" | string;

type PhoneCanvasProps = {
  active?: boolean;
  mode: "hero" | "story" | "config";
  product?: "one" | "buds";
  finish: Finish;
  view?: ViewID;
  interactive?: boolean;
  progress?: { current: number };
  reduced?: boolean;
};

/* ------------------------------------------------------------------ */
/* Geometry helpers                                                     */
/* ------------------------------------------------------------------ */

function roundedRect(width: number, height: number, radius: number, shape?: THREE.Shape) {
  const x = -width / 2;
  const y = -height / 2;
  const r = Math.min(radius, width / 2, height / 2);
  const target = shape ?? new THREE.Shape();

  target.moveTo(x + r, y);
  target.lineTo(x + width - r, y);
  target.quadraticCurveTo(x + width, y, x + width, y + r);
  target.lineTo(x + width, y + height - r);
  target.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  target.lineTo(x + r, y + height);
  target.quadraticCurveTo(x, y + height, x, y + height - r);
  target.lineTo(x, y + r);
  target.quadraticCurveTo(x, y, x + r, y);
  return target;
}

function useSlab(width: number, height: number, depth: number, radius: number) {
  return useMemo(() => {
    const shape = roundedRect(width, height, radius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.004,
      bevelSegments: 3,
      curveSegments: 28,
    });
    geometry.center();
    return geometry;
  }, [width, height, depth, radius]);
}

function useRail(width: number, height: number, depth: number, radius: number, wall: number) {
  return useMemo(() => {
    const shape = roundedRect(width, height, radius);
    const hole = roundedRect(width - wall * 2, height - wall * 2, radius - wall, new THREE.Shape());
    shape.holes.push(hole);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.004,
      bevelSegments: 3,
      curveSegments: 32,
    });
    geometry.center();
    return geometry;
  }, [width, height, depth, radius, wall]);
}

/* ------------------------------------------------------------------ */
/* Textures drawn at runtime                                             */
/* ------------------------------------------------------------------ */

function useScreenTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 520;
    canvas.height = 1100;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const radius = 62;
    ctx.beginPath();
    ctx.roundRect(0, 0, canvas.width, canvas.height, radius);
    ctx.clip();

    const base = ctx.createLinearGradient(0, 0, 0, canvas.height);
    base.addColorStop(0, "#07080b");
    base.addColorStop(0.55, "#0b0d12");
    base.addColorStop(1, "#050608");
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Architectural light slats: a quiet interior, not a wallpaper.
    for (let i = 0; i < 18; i += 1) {
      const x = 54 + i * 24;
      const alpha = 0.015 + Math.pow(Math.sin((i / 17) * Math.PI), 2) * 0.06;
      const slat = ctx.createLinearGradient(0, 150, 0, 860);
      slat.addColorStop(0, `rgba(168, 220, 240, 0)`);
      slat.addColorStop(0.35, `rgba(168, 220, 240, ${alpha})`);
      slat.addColorStop(1, `rgba(168, 220, 240, 0)`);
      ctx.fillStyle = slat;
      ctx.fillRect(x, 140, 5, 760);
    }

    const pane = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    pane.addColorStop(0, "rgba(255,255,255,0.045)");
    pane.addColorStop(0.48, "rgba(255,255,255,0)");
    pane.addColorStop(1, "rgba(143,216,242,0.035)");
    ctx.fillStyle = pane;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#f4f1eb";
    ctx.font = "300 86px 'Helvetica Neue', Helvetica, Arial, sans-serif";
    ctx.fillText("07:24", 46, 152);
    ctx.fillStyle = "rgba(244,241,235,0.56)";
    ctx.font = "500 20px 'Helvetica Neue', Helvetica, Arial, sans-serif";
    ctx.fillText("MON 07 NOV", 48, 190);

    ctx.strokeStyle = "rgba(244,241,235,0.16)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(48, 232);
    ctx.lineTo(190, 232);
    ctx.stroke();

    ctx.fillStyle = "rgba(244,241,235,0.8)";
    ctx.font = "500 18px 'Helvetica Neue', Helvetica, Arial, sans-serif";
    ctx.fillText("VANTA OS", 48, 980);
    ctx.fillStyle = "rgba(244,241,235,0.38)";
    ctx.fillText("Focus is on", 48, 1008);

    ctx.fillStyle = "rgba(244,241,235,0.7)";
    ctx.beginPath();
    ctx.roundRect(canvas.width / 2 - 56, 1054, 112, 4, 2);
    ctx.fill();

    ctx.fillStyle = "#050608";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 34, 9, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    return texture;
  }, []);
}

function usePcbTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 700;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#101b18";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(184, 132, 74, 0.7)";
    ctx.lineWidth = 1.5;
    let seed = 7;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };

    for (let i = 0; i < 26; i += 1) {
      const x = random() * canvas.width;
      const y = random() * canvas.height;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + (random() - 0.5) * 140, y);
      ctx.lineTo(x + (random() - 0.5) * 140, y + (random() - 0.5) * 140);
      ctx.stroke();
    }

    for (let i = 0; i < 42; i += 1) {
      ctx.fillStyle = "rgba(196, 150, 92, 0.55)";
      ctx.beginPath();
      ctx.arc(random() * canvas.width, random() * canvas.height, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "#202a27";
    ctx.fillRect(78, 56, 150, 120);
    ctx.fillStyle = "#2d3733";
    ctx.fillRect(266, 220, 160, 96);
    ctx.fillStyle = "#1b2421";
    ctx.fillRect(96, 420, 120, 150);

    ctx.fillStyle = "rgba(220, 232, 225, 0.65)";
    ctx.font = "500 17px 'Helvetica Neue', Helvetica, Arial, sans-serif";
    ctx.fillText("VANTA ONE", 78, 604);
    ctx.fillStyle = "rgba(220, 232, 225, 0.32)";
    ctx.font = "400 13px 'Helvetica Neue', Helvetica, Arial, sans-serif";
    ctx.fillText("CONCEPT BOARD / REV 01", 78, 628);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

function useWordmarkTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 160;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(238, 244, 246, 0.8)";
    ctx.font = "500 56px 'Helvetica Neue', Helvetica, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.letterSpacing = "16px";
    ctx.fillText("VANTA", canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return texture;
  }, []);
}

function makeEnvironment() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  const base = ctx.createLinearGradient(0, 0, 0, canvas.height);
  base.addColorStop(0, "#0a0b0e");
  base.addColorStop(0.48, "#15181d");
  base.addColorStop(1, "#050608");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.filter = "blur(26px)";
  ctx.fillStyle = "rgba(248, 250, 252, 0.95)";
  ctx.fillRect(90, 40, 520, 92);
  ctx.fillStyle = "rgba(240, 246, 250, 0.7)";
  ctx.fillRect(690, 130, 170, 210);
  ctx.fillStyle = "rgba(150, 214, 240, 0.5)";
  ctx.fillRect(40, 300, 300, 70);
  ctx.fillStyle = "rgba(255, 246, 230, 0.35)";
  ctx.fillRect(860, 300, 90, 120);

  // Sharper highlight strips for titanium edge catch
  ctx.filter = "blur(4px)";
  ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
  ctx.fillRect(120, 50, 460, 8);
  ctx.fillStyle = "rgba(255, 250, 240, 0.35)";
  ctx.fillRect(700, 140, 8, 180);
  ctx.fillStyle = "rgba(168, 220, 240, 0.55)";
  ctx.fillRect(60, 310, 240, 6);
  ctx.filter = "none";

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/* ------------------------------------------------------------------ */
/* Scene                                                                 */
/* ------------------------------------------------------------------ */

function Phone({
  mode,
  finish,
  view = "front",
  interactive = false,
  progress,
  reduced = false,
  drag,
}: PhoneCanvasProps & { drag: RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const manualGroup = useRef<THREE.Group>(null);
  const get = useThree((state) => state.get);
  const screen = useScreenTexture();
  const pcb = usePcbTexture();
  const wordmark = useWordmarkTexture();

  const bodyGeo = useRail(1.56, 3.18, 0.16, 0.24, 0.055);
  const backGeo = useSlab(1.5, 3.12, 0.012, 0.225);
  const screenBaseGeo = useSlab(1.47, 3.09, 0.008, 0.23);
  const islandGeo = useSlab(0.62, 1.3, 0.05, 0.27);
  const batteryGeo = useSlab(1.14, 1.34, 0.02, 0.08);
  const chipGeo = useSlab(0.24, 0.2, 0.03, 0.02);

  const frameColor = oklchToHex(finish.oklch);
  const backColor = oklchToHex(finish.oklch);
  const copper = oklchToHex([0.62, 0.12, 55]);
  const ice = oklchToHex([0.82, 0.118, 226]);

  useEffect(() => {
    const { scene } = get();
    const environment = makeEnvironment();
    scene.environment = environment;
    scene.environmentIntensity = 0.95;
    return () => {
      scene.environment = null;
      environment.dispose();
    };
  }, [get]);

  // Cinematic entrance animation for hero mode
  useEffect(() => {
    if (mode !== "hero" || reduced) return;
    if (!group.current) return;

    const { scene } = get();

    // Set initial state for entrance
    group.current.rotation.y = -1.1 + Math.PI * 0.6; // Start rotated away
    group.current.rotation.x = 0.03 + 0.4; // Tilted down
    group.current.position.z = 1.5; // Pushed back
    group.current.scale.setScalar(0.85); // Slightly smaller

    const tl = gsap.timeline({
      defaults: { ease: "expo.out", duration: 1.8 },
    });

    tl.to(group.current.rotation, {
      y: -1.1,
      duration: 2.2,
      ease: "power3.out",
    })
      .to(
        group.current.rotation,
        { x: 0.03, duration: 1.8, ease: "expo.out" },
        0,
      )
      .to(
        group.current.position,
        { z: 0, duration: 2, ease: "expo.out" },
        0,
      )
      .to(
        group.current.scale,
        { x: 1, y: 1, z: 1, duration: 1.6, ease: "expo.out" },
        0.2,
      );

    const lighting: gsap.core.Tween[] = [];

    // Animate lights for dramatic entrance
    const keyLight = scene.children.find(
      (c) => c instanceof THREE.DirectionalLight && c.position.x > 0,
    );
    const rimLight = scene.children.find(
      (c) => c instanceof THREE.DirectionalLight && c.position.x < -2,
    );
    const fillLight = scene.children.find(
      (c) => c instanceof THREE.DirectionalLight && c.position.x < 0 && c.position.x > -2,
    );

    if (keyLight) {
      lighting.push(gsap.fromTo(
        keyLight,
        { intensity: 0 },
        { intensity: 2.6, duration: 1.5, ease: "power2.out", delay: 0.3 },
      ));
    }
    if (rimLight) {
      lighting.push(gsap.fromTo(
        rimLight,
        { intensity: 0 },
        { intensity: 2.2, duration: 1.5, ease: "power2.out", delay: 0.4 },
      ));
    }
    if (fillLight) {
      lighting.push(gsap.fromTo(
        fillLight,
        { intensity: 0 },
        { intensity: 0.75, duration: 1.5, ease: "power2.out", delay: 0.5 },
      ));
    }

    // Animate point light (accent)
    const accentLight = scene.children.find(
      (c) => c instanceof THREE.PointLight,
    );
    if (accentLight) {
      lighting.push(gsap.fromTo(
        accentLight,
        { intensity: 0 },
        { intensity: 1.1, duration: 1.2, ease: "power2.out", delay: 0.8 },
      ));
    }

    return () => {
      tl.progress(1).kill();
      for (const tween of lighting) tween.progress(1).kill();
    };
  }, [mode, reduced, group, get]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;

    let targetX = 0.035;
    let targetY = 0;

    if (mode === "hero") {
      targetY = reduced ? -0.34 : -0.34 + Math.sin(time * 0.22) * 0.055;
      targetX = reduced ? 0.02 : 0.03 + Math.sin(time * 0.16) * 0.012;
    } else if (mode === "story") {
      const p = progress?.current ?? 0;
      const ease = (x: number) => x * x * (3 - 2 * x);
      if (p < 0.34) {
        targetY = -0.28 + ease(p / 0.34) * (Math.PI * 0.92 + 0.28);
      } else if (p < 0.62) {
        targetY = Math.PI * 0.92 + ease((p - 0.34) / 0.28) * (Math.PI * 0.16);
      } else {
        targetY = Math.PI * 1.08 + ease((p - 0.62) / 0.38) * (Math.PI * 1.02);
      }
      targetX = 0.03 + Math.sin(p * Math.PI * 2) * 0.05;

      const focus = Math.sin(
        THREE.MathUtils.clamp((p - 0.17) / 0.25, 0, 1) * Math.PI,
      );
      group.current.position.x = THREE.MathUtils.damp(
        group.current.position.x,
        0.38 * focus,
        5,
        delta,
      );
      group.current.position.y = THREE.MathUtils.damp(
        group.current.position.y,
        -0.42 * focus,
        5,
        delta,
      );
    } else {
      const base =
        view === "back"
          ? Math.PI
          : view === "edge"
            ? Math.PI * 0.5
            : view === "detail"
              ? -0.55
              : 0;
      targetY = base;
      targetX = 0.04;
    }

    const lambda = reduced ? 30 : 5.2;
    // Manual rotation has its own owner; entrance and idle motion stay on the child.
    if (manualGroup.current && interactive) {
      manualGroup.current.rotation.y = THREE.MathUtils.damp(manualGroup.current.rotation.y, drag.current.y, lambda, delta);
      manualGroup.current.rotation.x = THREE.MathUtils.damp(manualGroup.current.rotation.x, drag.current.x, lambda, delta);
    }
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, lambda, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, lambda, delta);
  });

  return (
    <group ref={manualGroup}>
    <group ref={group} rotation={[0.03, -1.1, 0]}>
      {/* titanium rail */}
      <mesh geometry={bodyGeo} castShadow>
        <meshPhysicalMaterial
          color={frameColor}
          metalness={0.96}
          roughness={0.2}
          clearcoat={0.7}
          clearcoatRoughness={0.12}
          envMapIntensity={1.5}
        />
      </mesh>
      {/* subtle edge highlight on frame bevels */}
      <mesh geometry={bodyGeo} position={[0, 0, 0.001]} castShadow>
        <meshPhysicalMaterial
          color={frameColor}
          metalness={0.96}
          roughness={0.18}
          clearcoat={0.8}
          clearcoatRoughness={0.08}
          envMapIntensity={1.8}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* screen gasket + display */}
      <mesh geometry={screenBaseGeo} position={[0, 0, 0.074]}>
        <meshStandardMaterial color="#050608" roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.0815]}>
        <planeGeometry args={[1.44, 3.06]} />
        <meshPhysicalMaterial
          map={screen}
          transparent
          roughness={0.12}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.03}
          envMapIntensity={1.15}
          emissiveMap={screen}
          emissive="#0d1a20"
          emissiveIntensity={0.28}
          toneMapped={false}
          alphaTest={0.05}
        />
      </mesh>
      {/* subtle front glass reflection catcher - barely visible highlight at grazing angles */}
      <mesh position={[0, 0, 0.083]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.46, 3.08]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0}
          clearcoat={1}
          clearcoatRoughness={0.02}
          envMapIntensity={2.2}
          depthWrite={false}
        />
      </mesh>

      {/* translucent back */}
      <mesh geometry={backGeo} position={[0, 0, -0.083]}>
        <meshPhysicalMaterial
          color={backColor}
          metalness={0.05}
          roughness={0.3}
          clearcoat={1}
          clearcoatRoughness={0.18}
          transparent
          opacity={finish.id === "haze" ? 0.46 : 0.66}
          envMapIntensity={1.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* internal architecture, read through the back */}
      <group position={[0, 0, -0.01]}>
        <mesh position={[0, 0.33, -0.048]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.08, 1.54]} />
          <meshStandardMaterial map={pcb} roughness={0.72} metalness={0.18} side={THREE.DoubleSide} />
        </mesh>

        <mesh geometry={chipGeo} position={[-0.18, 0.55, -0.032]} rotation={[0, 0, 0.04]}>
          <meshStandardMaterial color="#141b19" roughness={0.55} metalness={0.35} />
        </mesh>
        <mesh geometry={chipGeo} position={[0.2, 0.22, -0.032]} rotation={[0, 0, -0.06]}>
          <meshStandardMaterial color="#1b2421" roughness={0.55} metalness={0.3} />
        </mesh>
        <mesh position={[0.06, 0.72, -0.033]}>
          <boxGeometry args={[0.34, 0.045, 0.014]} />
          <meshStandardMaterial color={copper} roughness={0.4} metalness={0.7} />
        </mesh>

        <mesh geometry={batteryGeo} position={[0, -0.78, -0.026]}>
          <meshStandardMaterial color="#b8b2a6" roughness={0.52} metalness={0.32} />
        </mesh>
        <mesh position={[0, -0.55, -0.038]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[0.82, 0.2]} />
          <meshBasicMaterial color="#6a655b" transparent opacity={0.75} />
        </mesh>

        {[0.19, 0.25, 0.31].map((radius) => (
          <mesh key={radius} position={[0, -0.86, -0.046]}>
            <torusGeometry args={[radius, 0.008, 8, 64]} />
            <meshStandardMaterial color={copper} roughness={0.3} metalness={0.9} />
          </mesh>
        ))}

        {[
          [-0.52, 1.3],
          [0.52, 1.3],
          [-0.52, -1.3],
          [0.52, -1.3],
        ].map(([x, y]) => (
          <mesh key={`${x}-${y}`} position={[x, y, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.022, 0.022, 0.012, 16]} />
            <meshStandardMaterial color="#8f8a80" metalness={0.9} roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* camera column */}
      <group position={[-0.35, 0.83, -0.1]}>
        <mesh geometry={islandGeo} position={[0, 0, 0]}>
          <meshPhysicalMaterial
            color={frameColor}
            metalness={0.94}
            roughness={0.26}
            clearcoat={0.4}
            envMapIntensity={1.2}
          />
        </mesh>

        {[0.3, -0.16].map((y, index) => (
          <group key={y} position={[0, y, 0]}>
            <mesh position={[0, 0, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.205, 0.205, 0.034, 48]} />
              <meshStandardMaterial color={frameColor} metalness={0.95} roughness={0.22} />
            </mesh>
            <mesh position={[0, 0, -0.046]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.168, 0.168, 0.018, 48]} />
              <meshPhysicalMaterial
                color="#06080b"
                metalness={0.4}
                roughness={0.06}
                clearcoat={1}
                clearcoatRoughness={0.02}
              />
            </mesh>
            <mesh position={[0, 0, -0.057]}>
              <torusGeometry args={[0.152, 0.005, 8, 64]} />
              <meshStandardMaterial
                color={index === 0 ? ice : frameColor}
                metalness={0.7}
                roughness={0.25}
                emissive={index === 0 ? ice : "#000000"}
                emissiveIntensity={index === 0 ? 0.25 : 0}
                side={THREE.DoubleSide}
              />
            </mesh>
            <mesh position={[-0.055, 0.05, -0.062]}>
              <sphereGeometry args={[0.014, 16, 16]} />
              <meshBasicMaterial color="#dff3fb" />
            </mesh>
          </group>
        ))}

        <group position={[0, 0.47, -0.062]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.02, 24]} />
            <meshStandardMaterial color="#d9d4c8" metalness={0.5} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.014, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.014, 20]} />
            <meshBasicMaterial color="#fff4dc" />
          </mesh>
        </group>
      </group>

      {/* embedded wordmark */}
      <mesh position={[0, -1.22, -0.078]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.8, 0.2]} />
        <meshBasicMaterial map={wordmark} transparent depthWrite={false} />
      </mesh>

      {/* buttons and port */}
      <mesh position={[0.786, 0.56, 0.01]}>
        <boxGeometry args={[0.018, 0.34, 0.03]} />
        <meshStandardMaterial color={frameColor} metalness={0.95} roughness={0.28} />
      </mesh>
      <mesh position={[0.786, 1.02, 0.01]}>
        <boxGeometry args={[0.018, 0.2, 0.03]} />
        <meshStandardMaterial color={frameColor} metalness={0.95} roughness={0.28} />
      </mesh>
      <mesh position={[0, -1.596, 0]}>
        <boxGeometry args={[0.24, 0.008, 0.045]} />
        <meshStandardMaterial color="#08090b" roughness={0.5} metalness={0.4} />
      </mesh>
    </group>
    </group>
  );
}

function Rig({
  product,
  mode,
  reduced,
  progress,
}: {
  product: "one" | "buds";
  mode: PhoneCanvasProps["mode"];
  reduced: boolean;
  progress?: { current: number };
}) {
  const get = useThree((state) => state.get);

  const size = useThree((state) => state.size);
  const aspect = Math.max(size.width / Math.max(size.height, 1), 0.1);
  const fitZ = mode === "story" ? 0 : (product === "buds" ? 1.75 : 1.1) / (Math.tan(Math.PI / 12) * aspect);

  useFrame(({ camera }, delta) => {
    const p = progress?.current ?? 0;
    const focus =
      mode === "story"
        ? Math.sin(THREE.MathUtils.clamp((p - 0.17) / 0.25, 0, 1) * Math.PI)
        : 0;
    const targetZ = Math.max((mode === "story" ? 7.2 : 7.75) - focus * 1.75, fitZ);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 4, delta);
    camera.lookAt(0, 0, 0);
  });

  useEffect(() => {
    const { camera } = get();
    camera.position.set(0, 0, Math.max(mode === "story" ? 7.2 : 7.75, fitZ));
    camera.lookAt(0, 0, 0);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 30;
      camera.updateProjectionMatrix();
    }
  }, [get, mode, reduced, fitZ]);

  return null;
}

export function PhoneCanvas({
  active = true,
  mode,
  product = "one",
  finish,
  view,
  interactive,
  progress,
  reduced = false,
}: PhoneCanvasProps) {
  const phoneDrag = useRef({ x: 0, y: 0 });
  const budsDrag = useRef({ x: 0, y: 0 });
  const drag = product === "buds" ? budsDrag : phoneDrag;
  const dragging = useRef<number | null>(null);
  const last = useRef({ x: 0, y: 0 });
  const start = useRef({ x: 0, y: 0 });
  const touchPending = useRef(false);
  const [draggingState, setDraggingState] = useState(false);

  useEffect(() => {
    if (!interactive) return;
    const onMove = (event: PointerEvent) => {
      if (dragging.current !== event.pointerId) return;
      if (touchPending.current) {
        const horizontal = Math.abs(event.clientX - start.current.x);
        const vertical = Math.abs(event.clientY - start.current.y);
        if (Math.max(horizontal, vertical) < 8) return;
        if (vertical >= horizontal) {
          dragging.current = null;
          const target = event.target;
          if (target instanceof Element && target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
          return;
        }
        touchPending.current = false;
        setDraggingState(true);
      }
      const dx = event.clientX - last.current.x;
      const dy = event.clientY - last.current.y;
      drag.current.x = THREE.MathUtils.clamp(drag.current.x + dy * 0.004, -0.5, 0.5);
      drag.current.y += dx * 0.007;
      last.current = { x: event.clientX, y: event.clientY };
    };
    const onUp = (event: PointerEvent) => {
      if (dragging.current !== event.pointerId) return;
      dragging.current = null;
      setDraggingState(false);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [interactive, drag]);

  return (
    <div
      className="h-full w-full"
      style={{ cursor: interactive ? (draggingState ? "grabbing" : "grab") : "default", touchAction: "pan-y pinch-zoom" }}
      onPointerDown={(event) => {
        if (!interactive || !event.isPrimary || event.button !== 0) return;
        dragging.current = event.pointerId;
        event.currentTarget.setPointerCapture(event.pointerId);
        touchPending.current = event.pointerType === "touch";
        setDraggingState(!touchPending.current);
        start.current = { x: event.clientX, y: event.clientY };
        last.current = { x: event.clientX, y: event.clientY };
      }}
      onLostPointerCapture={() => {
        dragging.current = null;
        setDraggingState(false);
      }}
    >
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.7]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 7.75], fov: 30, near: 0.1, far: 40 }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.08;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
        style={{ touchAction: "pan-y pinch-zoom" }}
        aria-label={product === "buds" ? "VANTA BUDS product render, matte black finish" : `VANTA ONE product render, ${finish.name} finish`}
      >
        <ambientLight intensity={0.42} />
        <directionalLight position={[4.5, 5.5, 6]} intensity={2.6} color="#fff8ef" />
        <directionalLight position={[-5, 2, 3]} intensity={0.85} color="#d7e9f4" />
        <directionalLight position={[-3, 4, -6]} intensity={2.4} color="#bfe8ff" />
        <directionalLight position={[0.5, -1, 0]} intensity={0.35} color="#fff8ef" />
        <pointLight position={[0, -3.4, 2.4]} intensity={1.1} color="#8fd8f2" />
        <group visible={product === "one"}>
        <Phone
          mode={mode}
          finish={finish}
          view={view}
          interactive={interactive}
          progress={progress}
          reduced={reduced}
          drag={phoneDrag}
        />
        </group>
        {product === "buds" && <BudsModel drag={budsDrag} reduced={reduced} />}
        <Rig product={product} mode={mode} reduced={reduced} progress={progress} />
      </Canvas>
    </div>
  );
}
