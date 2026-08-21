export interface clientState {
    roomName: string
};

export interface clientActions {
    setRoomName: (roomName: string) => void;
};

export type clientStore = clientState & { actions: clientActions };