
export interface IToken {
  type: TokenType;
  value: string;
}

export enum TokenType {
  access = 10,
  refresh = 20
}

export interface ITokenPair {
  token: string;
  refreshToken: string;
}
