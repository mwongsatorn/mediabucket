export interface PageResult<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface BaseMedia {
  poster_path: string | null;
  overview: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  vote_average: number;
}

export interface ShortMovie extends BaseMedia {
  adult: boolean;
  release_date: string;
  original_title: string;
  title: string;
  video: boolean;
  media_type?: "movie";
}

export interface ShortMovieWithCast extends ShortMovie {
  character: string;
  credit_id: string;
  order: number;
}

export interface ShortMovieWithCrew extends ShortMovie {
  job: string;
  credit_id: string;
  department: string;
}

export interface Movie extends ShortMovie {
  belongs_to_collection: null | Record<string, string>;
  budget: number;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  homepage: string;
  imdb_id: string | null;
  production_companies: [
    {
      name: string;
      id: number;
      logo_path: string | null;
      origin_country: string;
    }
  ];
  production_countries: [
    {
      iso_3166_1: string;
      name: string;
    }
  ];
  revenue: number;
  runtime: number | null;
  spoken_languages: [
    {
      iso_639_1: string;
      name: string;
    }
  ];
  status: string;
  tagline: string | null;

  //append_to_response

  images: {
    backdrops: Image[];
    posters: Image[];
  };
  videos: {
    results: Video[];
  };
  credits: {
    cast: ShortPersonWithCast[];
    crew: ShortPersonWithCrew[];
  };
  external_ids: MovieExternalIds;
  keywords: {
    keywords: [
      {
        id: string;
        name: string;
      }
    ];
  };
  recommendations: PageResult<ShortMovie>;
}

export interface ShortSerie extends BaseMedia {
  first_air_date: string;
  origin_country: string[];
  name: string;
  original_name: string;
  media_type?: "tv";
}

export interface ShortSerieWithCast extends ShortSerie {
  character: string;
  credit_id: string;
  order: number;
}

export interface ShortSerieWithCrew extends ShortSerie {
  job: string;
  credit_id: string;
  department: string;
}

export interface Serie extends ShortSerie {
  created_by: [
    {
      id: number;
      credit_id: string;
      name: string;
      gender: number;
      profile_path: string | null;
    }
  ];
  episode_run_time: number[];
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  homepage: string;
  in_production: boolean;
  last_air_date: string;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };
  next_episode_to_air: null;
  networks: [
    {
      name: string;
      id: number;
      logo_path: string | null;
      origin_country: string;
    }
  ];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: [
    {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }
  ];
  production_countries: [
    {
      iso_3166_1: string;
      name: string;
    }
  ];
  seasons: [
    {
      air_date: string;
      episode_count: number;
      id: number;
      name: string;
      overview: string;
      poster_path: string;
      season_number: number;
    }
  ];
  spoken_languages: [
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    }
  ];
  status: string;
  tagline: string;
  type: string;

  //append_to_response

  images: {
    backdrops: Image[];
    posters: Image[];
  };
  videos: {
    results: Video[];
  };
  credits: {
    cast: ShortPersonWithCast[];
    crew: ShortPersonWithCrew[];
  };
  aggregate_credits: {
    cast: ShortPersonWithAggregateCast[];
    crew: ShortPersonWithAggregateCrew[];
  };
  external_ids: SerieExternalIds;
  keywords: {
    results: [
      {
        id: string;
        name: string;
      }
    ];
  };
  recommendations: PageResult<ShortSerie>;
}

export interface ShortPerson {
  adult: boolean;
  gender: number | null;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

export interface Person extends ShortPerson {
  birthday: string;
  deathday: string | null;
  also_known_as: string[];
  biography: string;
  place_of_birth: string | null;
  imdb_id: string;
  homepage: string;

  // append_to_response

  external_ids: PersonExternalIds;
  images: {
    profiles: Image[];
  };
  combined_credits: {
    cast: (ShortMovieWithCast | ShortSerieWithCast)[];
    crew: (ShortMovieWithCrew | ShortSerieWithCrew)[];
  };
}

export interface ShortPersonWithCast extends ShortPerson {
  credit_id: string;
  character: string;
  order: number;
}

export interface ShortPersonWithAggregateCast extends ShortPerson {
  roles: [
    {
      credit_id: string;
      character: string;
      episode_count: number;
    }
  ];
  total_episode_count: number;
  order: number;
}

export interface ShortPersonWithAggregateCrew extends ShortPerson {
  jobs: [
    {
      credit_id: string;
      job: string;
      episode_count: string;
    }
  ];
  total_episode_count: number;
  department: string;
}

export interface ShortPersonWithCrew extends ShortPerson {
  credit_id: string;
  job: string;
  department: string;
}

export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface Image {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface BaseExternalIds {
  imdb_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
}

export interface MovieExternalIds extends BaseExternalIds {
  wikidata_id: string | null;
}

export interface SerieExternalIds extends BaseExternalIds {
  freebase_id: string | null;
  freebase_mid: string | null;
  tvrage_id: number | null;
  tvdb_id: number | null;
}

export interface PersonExternalIds extends SerieExternalIds {
  tiktok_id: string | null;
  youtube_id: string | null;
}
