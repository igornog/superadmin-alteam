enum Experience {
  ENTRY,
  JUNIOR,
  MID,
  SENIOR,
  LEAD,
  C_LEVEL
}
enum Availability {
  ONE_TWO_DAYS,
  PART_TIME,
  FULL_TIME,
  EVENINGS_WK
}
export interface Freelancer{
  firstName : string,
  lastName : string,
  role : string,
  experience : Experience,
  availability : string,
  skills : string[],
  portfolioLink : string,
  about : string,
  id : number,
}
