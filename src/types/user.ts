export interface User {
  id: string;
  fullName: string;
  email?: string;
  localId?: string;
  emailVerified?: true;
  providers: Array<SocialProvider>;
  phone?: string;
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
  products: Array<UserProduct>;
  profile?: UserProfile;
}

export interface SocialProvider {
  providerId: string;
  rawId?: string;
  email?: string;
  displayName?: string;
  photoUrl?: string;
}

export interface UserProduct {
  user: string;
  product: PRODUCTS;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum PRODUCTS {
  BOLT_ADMIN = 'BOLT_ADMIN',
  BOLT_PLUS = 'BOLT_PLUS',
  BOLT_X = 'BOLT_X',
  BOLT_TV = 'BOLT_TV',
  BOLT_CMS = 'BOLT_CMS',
}

export interface UserProfile {
  user: string;
  username: string;
  language: string;
  gender?: string;
  interests: Array<string>;
}
