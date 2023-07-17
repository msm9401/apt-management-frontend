export interface IApartmentList {
  pk: number;
  address_do: string;
  address_si: string;
  address_dong: string;
  address_li: string;
  kapt_name: string;
}

export interface IUser {
  apt_number: string;
  username: string;
  date_joined: string;
  name: string;
  email: string;
  house_number: string;
  last_login: string;
  my_houses: IApartmentList[];
  phone_number: string;
  profile_photo: string;
}

export interface IFeedList {
  pk: number;
  user: {
    username: string;
    profile_photo: string;
  };
  content: string;
  photos: {
    pk: number;
    file: string;
  };
  comments_count: number;
  created_at: string;
  updated_at: string;
}
