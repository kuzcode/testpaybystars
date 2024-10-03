export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IOption {
  value: string;
  label: string;
}

export interface ILatLng {
  lat: number;
  lng: number;
}

export interface IUploadImage {
  id: number;
  url: File;
}

export interface IGetCityProps {
  address: {
    city: string;
    country: string;
    country_code: string;
  };
  name: string;
}

export interface IWorldCountry {
  code: string;
  language: string;
  name: string;
}

export interface IWorldCity {
  countryCode: string;
  id: number;
  language: string;
  name: string;
  nameLocale: null;
}
