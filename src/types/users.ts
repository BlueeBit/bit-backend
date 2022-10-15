export interface UserRegister {
  organizationName: string
  firstname: string
  middlename: string
  lastname: string
  password: string
  email: string
  createdAt: string
  updatedAt?: string
}

export interface UserLogin {
  password: string
  email: string
}
