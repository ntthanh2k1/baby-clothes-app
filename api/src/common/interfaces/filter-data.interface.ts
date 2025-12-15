export interface IFilterData {
  page: number;

  limit: number;

  search: string;

  search_columns: string[];

  filters: Record<string, any>;

  order_by: string;

  order_dir: 'ASC' | 'DESC' | null;
}
