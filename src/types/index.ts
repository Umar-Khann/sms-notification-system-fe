export interface Notification {
  id: number;
  message: string;
  status: string;
  created_at: string;
}

export interface Trigger {
  id: number;
  event: string;
  threshold: number;
  active: boolean;
}
