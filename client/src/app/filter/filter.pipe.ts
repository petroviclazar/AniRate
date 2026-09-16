import { Pipe, PipeTransform } from '@angular/core';
import { AnimeModel } from '../store/types/anime.module';
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: AnimeModel[] | null, searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter((item) =>
      item.name?.toLowerCase().includes(searchText)
    );
  }
}
