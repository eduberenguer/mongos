import { useState, ChangeEvent } from 'react';
import { Dog, Personality, Size } from '../../models/dog.type';
import { optionsSize } from './form.options/size.options';
import { optionsPersonality } from './form.options/personality.options';

import style from './dog.form.module.scss';
import genericStyle from '../../app/app.module.scss';
import { isFormDogValid } from './validate/isFormDogValid';

export default function DogForm({
  handlerFormDog,
  handleAddDog,
  handleUpdateDog,
  dataUpdateDog,
}: {
  handlerFormDog: () => void;
  handleAddDog: (
    e: React.FormEvent<HTMLFormElement>,
    formDataDog: Partial<Dog>
  ) => void;
  handleUpdateDog: (
    e: React.FormEvent<HTMLFormElement>,
    formDataDog: Partial<Dog>
  ) => void;
  dataUpdateDog: Partial<Dog>;
}) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formDataDog, setModalFormDataDog] = useState<Partial<Dog>>({
    name: dataUpdateDog.name || undefined,
    gender: dataUpdateDog.gender || undefined,
    years: dataUpdateDog.years || undefined,
    months: dataUpdateDog.months || undefined,
    size: dataUpdateDog.size || undefined,
    chipNumber: dataUpdateDog.chipNumber || undefined,
    hasBreed: dataUpdateDog.hasBreed || false,
    breed: dataUpdateDog.breed || undefined,
    description: dataUpdateDog.description || undefined,
    image: dataUpdateDog.image || null,
    personality: dataUpdateDog.personality || [],
  });

  const handleHasBreedChange = (event: ChangeEvent<HTMLInputElement>) => {
    setModalFormDataDog({
      ...formDataDog,
      hasBreed: event.target.value === 'true',
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setModalFormDataDog({
        ...formDataDog,
        image: file,
      });
    }
  };

  const handlePersonalityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const personality = formDataDog.personality || [];
    if (event.target.checked) {
      setModalFormDataDog({
        ...formDataDog,
        personality: [...personality, event.target.value as Personality],
      });
    } else {
      setModalFormDataDog({
        ...formDataDog,
        personality: personality.filter(
          (personality) => personality !== event.target.value
        ),
      });
    }
  };

  const handleDogSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dataUpdateDog.id) {
      handleUpdateDog(e, formDataDog);
    } else {
      handleAddDog(e, formDataDog);
    }
  };

  return (
    <div className={style.container_dog_form}>
      <form className={style.dog_form} onSubmit={handleDogSubmit}>
        <button
          className={`${genericStyle.button} ${style.cancel_button}`}
          onClick={handlerFormDog}
        >
          x
        </button>
        <h2>{dataUpdateDog.id ? 'Update dog' : 'Add new dog'}</h2>
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
        <div className={style.gender}>
          <label>
            Male
            <input
              type="radio"
              name="gender"
              value="male"
              defaultChecked={formDataDog.gender === 'male' ? true : false}
              onChange={(e) =>
                setModalFormDataDog({ ...formDataDog, gender: e.target.value })
              }
            />{' '}
          </label>
          <label>
            Female
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={(e) =>
                setModalFormDataDog({ ...formDataDog, gender: e.target.value })
              }
            />{' '}
          </label>
        </div>
        <div className={style.age}>
          <input
            className={genericStyle.input}
            type="number"
            name="years"
            min={0}
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
            min={1}
            max={12}
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
            onChange={handleImageChange}
          />
          {imagePreview && (
            <img
              className={style.loadingImage}
              src={imagePreview}
              alt="Preview1"
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
          <p>{formDataDog.chipNumber?.toString().length}/15</p>
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
        <div className={style.container_personality}>
          <div className={style.personalities}>
            {optionsPersonality.map((personality: Personality) => (
              <div key={personality}>
                <input
                  type="checkbox"
                  name="personality"
                  value={personality}
                  onChange={handlePersonalityChange}
                  defaultChecked={formDataDog.personality?.includes(
                    personality
                  )}
                  required
                  disabled={
                    formDataDog.personality?.length === 3 &&
                    !formDataDog.personality?.includes(personality)
                  }
                />
                <label htmlFor="">{personality}</label>
              </div>
            ))}
          </div>
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
            isFormDogValid(formDataDog)
              ? genericStyle.button
              : genericStyle.button_disabled
          }`}
        >
          {dataUpdateDog.id ? 'Update dog' : 'Add dog'}
        </button>
      </form>
    </div>
  );
}
