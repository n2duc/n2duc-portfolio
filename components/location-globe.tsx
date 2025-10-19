"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

interface LocationPoint {
  lat: number;
  lng: number;
  size: number;
  color: string;
  label: string;
}

export function LocationGlobe() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeEl = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);

  // Da Nang, Vietnam coordinates
  const location: LocationPoint = {
    lat: 16.0544,
    lng: 108.2022,
    size: 0.8,
    color: "#40c9a2", // accent color
    label: "Da Nang, Vietnam"
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (globeEl.current && isClient) {
      // Auto-rotate to Da Nang location
      globeEl.current.pointOfView(
        {
          lat: location.lat,
          lng: location.lng,
          altitude: 2.5
        },
        2000
      );

      // Set up auto-rotation
      const controls = globeEl.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
        controls.enableZoom = true;
        controls.minDistance = 200;
        controls.maxDistance = 500;
      }
    }
  }, [isClient, location.lat, location.lng]);

  if (!isClient) {
    return (
      <div className="w-full h-[400px] lg:h-[500px] flex items-center justify-center bg-card/50 rounded-2xl border border-border">
        <div className="text-muted">Loading globe...</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden border border-border bg-gradient-to-b from-bg to-card"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <Globe
          ref={globeEl}
          width={undefined}
          height={undefined}
          backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        
        // Points data (Da Nang marker)
        pointsData={[location]}
        pointAltitude={0.01}
        pointRadius="size"
        pointColor="color"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        pointLabel={(d: any) => `
          <div style="
            background: rgba(11, 13, 16, 0.95);
            padding: 8px 12px;
            border-radius: 8px;
            border: 2px solid #40c9a2;
            color: #e6eaf2;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(64, 201, 162, 0.3);
          ">
            📍 ${d.label}
          </div>
        `}
        
        // Arcs (optional connecting line from point to globe center for effect)
        arcsData={[
          {
            startLat: location.lat,
            startLng: location.lng,
            endLat: location.lat + 20,
            endLng: location.lng + 20,
            color: ["#40c9a2", "#8bfad7"]
          }
        ]}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        arcStroke={0.5}
        
        // Atmosphere
        atmosphereColor="#40c9a2"
        atmosphereAltitude={0.15}
        
        // Labels
        labelsData={[
          {
            lat: location.lat,
            lng: location.lng,
            text: "📍",
            size: 2,
            color: "#40c9a2"
          }
        ]}
        labelText="text"
        labelSize="size"
        labelColor="color"
        labelAltitude={0.02}
        labelDotRadius={0.4}
        labelDotOrientation="top"
        
        // Enable interactions
        enablePointerInteraction={true}
        />
      </div>
      
      {/* Info overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-sm border border-accent/30 rounded-xl p-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
          <div>
            <div className="font-semibold text-sm">Based in</div>
            <div className="text-accent font-bold">{location.label}</div>
          </div>
        </div>
        <div className="mt-2 text-xs text-muted">
          🌏 Interactive globe • Drag to rotate • Scroll to zoom
        </div>
      </motion.div>
    </motion.div>
  );
}

