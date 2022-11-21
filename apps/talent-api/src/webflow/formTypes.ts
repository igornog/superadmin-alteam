interface WebflowWebhook {
  name: string;
  site: string;
}

export interface GroupTalentForm extends WebflowWebhook {
  data: {
    email: string;
    phone: string;
    speciality: string;
    size: string;
    website: string;
    about: string;
    file: string;
  }
}

export interface SoloTalentForm extends WebflowWebhook {
  data: {
    firstName: string;
    lastName: string;
    experience: string;
    availability: string;
    portfolioLink: string;
    role: string;
    about : string;
    file: string;
  }
}

export type WebflowForm = GroupTalentForm | SoloTalentForm;
