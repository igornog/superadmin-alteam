import { DeepPartial } from 'typeorm'
import { SoloClient } from '@yjcapp/app'
import { SoloClientEntity } from './entities/SoloClient.entity'

export function clientFromEntity(entity: SoloClientEntity): SoloClient {
  return {
    id: entity.id,
    logo: entity.logo,
    companyName: entity.companyName,
    phoneNumber: entity.phoneNumber,
    companyUrl: entity.companyUrl,
    linkedinUrl: entity.linkedinUrl,
    industry: entity.industry,
    projectType: entity.projectType,
    deliveryType: entity.deliveryType,
    teamRequest: entity.teamRequest,
    request: entity.request,
    email: entity.email,
    projects: entity.projects as any,
    fullName: entity.fullName,
    position: entity.position,
    status: entity.status,
  }
}

export function clientToEntity(
  client: DeepPartial<SoloClient>,
): DeepPartial<SoloClientEntity> {
  return {
    id: client.id,
    logo: client.logo,
    companyName: client.companyName,
    phoneNumber: client.phoneNumber,
    companyUrl: client.companyUrl,
    linkedinUrl: client.linkedinUrl,
    industry: client.industry,
    projectType: client.projectType,
    deliveryType: client.deliveryType,
    teamRequest: client.teamRequest,
    request: client.request,
    email: client.email,
    projects: client.projects as any,
    fullName: client.fullName,
    position: client.position,
    status: client.status,
  }
}
