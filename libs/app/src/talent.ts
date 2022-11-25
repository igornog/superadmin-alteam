export interface GroupTalent {
  id: string;
  email: string;
  phone: string;
  speciality: string;
  size: string;
  website: string;
  about: string;
  assets: string[];
}

export interface SoloTalent {
  id: string;
  firstName: string;
  lastName: string;
  experience: string;
  availability: string;
  links: string[];
  role: string;
  about: string;
  assets: string[];
  skills: string[];
  appliedDate : Date;
  phoneNumber?: string;
  salaryExpectation?: string;
  workExperience?: string;
  listing : Listing[];
}
export interface Listing {
  companyName: string;
  duration: string;
  jobType: string;
  status: "shortlisted" | "rejected" | "hired";
}


export type Talent = GroupTalent | SoloTalent;
