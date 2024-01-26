import { useRef, useEffect } from 'react';

import style from './maps.module.scss';

interface MapProps {
  address: string;
  province: string;
}

function Map({ address, province }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.google) {
      const map = new window.google.maps.Map(mapRef.current!, {
        zoom: 15,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      });

      const geocoder = new window.google.maps.Geocoder();

      const finalAddress = `${address}, ${province}, Spain`;

      geocoder.geocode({ address: finalAddress }, (results: any, status) => {
        if (status === 'OK' && results[0]) {
          map.setCenter(results[0].geometry.location);

          new window.google.maps.Marker({
            map,
            position: results[0].geometry.location!,
          });
        } else {
          console.error('Error al geocodificar la dirección:', status);
        }
      });
    }
  }, [address]);

  console.log('maps');

  return <div ref={mapRef} className={style.map} />;
}

export default Map;
