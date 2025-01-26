export interface Category {
  id: number;
  name: string;
  created: string;
  updated: string;
}

export interface CourseDetails {
  duration: number;
  rating: number;
  educatorFullName: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  created: string;
  updated: string;
  category: Category;
  courseDetails: CourseDetails;
}
