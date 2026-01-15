export interface SignUpFormData {
  fullName: string;
  jobTitle: string;
  phone: string;
  email: string;
}
//for Email validation only tests
export type SignUpFormDataWithoutEmail = Omit<SignUpFormData, 'email'>;