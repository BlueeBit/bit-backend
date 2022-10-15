export const dateInDaysFromNow = (day: number): Date => {
  const date = new Date()
  const seconds = day * 24 * 60 * 60
  date.setSeconds(seconds)
  return date
}

export const injectEmailId = (email: string): string => email.split("@")[0]
