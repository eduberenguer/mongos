import { useRef, useEffect } from 'react';
import { googleMapsApiKey } from '../../../config';

import style from './maps.module.scss';

interface MapProps {
  address: string;
  province: string;
}

function Map({ address, province }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        initializeMap();
      };
    };

    const initializeMap = () => {
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
    };

    loadGoogleMapsScript();
  }, [address]);

  return <div ref={mapRef} className={style.map} />;
}

export default Map;
