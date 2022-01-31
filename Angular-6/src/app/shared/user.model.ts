import { social_media_handle } from './social_media_handles.model';
export class User {
    email: string;
    password: string;
    category: string;
    phone: string;
    signUpAs: string;
    social_media_handles: social_media_handle[];
}