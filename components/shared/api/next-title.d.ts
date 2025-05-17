import { ReactNode } from "react";
import { SwiperOptions } from "swiper/types";

interface TitleRating {
  rating?: object;
  kp?: string;
  imdb?: string;
  rt?: string;
  averageRating?: ReactNode;
  average_All?: string;
}

export interface Person {
  id: number;
  photo: string;
  name: string;
  enName: string | null;
  description: string | null;
  profession: string;
  enProfession: string;
}

type Similar = {
  id: string;
  photo: string;
  name: string;
  enName: string | null;
  description: string | null;
  profession: string;
  enProfession: string;
  poster?: { url: string; previewUrl: string };
};

type Details = {
  style?: {
    swiper: string;
    swiper_wrapper: string;
    swiper_info: string;
  };
  href?: string | null;
  Kinobox?: any;
  className?: string;
  option?: any;
  responseData?: any[];

  data?: any;
  details?: any;
  detailsData?: any;

  person?: Person[];
  similar?: any;
  trailers?: any;

  [key: string]: any;
  index?: number;
  id?: any;
  type?: string;

  name?: string;
  alternativeName?: string;
  enName?: string;
  countries?: string | { name: string }[];
  year?: any;
  length?: any;
  movieLength?: number;
  genres?: string | { name: string }[];
  sDescription?: string;
  description?: string;

  logo?: { url: any };
  poster?: { url: any; previewUrl: any };
  backdrop?: { url: any; previewUrl: any };

  rating?: TitleRating;
  vote?: any;

  total?: number;
  limit?: number;
  page?: number;
  pages?: number;
};
