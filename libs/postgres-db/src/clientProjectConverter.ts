import { DeepPartial } from 'typeorm'
import { ClientProject } from '@yjcapp/app'
import { ClientProjectEntity } from './entities/ClientProjet.entity'

export function clientProjectFromEntity(
  entity: ClientProjectEntity,
): ClientProject {
  return {
    id: entity.id.toString(),
    projectName: entity.projectName,
    individuals: entity.individuals,
    workType: entity.workType,
    timeZone: entity.timeZone,
    availability: entity.availability,
    projectLength: entity.projectLength,
    startDate: entity.startDate,
    rateFrom: entity.rateFrom,
    rateTo: entity.rateTo,
    difficulty: entity.difficulty,
    learningLink: entity.learningLink,
    jobDescription: entity.jobDescription,
    skills: entity.skills,
    questions: entity.questions,
  }
}

export function clientProjectToEntity(
  clientProject: DeepPartial<ClientProject>,
): DeepPartial<ClientProjectEntity> {
  return {
    id: clientProject.id ? parseInt(clientProject.id) : undefined,
    projectName: clientProject.projectName,
    individuals: clientProject.individuals,
    workType: clientProject.workType,
    timeZone: clientProject.timeZone,
    availability: clientProject.availability,
    projectLength: clientProject.projectLength,
    startDate: clientProject.startDate,
    rateFrom: clientProject.rateFrom,
    rateTo: clientProject.rateTo,
    difficulty: clientProject.difficulty,
    learningLink: clientProject.learningLink,
    jobDescription: clientProject.jobDescription,
    skills: clientProject.skills,
    questions: clientProject.questions,
  }
}
