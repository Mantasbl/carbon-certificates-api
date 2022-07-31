export interface JwtPayload {
  readonly id: number;

  readonly username: string;

  readonly password: string;
}

export interface JWT {
  readonly access_token: string;
}
