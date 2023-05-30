import { postgresClient } from './postgresClient'
import { GroupTalent, TalentNote } from '@yjcapp/app'
import { GroupTalentEntity } from './entities/GroupTalent.entity'
import {
  groupTalentFromEntity,
  groupTalentToEntity,
} from './groupTalentConverter'

async function createGroupTalent(
  groupTalent: Omit<GroupTalent, 'id'>,
): Promise<GroupTalent> {
  const groupTalentRepository = (await postgresClient()).getRepository(
    GroupTalentEntity,
  )
  const entity = groupTalentToEntity(groupTalent)
  const result = await groupTalentRepository.save(entity)
  return groupTalentFromEntity(result)
}

async function retrieveGroupTalent(
  id: string,
): Promise<GroupTalent | undefined> {
  const groupTalentRepository = (await postgresClient()).getRepository(
    GroupTalentEntity,
  )
  const result = await groupTalentRepository.findOneBy({ id: parseInt(id) })
  return result ? groupTalentFromEntity(result) : undefined
}

async function addNoteToGroupTalent(
  id: string,
  note: Partial<TalentNote>,
): Promise<GroupTalent> {
  const groupTalentRepository = (await postgresClient()).getRepository(
    GroupTalentEntity,
  )

  const entity = await groupTalentRepository.findOneBy({ id: parseInt(id) })
  const { notes: existingNotes } = entity

  const existingNotesParsed: TalentNote[] = existingNotes.map((note) => {
    const roleString = (note as unknown as string)
      .split(String.fromCharCode(92))
      .join('')
      .split("'")
      .join('"')

    return JSON.parse(roleString as unknown as string)
  })

  const lastNoteObj = JSON.parse(
    existingNotes[existingNotes.length - 1] as unknown as string,
  )

  const newNote: TalentNote = {
    id: existingNotes.length === 0 ? 1 : lastNoteObj.id + 1,
    author: note.author,
    text: note.text,
    createdAt: new Date(),
  }
  const newNotes = [...existingNotesParsed, newNote]

  await groupTalentRepository.update(id, {
    notes: newNotes,
  })

  return { ...groupTalentFromEntity(entity), notes: newNotes }
}

async function updateNoteOnGroupTalent(
  soloTalentId: string,
  noteId: string,
  note: TalentNote,
): Promise<GroupTalent> {
  const groupTalentRepository = (await postgresClient()).getRepository(
    GroupTalentEntity,
  )

  const entity = await groupTalentRepository.findOneBy({
    id: parseInt(soloTalentId),
  })
  const { notes: existingNotes } = entity

  const existingNotesParsed: TalentNote[] = existingNotes.map((note) => {
    const roleString = (note as unknown as string)
      .split(String.fromCharCode(92))
      .join('')
      .split("'")
      .join('"')

    return JSON.parse(roleString as unknown as string)
  })

  const editedNotes: TalentNote[] = existingNotesParsed.map((noteObj) => {
    if (noteObj.id === parseInt(noteId)) {
      return {
        ...noteObj,
        text: note.text,
        updatedAt: new Date(),
      }
    } else {
      return noteObj
    }
  })

  await groupTalentRepository.update(soloTalentId, {
    notes: editedNotes,
  })

  return { ...groupTalentFromEntity(entity), notes: editedNotes }
}

async function deleteNoteOnGroupTalent(
  soloTalentId: string,
  noteId: string,
): Promise<GroupTalent> {
  const groupTalentRepository = (await postgresClient()).getRepository(
    GroupTalentEntity,
  )

  const entity = await groupTalentRepository.findOneBy({
    id: parseInt(soloTalentId),
  })
  const { notes: existingNotes } = entity

  const existingNotesParsed: TalentNote[] = existingNotes.map((note) => {
    const roleString = (note as unknown as string)
      .split(String.fromCharCode(92))
      .join('')
      .split("'")
      .join('"')

    return JSON.parse(roleString as unknown as string)
  })

  const editedNotes: TalentNote[] = existingNotesParsed.filter((noteObj) => {
    return noteObj.id !== parseInt(noteId)
  })

  await groupTalentRepository.update(soloTalentId, {
    notes: editedNotes,
  })

  return { ...groupTalentFromEntity(entity), notes: editedNotes }
}

export const groupTalentPgRepository = {
  createGroupTalent,
  retrieveGroupTalent,
  addNoteToGroupTalent,
  updateNoteOnGroupTalent,
  deleteNoteOnGroupTalent,
}
