export type PageMeta = {
  page: number;
  perPage: number;
  total: number;
  pageCount: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export function normalizePagination(query: any) {
  const page = Math.max(parseInt(query?.page ?? '1', 10) || 1, 1);
  const perPageRaw = parseInt(query?.perPage ?? '20', 10) || 20;
  const perPage = Math.min(Math.max(perPageRaw, 1), 100);

  const skip = (page - 1) * perPage;
  const take = perPage;

  return { page, perPage, skip, take };
}

export function buildMeta(page: number, perPage: number, total: number): PageMeta {
  const pageCount = Math.max(Math.ceil(total / perPage), 1);
  return {
    page,
    perPage,
    total,
    pageCount,
    hasNext: page < pageCount,
    hasPrev: page > 1,
  };
}
