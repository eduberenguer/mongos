import { useState, ChangeEvent } from 'react';
import { Dog, Size } from '../../models/dog.type';
import { handleImageUpload } from '../../cloudinary';

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
  const [formDataDog, setFormDataDog] = useState<Partial<Dog>>({
    name: '',
    age: '',
    size: '',
    chipNumber: 0,
    hasBreed: false,
    breed: undefined,
    description: '',
    image: undefined,
  });

  const handleHasBreedChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormDataDog({
      ...formDataDog,
      hasBreed: event.target.value === 'true',
    });
  };

  const isFormValid = () => {
    const { name, age, size, chipNumber, hasBreed, breed, description, image } =
      formDataDog;
    if (
      name &&
      age &&
      size &&
      chipNumber &&
      description &&
      image &&
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
    setFormDataDog((prevState) => ({
      ...prevState,
      image: imageUrl || '',
    }));
  };

  return (
    <>
      <form onSubmit={(e) => handleAddDog(e, formDataDog)}>
        <input
          type="text"
          name="name"
          value={formDataDog.name}
          onChange={(e) =>
            setFormDataDog({ ...formDataDog, name: e.target.value })
          }
          placeholder="Name"
        />
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleImageUploadChange}
        />
        <input
          type="text"
          name="age"
          value={formDataDog.age}
          onChange={(e) =>
            setFormDataDog({ ...formDataDog, age: e.target.value })
          }
          placeholder="Age"
        />
        <input
          type="text"
          name="size"
          value={formDataDog.size}
          onChange={(e) =>
            setFormDataDog({ ...formDataDog, size: e.target.value as Size })
          }
          placeholder="Size"
        />
        <input
          type="number"
          name="chipNumber"
          value={formDataDog.chipNumber}
          onChange={(e) =>
            setFormDataDog({
              ...formDataDog,
              chipNumber: parseInt(e.target.value),
            })
          }
          placeholder="ChipNumber"
        />
        <label>
          <input
            type="radio"
            name="hasBreed"
            value="true"
            checked={formDataDog.hasBreed}
            onChange={handleHasBreedChange}
          />{' '}
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="hasBreed"
            value="false"
            checked={!formDataDog.hasBreed}
            onChange={handleHasBreedChange}
          />{' '}
          No
        </label>
        {formDataDog.hasBreed && (
          <input
            type="text"
            name="breed"
            value={formDataDog.breed}
            onChange={(e) =>
              setFormDataDog({ ...formDataDog, breed: e.target.value })
            }
            placeholder="Breed"
          />
        )}
        <input
          type="text"
          name="description"
          value={formDataDog.description}
          onChange={(e) =>
            setFormDataDog({ ...formDataDog, description: e.target.value })
          }
          placeholder="Description"
        />
        <button disabled={!isFormValid()}>Add dog</button>
      </form>
      <button type="submit" onClick={handlerFormDog}>
        Close form
      </button>
    </>
  );
}
