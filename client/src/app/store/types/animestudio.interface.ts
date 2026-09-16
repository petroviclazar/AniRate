import { AnimeStudioModel } from './animestudio.module';

export interface AnimeStudioState {
  isLoading: boolean;
  animeStudio: AnimeStudioModel | null;
  error: string | null;
}
