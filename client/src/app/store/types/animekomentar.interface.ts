import { EntityState } from '@ngrx/entity';
import { AnimeKomentar, AnimeKomentarModel } from './animekomentar.module';

export interface AnimeKomentarState extends EntityState<AnimeKomentarModel> {
  isLoading: boolean;
  error: string | null;
  update: boolean;
}
