import { ShelterFormFields } from '../types/types.form';
import Autocomplete from '../../google.maps/autocomplete/react-google-maps-api-autocomplete';

import style from './shelter.form.module.scss';
import genericStyles from '../../../app/app.module.scss';

export const ShelterForm = ({
  handleShelterChange,
  shelterFields,
  handleImageUploadChange,
  loadingImage,
  handleAddressChange,
}: {
  handleShelterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  shelterFields: ShelterFormFields;
  handleImageUploadChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loadingImage: boolean;
  handleAddressChange: any;
}) => {
  return (
    <div className={style.container_shelter_form}>
      <input
        className={`${genericStyles.input} ${style.input}`}
        type="text"
        name="shelterName"
        value={shelterFields.shelterName}
        onChange={handleShelterChange}
        placeholder="Shelter name"
      />
      <Autocomplete handleAddressChange={handleAddressChange} />
      <input
        className={`${genericStyles.input} ${style.input}`}
        type="email"
        name="email"
        value={shelterFields.email}
        onChange={handleShelterChange}
        placeholder="Email"
      />
      <input
        className={`${genericStyles.input} ${style.input}`}
        type="password"
        name="password"
        value={shelterFields.password}
        onChange={handleShelterChange}
        placeholder="Password"
      />
      <div className={style.loadImage}>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleImageUploadChange}
        />
        {loadingImage ? (
          <p className={style.textImage}>Loading image</p>
        ) : (
          <img
            className={style.loadingImage}
            src={shelterFields.avatar as unknown as string}
            alt={shelterFields.shelterName}
          />
        )}
      </div>
    </div>
  );
};
