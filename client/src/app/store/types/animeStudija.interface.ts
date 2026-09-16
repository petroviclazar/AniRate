import { EntityState } from '@ngrx/entity';
import { AnimeStudioModel } from './animestudio.module';

export interface AnimeStudijaState extends EntityState<AnimeStudioModel> {
  isLoading: boolean;
  error: string | null;
  update: boolean;
}
