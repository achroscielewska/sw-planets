export interface PlanetsDto {
  count: number;
  previous: string;
  next: string;
  results: Planet[];
}

export interface Planet {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: [];
  films: [];
  url: string;
  created: string;
  edited: string;
}
