export {};

declare global {
  interface Window {
    api_token: string;
    conversation_id;
    Swal: any;
  }
}
