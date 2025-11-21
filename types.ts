import React from 'react';

export interface Transaction {
  id: string;
  type: 'entrada' | 'saida';
  description: string;
  amount: number;
  date: string;
  category: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  achieved: boolean;
  icon: React.ReactNode;
}

export interface GroundingChunk {
    web?: {
        uri: string;
        title: string;
    };
}

// FIX: Add missing LatLng interface, which was causing an import error in `hooks/useGeolocation.ts`.
export interface LatLng {
  latitude: number;
  longitude: number;
}
