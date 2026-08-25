export interface clientState {
    roomName: string
};

export interface clientActions {
    setRoomName: (roomName: string) => void;
};

export type clientStore = clientState & { actions: clientActions };

export interface meetingState {
    token: string;
    serverUrl: string;
    roomName: string;
    participantName: string;
    audioEnabled: boolean;
    videoEnabled: boolean;
};

export interface meetingActions {
    setToken: (token: string) => void;
    setServerUrl: (serverUrl: string) => void;
    setRoomName: (roomName: string) => void;
    setParticipantName: (participantName: string) => void;
    setMediaPreferences: (audioEnabled: boolean, videoEnabled: boolean) => void;
    reset: () => void;
};

export type meetingStore = meetingState & { actions: meetingActions };