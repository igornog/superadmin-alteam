import { GroupTalentForm, SoloTalentForm, WebflowForm } from './formTypes'
import { GroupTalent, SoloTalent } from '@yjcapp/app'

const specialtyMap = {
  Zero: 'none',
  First: 'Advertising and Creative',
  Second: 'Apps development',
  Third: 'Data & DevOps',
  Fourth: 'Mixed Speciality',
  Fifth: 'Product Design',
  Sixth: 'Software Engineering',
  Seventh: 'Web Development',
}
const teamSizeMap = {
  Zero: 'none',
  First: '2-5',
  Second: '6-10',
  Third: '11-25',
  Fourth: '26-50',
  Fifth: '51-100',
  Sixth: '101-250',
  Seventh: '250+',
}
const availabilityMap = {
  Zero: 'none',
  First: 'One two days',
  Second: 'Part time (3 days)',
  Third: 'Full time (5 days)',
  Fourth: 'Evening Weekends',
}
const experienceMap = {
  Zero: 'none',
  First: 'Entry level',
  Second: 'Junior',
  Third: 'Mid weight',
  Fourth: 'Senior',
  Fifth: 'Lead',
  Sixth: 'C-level',
}

function retrieveSkills<T extends {}>(obj: T): string[] {
  return Object.entries(obj).map(([key, value]) => {
    if (key.startsWith('skill') && value === true) {
      return key.slice(5)
    }
  })
}

function groupFormToGroupTalent(
  form: GroupTalentForm,
): Omit<GroupTalent, 'id'> {
  const { data } = form
  const { email, phone, speciality, size, website, about, file } = data
  return {
    email,
    phone,
    speciality: specialtyMap[speciality],
    size: teamSizeMap[size],
    website,
    about,
    assets: [file],
  }
}

function soloTalentFormToSoloTalent(
  form: SoloTalentForm,
): Omit<SoloTalent, 'id' | 'appliedDate'> {
  const { data } = form
  const {
    firstName,
    lastName,
    experience,
    availability,
    portfolioLink,
    role,
    file,
    about,
  } = data
  return {
    firstName,
    lastName,
    experience: experienceMap[experience],
    availability: availabilityMap[availability],
    links: [portfolioLink],
    listing: [],
    status: 'inbound',
    about,
    role,
    assets: [file],
    skills: retrieveSkills(data),
  }
}

export function webflowWebhookToTalent(webflowForm: WebflowForm) {
  // @ts-ignore
  if (webflowForm.data.email !== undefined) {
    return groupFormToGroupTalent(webflowForm as GroupTalentForm)
  } else {
    return soloTalentFormToSoloTalent(webflowForm as SoloTalentForm)
  }
}
