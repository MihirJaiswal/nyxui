export interface NewsletterSubscription {
    id?: string;
    email: string;
    subscribedAt: Date;
    isActive: boolean;
    ipAddress?: string;
  }
  
  export interface NewsletterResponse {
    success: boolean;
    message: string;
    error?: string;
  }