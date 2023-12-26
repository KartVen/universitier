export type ApiError = {
  status: string;
  message: string;
};

export type FilterParams = {
  phrase?: string;
};

export interface ApiFilters {
  sortField: string;
  sortDirection: 'ASC' | 'DESC';
  filterParams: FilterParams;
}
