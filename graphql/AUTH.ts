export const MUT_AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

export const QUERY_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`;

export const MUTATE_REFRESH_AUTHENTICATION = `
  mutation($request: RefreshRequest!) { 
    refresh(request: $request) {
      accessToken
      refreshToken
    }
 }
`;
