export interface CategoryFormState {
  success: boolean;
  errors?: {
    name?: string[];
    slug?: string[];
    description?: string[];
    sortOrder?: string[];
    isPublished?: string[];
  };
}