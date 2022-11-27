import {GroupTalent, SoloTalent, TalentSearch} from "@yjcapp/app";

export interface TalentService {
  createGroupTalent(talent: Omit<GroupTalent, "id">): Promise<GroupTalent>;

  retrieveGroupTalent(id: string): Promise<GroupTalent | undefined>;

  createSoloTalent(talent: Omit<SoloTalent, "id">): Promise<SoloTalent>;

  retrieveSoloTalent(id: string): Promise<SoloTalent | undefined>;

  searchTalent(talentSearch: TalentSearch): Promise<SoloTalent[]>;
}
