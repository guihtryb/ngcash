export interface UserData {
  user: {
    id: number,
    username: string,
    accountId: number,
    balance: string,
  }
  token: string,
}

export interface HandleAxiosError {
  response: {
    data: {
      message: string
    }
  }
}
