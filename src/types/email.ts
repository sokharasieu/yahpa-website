// define the service/contact IDs from EmailJS dashboard
export type EmailServices = "contact_service" | "send_grid";
export type EmailTemplates = "contact_form";

export type EmailConfig = {
  serviceID: EmailServices;
  templateID: EmailTemplates;
};

export type EmailContactForm = {
  user_email: string;
  user_name: string;
  reason: string;
  message: string;
};
