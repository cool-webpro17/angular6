import { Category } from '../store/category';

export interface AppState {
  readonly category: Category[];
}