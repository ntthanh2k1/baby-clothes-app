export interface IFilterData {
  page: number;

  limit: number;

  search: string;

  filters: Record<string, any>;

  order_by: string;

  order_dir: 'ASC' | 'DESC' | null;
}
