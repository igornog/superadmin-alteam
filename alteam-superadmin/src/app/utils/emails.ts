const EMAIL_CHECK = /^[\w-.+]+@([\w-]+\.)+[\w-]{2,}$/

export const isValidEmail = (email: string): boolean => EMAIL_CHECK.test(email)
