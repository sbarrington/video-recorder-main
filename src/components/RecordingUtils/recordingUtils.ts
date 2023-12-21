// File: recordingUtils.ts

export function getCookie(cookieName: string): string | null {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      if (cookie[0] === cookieName) {
        return cookie[1];
      }
    }
    return null;
}
  
export function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

export function setUniqueIdentifierCookie(): void {
    const cookieName = "userId";
    let userId = getCookie(cookieName);
  
    if (!userId) {
      userId = generateUUID();
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + 60 * 24 * 60 * 60 * 1000);
      document.cookie = `${cookieName}=${userId}; expires=${expirationDate.toUTCString()}; path=/`;
    }
  }

export async function uploadFile(blob: Blob): Promise<void> {
  try {
    // Your existing implementation for getting microphone details goes here
    //const microphoneLabel = await getMicrophoneDetails();

    const formData = new FormData();
    const randomUUID = generateUUID();
    const userId = getCookie("userId");

    const userAgent = navigator.userAgent;
    formData.append('userAgent', userAgent);
    //formData.append('microphone', microphoneLabel);
    formData.append('files', blob, `${userId}_${randomUUID}.mp3`);
    formData.append('userId', userId);

    const response = await fetch('http://localhost:2000/upload', {
      method: 'POST',
      body: formData,
    });
}
