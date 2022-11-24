import { PostgresDataSource } from './PostgresDataSource'

export async function postgresClient() {
  const dataSource = PostgresDataSource
  if (dataSource.isInitialized) {
    return dataSource
  } else {
    return await dataSource.initialize()
  }
}
