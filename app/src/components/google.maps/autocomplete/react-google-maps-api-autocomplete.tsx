/// <reference types="google.maps" />
import { useEffect, useRef, useState } from 'react';

import style from '../../register.form/shelter.form/shelter.form.module.scss';
import genericStyles from '../../../app/app.module.scss';

let autoComplete: google.maps.places.Autocomplete;

function Autocomplete({ handleAddressChange }: { handleAddressChange: any }) {
  const ref = useRef<HTMLInputElement>(null);
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    if (ref.current) {
      autoComplete = new google.maps.places.Autocomplete(ref.current, {
        types: ['address'],
        fields: ['formatted_address'],
      });

      autoComplete.addListener('place_changed', () => {
        const { formatted_address } = autoComplete.getPlace();
        setAddress(formatted_address as string);
        handleAddressChange(formatted_address);
      });
    }
  }, [handleAddressChange]);

  console.log('autocomplete');

  return (
    <input
      type="text"
      className={`${genericStyles.input} ${style.input}`}
      ref={ref}
      placeholder="Address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
    />
  );
}

export default Autocomplete;
