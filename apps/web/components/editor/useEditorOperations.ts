import { create } from 'zustand';
import { EditorOperation, ZoomOperation, TrimOperation, BlurOperation } from './types';

interface EditorOperationsState {
  operations: EditorOperation[];
  selectedOperationId: string | null;
  
  // Actions
  addOperation: (op: EditorOperation) => void;
  removeOperation: (id: string) => void;
  updateOperation: (id: string, updates: Partial<EditorOperation>) => void;
  selectOperation: (id: string | null) => void;
  
  // Helpers to create new operations with defaults
  addZoom: (currentTime: number, duration: number) => void;
  addTrim: (currentTime: number, duration: number) => void;
  addBlur: (currentTime: number, duration: number) => void;
  
  // Get active operations at a given time
  getActiveOperations: (currentTime: number) => EditorOperation[];
  getActiveZooms: (currentTime: number) => ZoomOperation[];
  getActiveBlurs: (currentTime: number) => BlurOperation[];
  getActiveTrims: (currentTime: number) => TrimOperation[];
  
  // Get the selected operation object
  getSelectedOperation: () => EditorOperation | undefined;
}

export const useEditorOperations = create<EditorOperationsState>((set, get) => ({
  operations: [],
  selectedOperationId: null,

  addOperation: (op) => set((state) => ({ operations: [...state.operations, op] })),
  removeOperation: (id) => set((state) => ({ 
    operations: state.operations.filter(op => op.id !== id),
    selectedOperationId: state.selectedOperationId === id ? null : state.selectedOperationId
  })),
  updateOperation: (id, updates) => set((state) => ({
    operations: state.operations.map(op => op.id === id ? { ...op, ...updates } as EditorOperation : op)
  })),
  selectOperation: (id) => set({ selectedOperationId: id }),

  addZoom: (currentTime, duration) => {
    get().addOperation({
      id: `zoom-${Date.now()}`,
      type: "zoom",
      start: currentTime,
      end: Math.min(currentTime + 5, duration),
      scale: 2.0,
      x: 0.25,
      y: 0.25,
      width: 0.5,
      height: 0.5
    });
  },
  
  addTrim: (currentTime, duration) => {
    get().addOperation({
      id: `trim-${Date.now()}`,
      type: "trim",
      start: currentTime,
      end: Math.min(currentTime + 3, duration),
    });
  },

  addBlur: (currentTime, duration) => {
    get().addOperation({
      id: `blur-${Date.now()}`,
      type: "blur",
      start: currentTime,
      end: Math.min(currentTime + 4, duration),
      x: 0.3,
      y: 0.3,
      width: 0.25,
      height: 0.2,
      blurAmount: 10
    });
  },

  getActiveOperations: (currentTime) => get().operations.filter(op => currentTime >= op.start && currentTime <= op.end),
  getActiveZooms: (currentTime) => get().getActiveOperations(currentTime).filter((op): op is ZoomOperation => op.type === "zoom"),
  getActiveBlurs: (currentTime) => get().getActiveOperations(currentTime).filter((op): op is BlurOperation => op.type === "blur"),
  getActiveTrims: (currentTime) => get().getActiveOperations(currentTime).filter((op): op is TrimOperation => op.type === "trim"),

  getSelectedOperation: () => {
    const { operations, selectedOperationId } = get();
    return operations.find(op => op.id === selectedOperationId);
  }
}));

export function useEditorOps() {
  return useEditorOperations();
}
