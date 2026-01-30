export interface PlaceResult {
  formatted_address?: string;
  geometry?: { location: { lat: () => number; lng: () => number } };
  name?: string;
}

declare global {
  interface Window {
    google?: {
      maps: {
        places: {
          Autocomplete: new (
            input: HTMLInputElement,
            opts?: { bounds?: unknown; componentRestrictions?: { country: string | string[] }; types?: string[] }
          ) => {
            addListener: (event: string, fn: () => void) => void;
            getPlace: () => PlaceResult;
          };
        };
      };
    };
  }
}

export {};
