
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars, Html } from "@react-three/drei";
import * as THREE from "three";
import {
  Code2,
  Zap,
  Rocket,
  Cloud,
  Shield,
  Server,
  Layers,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* -------------------------
   Earth / Atmosphere / Stars
   ------------------------- */
function Earth() {
  const globeRef = useRef();
  useFrame(() => {
    if (globeRef.current) globeRef.current.rotation.y += 0.008;
  });
  const texture = new THREE.TextureLoader().load("/world.png");
  return (
    <Sphere ref={globeRef} args={[1.4, 64, 64]}>
      <meshStandardMaterial map={texture} />
    </Sphere>
  );
}

function Atmosphere() {
  return (
    <Sphere args={[1.45, 64, 64]}>
      <meshBasicMaterial
        color="#3a7bd5"
        transparent
        opacity={0.18}
        side={THREE.BackSide}
      />
    </Sphere>
  );
}

function RotatingStars() {
  const starsRef = useRef();
  useFrame(() => {
    if (starsRef.current) starsRef.current.rotation.y -= 0.0005;
  });
  return (
    <Stars
      ref={starsRef}
      radius={100}
      depth={50}
      count={2300}
      factor={4}
      saturation={0}
      fade
    />
  );
}

/* -------------------------
   Fibonacci Sphere Utility
   ------------------------- */
function fibonacciSpherePoints(n, radius = 1.75) {
  const points = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }
  return points;
}

function resolveOverlaps(points, minAngle = (18 * Math.PI) / 180) {
  const pts = points.map((p) => p.clone().normalize());
  for (let iter = 0; iter < 400; iter++) {
    for (let i = 0; i < pts.length; i++) {
      for (let j = 0; j < i; j++) {
        const a = pts[i];
        const b = pts[j];
        let angle = a.angleTo(b);
        if (angle < minAngle) {
          const axis = new THREE.Vector3().crossVectors(a, b).normalize();
          const delta = (minAngle - angle) * 0.6 + 0.001;
          a.applyAxisAngle(axis, delta).normalize();
          b.applyAxisAngle(axis, -delta).normalize();
        }
      }
    }
  }
  return pts.map((u) => u.multiplyScalar(1.85));
}

/* -------------------------
   Connector + Icons
   ------------------------- */
function Connector({ start, end }) {
  const diff = new THREE.Vector3().subVectors(end, start);
  const len = diff.length();
  const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    diff.clone().normalize()
  );
  return (
    <mesh position={[mid.x, mid.y, mid.z]} quaternion={quaternion}>
      <cylinderGeometry args={[0.0025, 0.0025, len, 6]} />
      <meshStandardMaterial color="#cbd5e1" />
    </mesh>
  );
}

function SkillIcon({ position, IconComponent }) {
  const surfacePoint = position.clone().normalize().multiplyScalar(1.4);

  return (
    <group position={position}>
      <Connector start={surfacePoint} end={position.clone().multiplyScalar(0.98)} />

      <mesh position={[surfacePoint.x, surfacePoint.y, surfacePoint.z]}>
        <sphereGeometry args={[0.017, 8, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.04}
        />
      </mesh>

      <Html transform={false} occlude={false} center>
        <div className="bg-white/10 backdrop-blur-md border border-white/10 shadow-lg rounded-md p-2 pointer-events-none">
          <IconComponent className="w-5 h-5 text-white" />
        </div>
      </Html>
    </group>
  );
}

/* -------------------------
   GlobeCanvas
   ------------------------- */
function GlobeCanvas() {
  const skills = [
    { icon: Server },
    { icon: Layers },
    { icon: Cloud },
    { icon: Zap },
    { icon: Code2 },
    { icon: Shield },
    { icon: Rocket },
  ];

  const base = useMemo(() => fibonacciSpherePoints(skills.length), []);
  const positions = useMemo(() => resolveOverlaps(base), [base]);

  return (
    <Canvas camera={{ position: [0, 0, 4] }} style={{ width: "100%", height: "100%" }}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[10, 1, 1]} intensity={0.15} />

      <Earth />
      <Atmosphere />
      <RotatingStars />

      {skills.map((s, i) => (
        <SkillIcon key={i} position={positions[i]} IconComponent={s.icon} />
      ))}

      <OrbitControls enablePan={false} enableZoom={false} />
    </Canvas>
  );
}

/* -------------------------
   Main Component (Responsive)
   ------------------------- */
export default function GlobeWithContent() {
  const navigate = useNavigate();
  const stats = [
    { number: "500+", label: "Successful Interns", color: "text-green-500" },
    { number: "100+", label: "Students Placed", color: "text-blue-500" },
    { number: "50+", label: "Partner Companies", color: "text-orange-500" },
  ];

  return (
    <div
      className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center gap-10 px-6 lg:px-20 font-sans text-white py-10"
      style={{
        background: "radial-gradient(circle at 50% 50%, #04211f 20%, #0a0f1a 80%)",
      }}
    >
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
      >
        <div className="inline-flex items-center gap-3 mt-4">
          <span className="w-4 h-4 bg-green-600 rounded-full"></span>
          <span className="w-4 h-4 bg-blue-600 rounded-full"></span>
          <span className="w-4 h-4 bg-orange-600 rounded-full"></span>
          <span className="text-xs text-gray-200">Trusted by 1,000+ students</span>
        </div>

        <h1 className="mt-6 text-3xl lg:text-5xl font-bold">
          Empowering You Through
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 text-5xl lg:text-7xl font-serif mt-2">
            Internships & Learning
          </span>
        </h1>

        <p className="text-gray-200 max-w-lg mt-6 leading-relaxed">
          Get real-world experience through curated internships, build in-demand skills,
          and connect with top companies. Start your professional journey today.
        </p>

        <button
          onClick={() => navigate("/internships")}
          className="bg-gradient-to-r from-sky-500 to-blue-600 hover:scale-105 transition-all duration-300 px-3 py-2 rounded-lg mt-8 text-md font-semibold"
        >
          Find Internships →
        </button>

        <div className="grid grid-cols-3 gap-6 pt-8 max-w-md">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.number}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right Globe */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        className="w-full lg:w-1/2 h-[55vh] lg:h-[80vh] flex items-center justify-center"
      >
        <GlobeCanvas />
      </motion.div>
    </div>
  );
}