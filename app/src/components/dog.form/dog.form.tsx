import { useState, ChangeEvent } from 'react';
import { Dog, Personality, Size } from '../../models/dog.type';
import { optionsSize } from './form.options/size.options';
import { optionsPersonality } from './form.options/personality.options';
import { handleImageUpload } from '../../services/files.cloudinary.repository';

import style from './dog.form.module.scss';
import genericStyle from '../../app/app.module.scss';

export default function DogForm({
  handlerFormDog,
  handleAddDog,
}: {
  handlerFormDog: () => void;
  handleAddDog: (
    e: React.FormEvent<HTMLFormElement>,
    formDataDog: Partial<Dog>
  ) => void;
}) {
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [formDataDog, setModalFormDataDog] = useState<Partial<Dog>>({
    name: '',
    years: undefined,
    months: undefined,
    size: '',
    chipNumber: undefined,
    hasBreed: false,
    breed: undefined,
    description: '',
    image: null,
    personality: [],
  });

  const handleHasBreedChange = (event: ChangeEvent<HTMLInputElement>) => {
    setModalFormDataDog({
      ...formDataDog,
      hasBreed: event.target.value === 'true',
    });
  };

  const isFormValid = () => {
    const {
      name,
      years,
      months,
      size,
      chipNumber,
      hasBreed,
      breed,
      description,
      image,
      personality,
    } = formDataDog;
    if (
      name &&
      years &&
      months &&
      size &&
      chipNumber &&
      description &&
      image &&
      personality!.length > 0 &&
      (hasBreed === false || (hasBreed && breed))
    ) {
      return true;
    }
    return false;
  };

  const handleRemovePersonality = (personalityToRemove: string) => {
    setModalFormDataDog((prevState) => {
      const updatedPersonality = (prevState.personality ?? []).filter(
        (personality) => personality !== personalityToRemove
      );

      return {
        ...prevState,
        personality: updatedPersonality,
      };
    });
  };

  const handlePersonalityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;

    if (formDataDog.personality?.length === 3) {
      return;
    }
    setModalFormDataDog((prevState) => ({
      ...prevState,
      personality: [
        ...(prevState.personality ?? []),
        selectedOption,
      ] as Personality[],
    }));
  };

  const handleImageUploadChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoadingImage(!loadingImage);
    const imageUrl = await handleImageUpload(e);
    if (imageUrl) setLoadingImage(false);
    setModalFormDataDog((prevState) => ({
      ...prevState,
      image: imageUrl || '',
    }));
  };

  return (
    <div className={style.container_dog_form}>
      <button className={genericStyle.button} onClick={handlerFormDog}>
        x
      </button>
      <form
        className={style.dog_form}
        onSubmit={(e) => handleAddDog(e, formDataDog)}
      >
        <h2>New dog</h2>
        <input
          className={genericStyle.input}
          type="text"
          name="name"
          value={formDataDog.name}
          onChange={(e) =>
            setModalFormDataDog({ ...formDataDog, name: e.target.value })
          }
          placeholder="Name"
          required
        />
        <div className={style.age}>
          <input
            className={genericStyle.input}
            type="number"
            name="years"
            value={formDataDog.years}
            onChange={(e) =>
              setModalFormDataDog({
                ...formDataDog,
                years: parseInt(e.target.value),
              })
            }
            placeholder="Years"
            required
          />
          <input
            className={genericStyle.input}
            type="number"
            name="months"
            value={formDataDog.months}
            onChange={(e) =>
              setModalFormDataDog({
                ...formDataDog,
                months: parseInt(e.target.value),
              })
            }
            placeholder="Months"
            required
          />
        </div>
        <select
          name="size"
          value={formDataDog.size}
          onChange={(e) =>
            setModalFormDataDog({
              ...formDataDog,
              size: e.target.value as Size,
            })
          }
          required
        >
          <option value="">Select size</option>
          {optionsSize.map((size) => (
            <option key={size} value={size}>
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </option>
          ))}
        </select>
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
              src={formDataDog.image as string}
              alt={formDataDog.name}
            />
          )}
        </div>
        <input
          className={genericStyle.input}
          type="number"
          name="chipNumber"
          value={formDataDog.chipNumber}
          pattern="\d{15}"
          onChange={(e) => {
            if (e.target.value.length <= 15) {
              setModalFormDataDog({
                ...formDataDog,
                chipNumber: parseInt(e.target.value),
              });
            }
          }}
          placeholder="ChipNumber"
          required
        />
        {formDataDog.chipNumber ? (
          <p>{formDataDog.chipNumber.toString().length}/15</p>
        ) : (
          <p></p>
        )}
        <div className={style.breed}>
          <label>Has breed?</label>
          <label>
            Yes
            <input
              type="radio"
              name="hasBreed"
              value="true"
              checked={formDataDog.hasBreed}
              onChange={handleHasBreedChange}
            />
          </label>
          <label>
            No
            <input
              type="radio"
              name="hasBreed"
              value="false"
              checked={!formDataDog.hasBreed}
              onChange={handleHasBreedChange}
            />
          </label>
        </div>
        {formDataDog.hasBreed && (
          <input
            className={genericStyle.input}
            type="text"
            name="breed"
            value={formDataDog.breed}
            onChange={(e) =>
              setModalFormDataDog({ ...formDataDog, breed: e.target.value })
            }
            placeholder="Breed"
            required
          />
        )}
        <label>Personality (max 3)</label>
        <select
          multiple
          value={formDataDog.personality}
          onChange={handlePersonalityChange}
          required
        >
          {optionsPersonality.map((personality: string, index: number) => (
            <option
              key={index}
              value={personality}
              disabled={formDataDog.personality?.includes(
                personality as Personality
              )}
            >
              {personality}
            </option>
          ))}
        </select>
        <div>
          {(formDataDog.personality ?? []).map(
            (selectedPersonality: string, index: number) => (
              <p key={index}>
                {selectedPersonality}
                <button
                  type="button"
                  onClick={() => handleRemovePersonality(selectedPersonality)}
                >
                  x
                </button>
              </p>
            )
          )}
        </div>
        <textarea
          cols={40}
          rows={5}
          className={genericStyle.input}
          name="description"
          value={formDataDog.description}
          onChange={(e) =>
            setModalFormDataDog({ ...formDataDog, description: e.target.value })
          }
          placeholder="Description"
          required
        ></textarea>
        <button
          className={`${
            isFormValid() ? genericStyle.button : genericStyle.button_disabled
          }`}
        >
          Add dog
        </button>
      </form>
    </div>
  );
}
