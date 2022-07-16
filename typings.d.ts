export interface Category {
  _id: string;
  title: string;
  name: string;
  priorityOrder: number;
}

export interface Screenshot {
  _id?: string;
  image: string;
  priorityOrder: number;
  project?: number;
}

export interface Technology {
  _id: string;
  name: string;
}
export interface Project {
  _id: string;
  technologies: Technology[];
  categories: Category[];
  screenshots: Screenshot[];
  title: string;
  description: string;
  livePreview: string;
  sourceCode: string;
  priorityOrder: number;
}
