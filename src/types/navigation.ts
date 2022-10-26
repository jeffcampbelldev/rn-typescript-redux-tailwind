export type RootStackParamList = {
  AuthStack: undefined;
  OnboardingStack: undefined;
  AuthedStack: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  EmailLogin: undefined;
  Password: { isSignup: boolean; email: string };
  UserName: { email: string; password?: string; fName?: string; lName?: string; isSocialSignup?: boolean };
  EmailVerify: undefined;
};

export type OnboardingStackParamList = {
  Language: undefined;
  Interests: undefined;
};

export type AuthedStackParamList = {
  MainStack: undefined;
  Profile: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  Live: undefined;
  Radio: undefined;
};

export type ProfileStackParamList = {
  ProfileHome: undefined;
};

export type StackParams = RootStackParamList & AuthStackParamList & OnboardingStackParamList & AuthedStackParamList & MainStackParamList;
