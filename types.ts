export interface Project {
  id: number;
  technologies: Technology[];
  categories: Category[];
  screenshots: Screenshot[];
  title: string;
  description: string;
  live_preview: string;
  source_code: string;
  priority_order: number;
}

export interface Category {
  id: number;
  title: string;
  name: string;
  priority_order: number;
}

export interface Screenshot {
  id?: number;
  image: File | undefined;
  priority_order: number;
  project?: number;
}

export interface Technology {
  id: number;
  name: string;
}
