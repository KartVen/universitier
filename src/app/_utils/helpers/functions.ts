import { FilterParams } from '../../shared/models/api';
import { HttpParams } from '@angular/common/http';

export const mapParams = (
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

export const mapArgsParams = (
  ...paramsArgs: { param: string; value: string | undefined | null }[]
) => {
  const params = new HttpParams();
  paramsArgs.forEach(({ param, value }) => {
    if (value) params.set(param, value);
  });
  return params;
};
