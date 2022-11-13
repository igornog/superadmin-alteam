import {GroupTalentForm, WebflowForm} from "./formTypes";
import {GroupTalent} from "@yjcapp/app";

function groupFormToGroupTalent(form: GroupTalentForm): GroupTalent {
  const {data} = form;
  const {email, phone, speciality, size, website, about, file} = data;
  return {
    email,
    phone,
    speciality,
    size,
    website,
    about,
    assets: [file],
  };
}

export function webflowToTalent(webflowForm: WebflowForm) {
  // @ts-ignore
  if (webflowForm.data.email !== undefined) {
    return groupFormToGroupTalent(webflowForm as GroupTalentForm);
  }
}
