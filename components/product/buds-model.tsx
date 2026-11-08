"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

type BudsModelProps = { drag: RefObject<{ x: number; y: number }>; reduced: boolean };

function Grille() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  useEffect(() => {
    if (!mesh.current) return;
    const matrix = new THREE.Matrix4();
    let index = 0;
    for (let y = -2; y <= 2; y++) for (let x = -2; x <= 2; x++) {
      if (x * x + y * y > 5) continue;
      matrix.makeTranslation(x * 0.034, y * 0.034, 0);
      mesh.current.setMatrixAt(index++, matrix);
    }
    mesh.current.count = index;
    mesh.current.instanceMatrix.needsUpdate = true;
  }, []);
  return <instancedMesh ref={mesh} args={[undefined, undefined, 25]}><circleGeometry args={[0.009, 8]} /><meshBasicMaterial color="#030405" side={THREE.DoubleSide} /></instancedMesh>;
}

export function BudsModel({ drag, reduced }: BudsModelProps) {
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(() => {
    const shell = new THREE.SphereGeometry(1, 32, 20);
    const positions = shell.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i), y = positions.getY(i), z = positions.getZ(i);
      // An asymmetric acoustic chamber, tapering towards the ear-facing nozzle.
      positions.setXYZ(i, x * (0.31 + y * 0.045) + y * y * 0.065, y * 0.36, z * (0.25 + y * 0.03));
    }
    shell.computeVertexNormals();
    return {
      shell,
      body: new RoundedBoxGeometry(2.65, 0.7, 1.35, 3, 0.29),
      tray: new RoundedBoxGeometry(2.48, 0.13, 1.18, 3, 0.18),
      lid: new RoundedBoxGeometry(2.65, 0.22, 1.35, 3, 0.105),
      liner: new RoundedBoxGeometry(2.38, 0.045, 1.09, 2, 0.022),
      port: new RoundedBoxGeometry(0.29, 0.095, 0.025, 2, 0.012),
    };
  }, []);
  const materials = useMemo(() => ({
    shell: new THREE.MeshPhysicalMaterial({ color: "#202124", metalness: 0.28, roughness: 0.46, clearcoat: 0.18, clearcoatRoughness: 0.4 }),
    case: new THREE.MeshPhysicalMaterial({ color: "#242528", metalness: 0.72, roughness: 0.42, clearcoat: 0.12 }),
    liner: new THREE.MeshStandardMaterial({ color: "#111214", metalness: 0.08, roughness: 0.72 }),
    silicone: new THREE.MeshStandardMaterial({ color: "#303134", roughness: 0.88 }),
    metal: new THREE.MeshStandardMaterial({ color: "#78797b", metalness: 0.95, roughness: 0.28 }),
    contacts: new THREE.MeshStandardMaterial({ color: "#9f8860", metalness: 0.85, roughness: 0.3 }),
  }), []);
  useEffect(() => () => {
    Object.values(geometry).forEach((item) => item.dispose());
    Object.values(materials).forEach((item) => item.dispose());
  }, [geometry, materials]);
  useFrame((_, delta) => {
    if (!group.current) return;
    const damping = reduced ? 30 : 5.2;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, -0.28 + drag.current.y, damping, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, 0.2 + drag.current.x, damping, delta);
  });
  return (
    <group ref={group} rotation={[0.2, -0.28, 0]}>
      <group position={[0, -0.65, 0]}>
        <mesh geometry={geometry.body} material={materials.case} />
        <mesh geometry={geometry.tray} material={materials.liner} position={[0, 0.32, 0]} />
        {[-0.66, 0.66].map((x) => <group key={x} position={[x, 0.39, 0]}>
          <mesh scale={[0.43, 0.055, 0.43]} material={materials.silicone}><sphereGeometry args={[1, 24, 12]} /></mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} material={materials.case}><torusGeometry args={[0.38, 0.018, 8, 36]} /></mesh>
          {[-0.07, 0.07].map((offset) => <mesh key={offset} position={[offset, 0.045, 0.08]} material={materials.contacts}><sphereGeometry args={[0.027, 10, 8]} /></mesh>)}
        </group>)}
        <group position={[0, 0.36, -0.55]} rotation={[-1.95, 0, 0]}>
          <mesh position={[0, 0, 0.55]} geometry={geometry.lid} material={materials.case} />
          <mesh position={[0, -0.123, 0.55]} geometry={geometry.liner} material={materials.liner} />
        </group>
        <mesh position={[0, 0.24, -0.62]} rotation={[0, 0, Math.PI / 2]} material={materials.metal}><cylinderGeometry args={[0.075, 0.075, 0.82, 20]} /></mesh>
        <mesh position={[0, -0.12, -0.676]} geometry={geometry.port} material={materials.metal} />
        <mesh position={[0, -0.12, -0.692]} scale={[0.82, 0.6, 1]} geometry={geometry.port} material={materials.liner} />
        <mesh position={[0, 0.03, 0.672]}><boxGeometry args={[0.24, 0.018, 0.012]} /><meshBasicMaterial color="#bfe8ff" /></mesh>
      </group>
      {[-1, 1].map((side) => <group key={side} position={[side * 0.66, 0.54, 0.16]} rotation={[0.1, side * -0.35, side * -0.2]}>
        <mesh geometry={geometry.shell} material={materials.shell} />
        <mesh position={[0.02, 0.025, 0.223]} scale={[0.21, 0.26, 0.025]} material={materials.case}><sphereGeometry args={[1, 28, 16]} /></mesh>
        <mesh position={[0.02, 0.025, 0.247]} scale={[0.21, 0.26, 1]} material={materials.liner}><ringGeometry args={[0.95, 1, 40]} /></mesh>
        <mesh position={[0.08, -0.06, 0.249]} material={materials.liner}><circleGeometry args={[0.025, 12]} /></mesh>
        <group position={[-side * 0.13, -0.17, -0.16]} rotation={[0.5, side * 0.45, 0]}>
          <mesh material={materials.shell} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.12, 0.13, 0.21, 24]} /></mesh>
          <mesh position={[0, 0, -0.13]} scale={[1, 1, 0.7]} material={materials.silicone}><torusGeometry args={[0.115, 0.06, 12, 28]} /></mesh>
          <mesh position={[0, 0, -0.177]} rotation={[0, Math.PI, 0]} material={materials.metal}><circleGeometry args={[0.11, 28]} /></mesh>
          <group position={[0, 0, -0.179]} rotation={[0, Math.PI, 0]}><Grille /></group>
        </group>
        {[-0.055, 0.055].map((x) => <mesh key={x} position={[x, -0.24, 0.075]} material={materials.contacts}><sphereGeometry args={[0.022, 10, 8]} /></mesh>)}
      </group>)}
    </group>
  );
}
