export interface IUser {
  addedBy: string;
  _id?: string;
  name: string;
  email: string;
  password: string;
  token?: string;
}

export interface ICases {
  _id?: string;
  title: string;
  year: string;
  timeframe: string;
  mainService: string;
  extraService: string;
  returnOnInvestment: string;
  description: string;
  coverImage: string;
  token?: string;
}

export interface ICategories {
  _id?: string;
  name: string;
}

export interface IServices {
  _id?: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  coverImage: string;
  icon: string;
  token?: string;
}

export interface IBlogs {
  [x: string]: any;
  cover_image: string ;
  _id?: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  coverImage: string;
  slug: string;

}

export interface IUpdateBlogs {
  _id?: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  coverImage: string;
  slug: string;

}

export interface IComments {
  _id?: string;
  name: string;
  message: string;
  createdAt: string;
  blog: {
    _id?: string;
    title: string;
    slug: string;
  };
  replies?: IComments[];
}
