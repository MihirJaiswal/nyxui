'use client'
import { useMemo, useRef, Suspense, useState, useEffect, useCallback } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing"
import { Environment } from "@react-three/drei"
import * as THREE from "three"

/* ----------------------------------------------------------------– */
/* --------------------------  SHADERS  ---------------------------- */
/* ----------------------------------------------------------------– */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uComplexity;
  uniform float uSpeed;
  uniform vec2  uPointer;
  uniform float uInfluence;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;

  /* Simplex noise helpers ........................................ */
  vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
  vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
  vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}

  float snoise(vec3 v){
    const vec2  C = vec2(1./6., 1./3.);
    const vec4  D = vec4(0.,.5,1.,2.);

    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1. - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute( permute( permute(
              i.z + vec4(0., i1.z, i2.z, 1.))
            + i.y + vec4(0., i1.y, i2.y, 1.))
            + i.x + vec4(0., i1.x, i2.x, 1.));

    float n_ = 1./7.;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49. * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7. * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1. - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.+1.;
    vec4 s1 = floor(b1)*2.+1.;
    vec4 sh = -step(h, vec4(0.));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(
      dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3*=norm.w;

    vec4 m = max(0.6 - vec4(
      dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.);
    m = m*m;
    return 42. * dot(m*m, vec4(
      dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main(){
    vNormal = normal;
    vPosition = position;
    vec3 pos = position;

    float n1 = snoise(pos*2.+uTime*uSpeed);
    float n2 = snoise(pos*4.+uTime*uSpeed*1.5);
    float n3 = snoise(pos*8.+uTime*uSpeed*0.8);
    float n4 = snoise(pos*16.+uTime*uSpeed*0.3);
    float disp = (n1*.4 + n2*.3 + n3*.2 + n4*.1)*uComplexity;

    vec3 world = (modelMatrix*vec4(pos,1.)).xyz;
    float d = distance(world.xy, vec2(uPointer.x*8., uPointer.y*8.));
    float influence = exp(-d*0.5)*uInfluence;

    pos += normal * (disp + influence);
    vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.);
  }
`

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3  uA;
  uniform vec3  uB;
  uniform vec3  uC;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;

  void main(){
    float dist = length(vPosition);
    float alpha = 1.0 - smoothstep(1.8, 2.2, dist);
    
    if(alpha < 0.01) discard;
    
    float grad = vNormal.y*0.5 + 0.5;
    
    float mix1 = sin(uTime*0.6+vPosition.x*3.+vPosition.z*2.)*0.4+0.6;
    float mix2 = cos(uTime*0.4+vPosition.y*2.5+vPosition.z*3.)*0.4+0.6;
    float mix3 = sin(uTime*0.3+vPosition.x*1.5+vPosition.y*2.)*0.3+0.7;
    
    grad = smoothstep(0.1, 0.9, grad);
    mix1 = smoothstep(0.2, 1.0, mix1);
    mix2 = smoothstep(0.2, 1.0, mix2);
    mix3 = smoothstep(0.4, 1.0, mix3);
    
    vec3 col = mix(uA, uB, grad);
    col = mix(col, uC, mix1 * mix2 * 0.6);
    
    vec3 accent = mix(uB, uC, mix3);
    col = mix(col, accent, 0.35);
    
    float rim = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
    rim = pow(rim, 1.5);
    
    col = mix(col, col * col, 0.6);
    col = pow(col, vec3(0.7));
    
    vec3 rimColor = mix(uB, uC, 0.5);
    col += rimColor * rim * 0.6;
    
    col *= 1.3;
    col = min(col, vec3(1.4));
    
    gl_FragColor = vec4(col, alpha * 0.95);
  }
`

// Precompiled shader material
const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  transparent: true,
  alphaTest: 0.01,
  side: THREE.DoubleSide,
})

/* ----------------------------------------------------------------– */
/* ----------------------  BLOB   MESH  ----------------------------- */
/* ----------------------------------------------------------------– */
function Blob({
  theme,
  complexity,
  speed,
}: {
  theme: "primary" | "aurora" | "cosmic" | "liquid" | "danger"
  complexity: number
  speed: number
}) {
  const { pointer, clock } = useThree()
  const mesh = useRef<THREE.Mesh>(null!)

  const themes = {
    primary: { a: "#0A0F8A", b: "#1E40FF", c: "#00D4FF" },
    aurora: { a: "#4A00FF", b: "#FF006B", c: "#00FFFF" },
    cosmic: { a: "#B766EA", b: "#70209B", c: "#F093FB" },
    liquid: { a: "#805AFC", b: "#04E9AD", c: "#FC8EED" },
    danger: { a: "#FF0000", b: "#FF4000", c: "#FFAA00" },
  } as const

  const { a, b, c } = themes[theme] ?? themes.aurora

  // Cached geometry - only create once
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(2, 6), []) // Keep original quality

  // Stable uniforms reference
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uComplexity: { value: complexity * 0.15 },
      uSpeed: { value: speed * 0.25 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uInfluence: { value: 0.6 },
      uA: { value: new THREE.Color(a) },
      uB: { value: new THREE.Color(b) },
      uC: { value: new THREE.Color(c) },
    }),
    [a, b, c, complexity, speed],
  )

  // Cloned material with uniforms
  const material = useMemo(() => {
    const mat = shaderMaterial.clone()
    mat.uniforms = uniforms
    return mat
  }, [uniforms])

  useFrame(() => {
    uniforms.uTime.value = clock.elapsedTime
    uniforms.uPointer.value.copy(pointer)
  })

  return (
    <mesh ref={mesh} geometry={geometry} material={material} />
  )
}

/* ----------------------------------------------------------------– */
/* ----------------------  PARTICLES  ------------------------------- */
/* ----------------------------------------------------------------– */
function Particles({ count = 150, color = "#00FFFF" }) { // Restored original count
  const points = useRef<THREE.Points>(null!)

  // Cached geometry and attributes
  const { geometry, material } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const scl = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      scl[i] = Math.random() * 0.8 + 0.2
    }

    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geom.setAttribute('scale', new THREE.BufferAttribute(scl, 1))

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 35 },
        uColor: { value: new THREE.Color(color) },
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uSize;
        attribute float scale;
        void main(){
          vec3 pos = position;
          pos.x += sin(uTime * 0.4 + pos.y * 0.3) * 0.3;
          pos.y += cos(uTime * 0.3 + pos.x * 0.3) * 0.3;
          pos.z += sin(uTime * 0.2 + pos.x * 0.2) * 0.2;
          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPos;
          gl_PointSize = uSize * scale * (1.0 / -mvPos.z);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        void main(){
          float d = distance(gl_PointCoord, vec2(0.5));
          if(d > 0.5) discard;
          float alpha = 1.0 - (d * 2.0);
          alpha = pow(alpha, 2.0) * 0.9;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
    })

    return { geometry: geom, material: mat }
  }, [count, color])

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime
  })

  return <points ref={points} geometry={geometry} material={material} />
}

/* ----------------------------------------------------------------– */
/* ----------------------  EFFECTS  -------------------------------- */
/* ----------------------------------------------------------------– */
function PostProcessingEffects({ enabled = true }: { enabled?: boolean }) {
  if (!enabled) return null

  return (
    <EffectComposer>
      <Bloom 
        intensity={1.5} 
        luminanceThreshold={0.02}
        luminanceSmoothing={0.8}
      />
      <ChromaticAberration offset={[0.002, 0.002]} />
    </EffectComposer>
  )
}

/* ----------------------------------------------------------------– */
/* ----------------------  SCENE  ---------------------------------- */
/* ----------------------------------------------------------------– */
function Scene({
  theme = "aurora",
  complexity = 3,
  speed = 3,
  particleCount = 150,
  enableEffects = true,
}: {
  theme?: "primary" | "aurora" | "cosmic" | "liquid" | "danger"
  complexity?: number
  speed?: number
  particleCount?: number
  enableEffects?: boolean
}) {
  const particleColors = {
    primary: "#00D4FF",
    aurora: "#00FFD4",
    cosmic: "#FF006B",
    liquid: "#00FFAA",
    danger: "#FFAA00",
  }

  return (
    <>
      <Blob theme={theme} complexity={complexity} speed={speed} />
      <Particles count={particleCount} color={particleColors[theme]} />

      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" /> 
      <pointLight position={[-10, -10, -10]} intensity={1.0} color="#4444ff" />
      
      <Suspense fallback={null}>
        <Environment preset="night" />
      </Suspense>

      <PostProcessingEffects enabled={enableEffects} />
    </>
  )
}

/* ----------------------------------------------------------------– */
/* --------------------  EXPORTED  COMPONENT  ----------------------- */
/* ----------------------------------------------------------------– */
export function MorphingBlob({
  size = 400,
  theme = "aurora",
  complexity = 3,
  speed = 3,
  particleCount = 150,
  enableEffects = true,
  children,
  className,
  ...rest
}: {
  size?: number
  theme?: "primary" | "aurora" | "cosmic" | "liquid" | "danger"
  complexity?: number
  speed?: number
  particleCount?: number
  enableEffects?: boolean
  children?: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Simplified fallback without animations
  const FallbackComponent = () => (
    <div 
      className={className} 
      style={{ 
        width: size, 
        height: size, 
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `radial-gradient(circle at 30% 30%, ${
          theme === 'aurora' ? 'rgba(74, 0, 255, 0.2)' :
          theme === 'cosmic' ? 'rgba(183, 102, 234, 0.2)' :
          theme === 'liquid' ? 'rgba(128, 90, 252, 0.2)' :
          theme === 'danger' ? 'rgba(255, 0, 0, 0.2)' :
          'rgba(10, 15, 138, 0.2)'
        }, transparent 70%)`,
        borderRadius: '50%',
        overflow: 'hidden'
      }} 
      {...rest}
    >
      {children}
    </div>
  )

  if (!isClient) {
    return <FallbackComponent />
  }

  return (
    <div 
      className={className} 
      style={{ 
        width: size, 
        height: size, 
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }} 
      {...rest}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}>
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 45 }} 
          gl={{ 
            antialias: true, // Re-enabled for quality
            alpha: true,
            powerPreference: "high-performance",
            premultipliedAlpha: false,
            preserveDrawingBuffer: false,
            failIfMajorPerformanceCaveat: false,
            stencil: false,
            depth: true
          }}
          dpr={[1, 2]} // Responsive DPR for better quality
          style={{ 
            background: 'transparent',
            width: '100%',
            height: '100%'
          }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping
            gl.toneMappingExposure = 1.5 
            gl.setClearColor(0x000000, 0)
          }}
        >
          <Scene 
            theme={theme} 
            complexity={complexity} 
            speed={speed} 
            particleCount={particleCount}
            enableEffects={enableEffects}
          />
        </Canvas>
      </div>

      {children && (
        <div style={{ position: 'relative', zIndex: 2 }}>
          {children}
        </div>
      )}
    </div>
  )
}