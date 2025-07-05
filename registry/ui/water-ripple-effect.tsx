"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

interface WaterRippleEffectProps {
  imageSrc: string
  width?: number
  height?: number
  waveIntensity?: number
  rippleIntensity?: number
  animationSpeed?: number
  hoverRippleMultiplier?: number
  transitionSpeed?: number
  className?: string
  containerClassName?: string
  scale?: number
  waveFrequency?: number
  rippleFrequency?: number
  distortionAmount?: number
  onHover?: () => void
  onLeave?: () => void
}

export default function WaterRippleEffect({
  imageSrc,
  width = 920,
  height = 955,
  waveIntensity = 0.006,
  rippleIntensity = 0.012,
  animationSpeed = 1.0,
  hoverRippleMultiplier = 4.0,
  transitionSpeed = 0.08,
  className = "",
  containerClassName = "",
  scale = 1.0,
  waveFrequency = 10.0,
  rippleFrequency = 20.0,
  distortionAmount = 0.008,
  onHover,
  onLeave,
  ...props
}: WaterRippleEffectProps & React.HTMLAttributes<HTMLDivElement>) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const timeRef = useRef(0)
  const isHoveredRef = useRef(false)

  useEffect(() => {
    const mountElement = mountRef.current
    if (!mountElement) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    mountElement.appendChild(renderer.domElement)

    // Load texture
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(imageSrc)

    // Dynamic shader with configurable parameters
    const vertexShader = `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      uniform sampler2D texture1;
      uniform float time;
      uniform vec2 mouse;
      uniform float hoverIntensity;
      uniform float waveIntensity;
      uniform float rippleIntensity;
      uniform float animationSpeed;
      uniform float waveFrequency;
      uniform float rippleFrequency;
      uniform float distortionAmount;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        
        // Global wavy distortion with configurable parameters
        float wave1 = sin(uv.x * waveFrequency + time * animationSpeed * 2.0) * waveIntensity;
        float wave2 = sin(uv.y * (waveFrequency * 0.8) + time * animationSpeed * 1.5) * (waveIntensity * 0.83);
        float wave3 = sin((uv.x + uv.y) * (waveFrequency * 1.2) + time * animationSpeed * 2.5) * (waveIntensity * 0.25);
        
        // Mouse-based ripples with configurable intensity
        float dist = distance(uv, mouse);
        float mouseWave1 = sin(dist * rippleFrequency - time * animationSpeed * 4.0) * 
                          exp(-dist * 3.0) * hoverIntensity * rippleIntensity;
        float mouseWave2 = sin(dist * (rippleFrequency * 0.75) - time * animationSpeed * 3.0) * 
                          exp(-dist * 2.0) * hoverIntensity * (rippleIntensity * 0.67);
        
        // Additional expanding ripples
        float ripple1 = sin(length(uv - mouse) * (rippleFrequency * 1.25) - time * animationSpeed * 5.0) * 
                       exp(-length(uv - mouse) * 4.0) * hoverIntensity * (rippleIntensity * 1.25);
        float ripple2 = sin(length(uv - mouse) * (rippleFrequency * 0.9) - time * animationSpeed * 3.5) * 
                       exp(-length(uv - mouse) * 3.0) * hoverIntensity * (rippleIntensity * 0.83);
        
        // Combine all waves
        float totalWave = wave1 + wave2 + wave3 + mouseWave1 + mouseWave2 + ripple1 + ripple2;
        
        // Create smooth directional distortion
        vec2 distortion = vec2(
          sin(uv.x * (waveFrequency * 0.8) + time * animationSpeed * 1.8) * distortionAmount * 0.5 + 
          sin(uv.y * (waveFrequency * 0.6) + time * animationSpeed * 2.2) * distortionAmount * 0.375,
          sin(uv.y * (waveFrequency * 0.7) + time * animationSpeed * 1.6) * distortionAmount * 0.5 + 
          sin(uv.x * (waveFrequency * 0.9) + time * animationSpeed * 2.0) * distortionAmount * 0.375
        );
        
        // Add mouse-based radial distortion
        vec2 mouseDir = uv - mouse;
        float mouseDist = length(mouseDir);
        vec2 mouseDistortion = normalize(mouseDir) * sin(mouseDist * rippleFrequency - time * animationSpeed * 4.0) * 
                              exp(-mouseDist * 3.0) * hoverIntensity * distortionAmount;
        
        // Combine distortions
        vec2 finalDistortion = distortion + mouseDistortion + vec2(totalWave * 0.3, totalWave * 0.4);
        
        // Apply distortion to UV coordinates
        vec2 distortedUv = uv + finalDistortion;
        
        // Sample texture with distorted coordinates
        vec4 color = texture2D(texture1, distortedUv);
        
        gl_FragColor = color;
      }
    `

    // Create material with configurable uniforms
    const material = new THREE.ShaderMaterial({
      uniforms: {
        texture1: { value: texture },
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0.5, 0.5) },
        hoverIntensity: { value: 0.3 },
        waveIntensity: { value: waveIntensity },
        rippleIntensity: { value: rippleIntensity },
        animationSpeed: { value: animationSpeed },
        waveFrequency: { value: waveFrequency },
        rippleFrequency: { value: rippleFrequency },
        distortionAmount: { value: distortionAmount }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    })

    // Create geometry 
    const aspectRatio = width / height
    const geometry = new THREE.PlaneGeometry(4 * aspectRatio, 4, 1, 1)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    camera.position.z = 3

    // Store references
    sceneRef.current = scene
    rendererRef.current = renderer
    materialRef.current = material

    // Event handlers
    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = 1 - (event.clientY - rect.top) / rect.height
      mouseRef.current = { x, y }
    }

    const handleMouseEnter = () => {
      isHoveredRef.current = true
      onHover?.()
    }
    
    const handleMouseLeave = () => {
      isHoveredRef.current = false
      onLeave?.()
    }

    renderer.domElement.addEventListener("mousemove", handleMouseMove)
    renderer.domElement.addEventListener("mouseenter", handleMouseEnter)
    renderer.domElement.addEventListener("mouseleave", handleMouseLeave)

    // Animation loop
    const animate = () => {
      timeRef.current += 0.016

      if (materialRef.current) {
        materialRef.current.uniforms.time.value = timeRef.current
        materialRef.current.uniforms.mouse.value.set(mouseRef.current.x, mouseRef.current.y)
        const targetIntensity = isHoveredRef.current ? hoverRippleMultiplier : 0.3
        const currentIntensity = materialRef.current.uniforms.hoverIntensity.value
        materialRef.current.uniforms.hoverIntensity.value += (targetIntensity - currentIntensity) * 0.05
      }

      if (rendererRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, camera)
      }
      requestAnimationFrame(animate)
    }
    animate()

    // Cleanup
    return () => {
      renderer.domElement.removeEventListener("mousemove", handleMouseMove)
      renderer.domElement.removeEventListener("mouseenter", handleMouseEnter)
      renderer.domElement.removeEventListener("mouseleave", handleMouseLeave)

      if (mountElement && renderer.domElement && mountElement.contains(renderer.domElement)) {
        mountElement.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      texture.dispose()
    }
  }, [
    imageSrc, width, height, waveIntensity, rippleIntensity, animationSpeed, hoverRippleMultiplier, transitionSpeed,
    waveFrequency, rippleFrequency, distortionAmount, onHover, onLeave
  ])

  return (
    <div className={`w-full flex justify-center items-center ${containerClassName}`}>
      <div className="relative">
        <div
          ref={mountRef}
          className={`transition-transform duration-300 ${className}`}
          style={{ transform: `scale(${scale})` }}
        />
      </div>
    </div>
  )
}