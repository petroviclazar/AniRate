import { EntityState } from '@ngrx/entity';
import { Anime, AnimeModel } from './anime.module';

export interface AnimeiState extends EntityState<AnimeModel> {
  isLoading: boolean;
  error: string | null;
  update: boolean;
}
