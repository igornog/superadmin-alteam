import {GroupTalent, SoloTalent, Talent} from "@yjcapp/app";

export function isGroupTalent(talent: Talent): talent is GroupTalent {
  return (talent as GroupTalent).speciality !== undefined;
}
export function isSoloTalent(talent: Talent): talent is SoloTalent {
  return isGroupTalent(talent) === false;
}
