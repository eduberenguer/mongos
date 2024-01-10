import { useState, ChangeEvent } from 'react';
import { Dog, Personality, Size } from '../../models/dog.type';
import { handleImageUpload } from '../../utils/cloudinary';
import { optionsSize } from './form.options/size.options';
import { optionsPersonality } from './form.options/personality.options';

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
  const [formDataDog, setModalFormDataDog] = useState<Partial<Dog>>({
    name: '',
    age: '',
    size: '',
    chipNumber: undefined,
    hasBreed: false,
    breed: undefined,
    description: '',
    image: undefined,
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
      age,
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
      age &&
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

  const handleImageUploadChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imageUrl = await handleImageUpload(e);
    setModalFormDataDog((prevState) => ({
      ...prevState,
      image: imageUrl || '',
    }));
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

  console.log(formDataDog);

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
        />
        <input
          className={genericStyle.input}
          type="text"
          name="age"
          value={formDataDog.age}
          onChange={(e) =>
            setModalFormDataDog({ ...formDataDog, age: e.target.value })
          }
          placeholder="Age"
        />
        <select
          name="size"
          value={formDataDog.size}
          onChange={(e) =>
            setModalFormDataDog({
              ...formDataDog,
              size: e.target.value as Size,
            })
          }
        >
          <option value="">Select size</option>
          {optionsSize.map((size) => (
            <option key={size} value={size}>
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleImageUploadChange}
        />

        <input
          className={genericStyle.input}
          type="number"
          name="chipNumber"
          value={formDataDog.chipNumber}
          onChange={(e) =>
            setModalFormDataDog({
              ...formDataDog,
              chipNumber: parseInt(e.target.value),
            })
          }
          placeholder="ChipNumber"
        />
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
          />
        )}
        <label>Personality (max 3)</label>
        <select
          multiple
          value={formDataDog.personality}
          onChange={handlePersonalityChange}
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
