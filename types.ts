export interface ProjectSingle {
  id: number;
  technologies: Technology[];
  categories: Category[];
  screenshots: Screenshot[];
  title: string;
  description: string;
  livePreview: string;
  sourceCode: string;
  priorityOrder: number;
}

export interface Category {
  id: number;
  title: string;
  name: string;
  priorityOrder: number;
}

export interface Screenshot {
  id?: number;
  image: File | undefined;
  priorityOrder: number;
  project?: number;
}

export interface Technology {
  id: number;
  name: string;
}
