const specialtyMap = {
  "First": "none",
  "Second": "Advertising and Creative",
  "Third": "Apps development",
  "Fourth": "Data & DevOps",
  "Fifth": "Mixed Speciality",
  "Sixth": "Product Design",
  "Seventh": "Software Engineering",
  "Eighth": "Web Development",
}
const teamSizeMap = {
  "First": "none",
  "Second": "2-5",
  "Third": "6-10",
  "Fourth": "11-25",
  "Fifth": "26-50",
  "Sixth": "51-100",
  "Seventh": "101-250",
  "Eighth": "250+",
}
interface WebflowWebhook {
  name: string;
  site: string;
}
export interface GroupTalentForm extends WebflowWebhook{
  data: {
    email: string;
    phone: string;
    speciality: string;
    size: string[];
    website: string;
    about: string;
    file: string;
  }
}
export interface SoloTalentForm extends WebflowWebhook{
  data: {
    firstName: string;
  }
}
export type WebflowForm = GroupTalentForm | SoloTalentForm;
