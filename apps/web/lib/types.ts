export interface clientState {
    roomName: string
};

export interface clientActions {
    setRoomName: (roomName: string) => void;
};

export type clientStore = clientState & { actions: clientActions };

export interface meetingState {
    token: string;
    roomName: string;
    serverUrl: string;
    videoDeviceId: string;
    audioDeviceId: string;
    participantName: string;
    projectName: string;

    audioEnabled: boolean;
    videoEnabled: boolean;
};

export interface meetingActions {
    setToken: (token: string) => void;
    setRoomName: (roomName: string) => void;
    setProjectName: (projectName: string) => void;
    setServerUrl: (serverUrl: string) => void;
    setVideoDeviceId: (deviceId: string) => void;
    setAudioDeviceId: (deviceId: string) => void;
    setParticipantName: (participantName: string) => void;
    setMediaPreferences: (audioEnabled: boolean, videoEnabled: boolean) => void;
    reset: () => void;
};

export type meetingStore = meetingState & { actions: meetingActions };