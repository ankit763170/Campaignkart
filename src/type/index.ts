export interface IUser {
  addedBy: string; // Example type assuming addedBy is a user ID, change it according to your needs
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
  _id?: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  coverImage: string;
  category: { name: string };
  slug: string;
  token?: string;
  createdAt: string; // Assuming it's a date string
  createdBy: { name: string };
  comments?: IComments[];
}

export interface IUpdateBlogs {
  _id?: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  coverImage: string;
  slug: string;
  token?: string;
}

export interface IComments {
  _id?: string;
  name: string;
  message: string;
  createdAt: string; // Assuming it's a date string
  blog: { _id?: string; title: string; slug: string };
  replies?: IComments[];
}
