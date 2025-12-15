export interface IPaginateData<T> {
  data: T[];

  page: number;

  limit: number;

  total_records: number;

  total_pages: number;

  has_prev: boolean;

  has_next: boolean;
}

export const paginate = (
  data: any,
  page: number,
  limit: number,
  totalRecords: number,
) => {
  const totalPages = Math.ceil(totalRecords / limit);

  return {
    data,
    page,
    limit,
    total_records: totalRecords,
    total_pages: totalPages,
    has_prev: page > 1,
    has_next: page < totalPages,
  };
};
