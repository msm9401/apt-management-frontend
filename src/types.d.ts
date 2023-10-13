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
  is_confirmed: boolean;
  is_staff: boolean;
}

export interface IFeedList {
  id: number;
  user: {
    username: string;
    profile_photo: string;
  };
  content: string;
  photos: Array;
  comments_count: number;
  created_at_string: string;
  updated_at_string: string;
}

export interface IFeedDetail {
  id: number;
  user: {
    username: string;
    profile_photo: string;
  };
  content: string;
  photos: Array;
  // only_comments: {
  //   pk: number;
  //   created_at: string;
  //   updated_at: string;
  //   content: string;
  //   username: string;
  //   profile_photo: string;
  //   recomment_count: number;
  // };
  only_comments: Array;
  created_at_string: string;
  updated_at_string: string;
}

export interface IComment {
  content: string;
  user: {
    username: string;
    profile_photo: string;
  };
  recomments: Array;
  created_at_string: string;
  updated_at_string: string;
}

export interface INotice {
  count: number;
  next: string;
  previous: string;
  results: [
    {
      id: number;
      title: string;
      created_at_string: string;
    }
  ];
  // id: number;
  // title: string;
  // created_at_string: string;
}

export interface INoticeDetail {
  id: number;
  title: string;
  content: string;
  created_at_string: string;
  updated_at_string: string;
}

export interface IPoll {
  count: number;
  next: string;
  previous: string;
  results: [
    {
      id: number;
      title: string;
      created_at_string: string;
      end_date: string;
    }
  ];
}

export interface IPollDetail {
  id: string;
  choice_list: [
    {
      title: string;
      description: string;
      votes: int;
    }
  ];
  created_at_string: string;
  title: string;
  description: string;
  end_date: string;
  status: boolean;
}

export interface IChoice {
  count: number;
  next: string;
  previous: string;
  results: [
    {
      id: number;
      title: string;
      description: string;
    }
  ];
}

export interface IChoiceDetail {
  id: number;
  title: string;
  description: string;
  question: string;
}
