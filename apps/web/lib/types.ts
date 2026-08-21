export interface clientState {
    roomName: string
};

export interface clientActions {
    setRoomName: (roomName: string) => void;
};

export type clientStore = clientState & { actions: clientActions };

export interface meetingState {
    token: string
};

export interface meetingActions {
    setToken: (token: string) => void;
};

export type meetingStore = meetingState & { actions: meetingActions };