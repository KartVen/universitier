import { FilterParams } from '../../shared/models/api';
import { HttpParams } from '@angular/common/http';

export const mapParameters = (
  size: number,
  page: number,
  sort: string,
  sortDirection: string,
  filterParams: FilterParams
) => {
  return new HttpParams()
    .set('size', size.toString())
    .set('page', page.toString())
    .set('sort', sort)
    .set('sort_direction', sortDirection)
    .set('filter_params', JSON.stringify(filterParams));
};
