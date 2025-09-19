import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapPinIcon from '@/assets/map-pin-block.png';

interface Block {
  id: string;
  nome: string;
  descricao: string;
  contato: string;
  foto: string;
  local: [number, number];
  cidade: string;
  estado: string;
  vertenteFeminista: string;
  formacao: string;
  cache?: string;
}

interface FeministBlocksMapProps {
  blocks: Block[];
  onBlockSelect?: (block: Block) => void;
  selectedBlockId?: string;
}

const FeministBlocksMap: React.FC<FeministBlocksMapProps> = ({ 
  blocks, 
  onBlockSelect,
  selectedBlockId 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainer.current) return;

    // Create custom icon
    const customIcon = L.icon({
      iconUrl: mapPinIcon,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    // Initialize map
    map.current = L.map(mapContainer.current).setView([-14.235, -51.9253], 4.5);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map.current);

    // Add markers for each block
    blocks.forEach((block) => {
      const marker = L.marker(block.local, { icon: customIcon })
        .addTo(map.current!)
        .bindPopup(`
          <div class="p-4 max-w-xs">
            <img src="${block.foto}" alt="${block.nome}" class="w-full h-24 object-cover rounded-md mb-3">
            <h3 class="font-bold text-lg mb-2 text-primary">${block.nome}</h3>
            <p class="text-sm text-muted-foreground mb-2">${block.descricao}</p>
            <div class="space-y-1 text-xs">
              <p><strong>Cidade:</strong> ${block.cidade}, ${block.estado}</p>
              <p><strong>Vertente:</strong> ${block.vertenteFeminista}</p>
              <p><strong>Contato:</strong> ${block.contato}</p>
            </div>
          </div>
        `);

      marker.on('click', () => {
        onBlockSelect?.(block);
      });

      markersRef.current[block.id] = marker;
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [blocks, onBlockSelect]);

  // Highlight selected block
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([blockId, marker]) => {
      if (blockId === selectedBlockId) {
        marker.setIcon(L.icon({
          iconUrl: mapPinIcon,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40],
          className: 'selected-marker animate-bounce'
        }));
      } else {
        marker.setIcon(L.icon({
          iconUrl: mapPinIcon,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        }));
      }
    });
  }, [selectedBlockId]);

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-carnival">
      <div ref={mapContainer} className="w-full h-full" />
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-soft">
        <h3 className="font-semibold text-primary mb-1">Blocos Feministas</h3>
        <p className="text-sm text-muted-foreground">{blocks.length} blocos mapeados</p>
      </div>
    </div>
  );
};

export default FeministBlocksMap;