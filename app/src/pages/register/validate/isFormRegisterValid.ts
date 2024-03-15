import {
  ShelterFormFields,
  UserFormFields,
} from '@/components/register.form/types/types.form';

export const isFormRegisterValid = (
  role: string | undefined,
  shelterFields: Partial<ShelterFormFields>,
  userFields: Partial<UserFormFields>
) => {
  if (role === 'shelter') {
    if (
      shelterFields.shelterName &&
      shelterFields.email &&
      shelterFields.password &&
      shelterFields.address &&
      shelterFields.province &&
      shelterFields.avatar
    ) {
      return true;
    }
    return false;
  } else {
    if (
      userFields.userName &&
      userFields.email &&
      userFields.password &&
      userFields.address &&
      userFields.province &&
      userFields.avatar &&
      userFields.lifestyle!.length
    ) {
      return true;
    }
    return false;
  }
};
