export interface PlanetsDto {
  count: number;
  previous: string;
  next: string;
  results: PlanetDto[];
}

export interface PlanetDto {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: string[];
  films: string[];
  url: string;
  created: string;
  edited: string;
}

export interface PersonDto {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  vehicles: string[];
  starships: string[];
  url: string;
}

export interface FilmsDto {
  title: string;
  episode_id: string;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  films: string[];
  characters: string;
  starships: string;
  species: string;
  vehicles: string;
  created: string;
  edited: string;
  url: string;
}
