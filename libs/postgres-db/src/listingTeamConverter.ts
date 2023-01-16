import { DeepPartial } from 'typeorm'
import { ClientTeam } from '@yjcapp/app'
import { ClientTeamEntity } from './entities/ClientTeam.entity'

export function clientTeamFromEntity(entity: ClientTeamEntity): ClientTeam {
  return {
    id: entity.id,
    soloClient: entity.soloClient,
    teamName: entity.teamName,
    teamSize: entity.teamSize,
    workType: entity.workType,
    timeZone: entity.timeZone,
    availability: entity.availability,
    projectLength: entity.projectLength,
    startDate: entity.startDate,
    exactRate: entity.exactRate,
    difficulty: entity.difficulty,
    learningLink: entity.learningLink,
    roles: entity.roles,
    skills: entity.skills,
    questions: entity.questions,
    jobDescription: entity.jobDescription,
  }
}

export function clientTeamToEntity(
  clientProject: DeepPartial<ClientTeam>,
): DeepPartial<ClientTeamEntity> {
  return {
    id: clientProject.id,
    soloClient: clientProject.soloClient,
    teamName: clientProject.teamName,
    teamSize: clientProject.teamSize,
    workType: clientProject.workType,
    timeZone: clientProject.timeZone,
    availability: clientProject.availability,
    projectLength: clientProject.projectLength,
    startDate: clientProject.startDate,
    exactRate: clientProject.exactRate,
    difficulty: clientProject.difficulty,
    learningLink: clientProject.learningLink,
    roles: clientProject.roles,
    skills: clientProject.skills,
    questions: clientProject.questions,
    jobDescription: clientProject.jobDescription,
  }
}
