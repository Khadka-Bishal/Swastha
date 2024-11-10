import { create } from 'zustand';
import { HeartbeatRecord, Consultation, User } from '../types';

interface AppState {
  currentUser: User | null;
  heartbeatRecords: HeartbeatRecord[];
  consultations: Consultation[];
  setCurrentUser: (user: User | null) => void;
  addHeartbeatRecord: (record: HeartbeatRecord) => void;
  addConsultation: (consultation: Consultation) => void;
  updateConsultation: (id: string, updates: Partial<Consultation>) => void;
}

export const useStore = create<AppState>((set) => ({
  currentUser: null,
  heartbeatRecords: [],
  consultations: [],
  
  setCurrentUser: (user) => set({ currentUser: user }),
  
  addHeartbeatRecord: (record) =>
    set((state) => ({
      heartbeatRecords: [...state.heartbeatRecords, record],
    })),
    
  addConsultation: (consultation) =>
    set((state) => ({
      consultations: [...state.consultations, consultation],
    })),
    
  updateConsultation: (id, updates) =>
    set((state) => ({
      consultations: state.consultations.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    })),
}));