/**
 * Generated by orval v6.16.0 🍺
 * Do not edit manually.
 * DOCUMENTATION
 * OpenAPI spec version: 1.0.0
 */
import { useQuery, useInfiniteQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  UseInfiniteQueryResult,
  QueryKey,
} from '@tanstack/react-query';
import type {
  DatasetListResponse,
  Error,
  GetDatasetsParams,
  DatasetResponse,
  DatasetRequest,
} from './strapi.schemas';
import { API } from '../../services/api/index';
import type { ErrorType } from '../../services/api/index';

export const getDatasets = (params?: GetDatasetsParams, signal?: AbortSignal) => {
  return API<DatasetListResponse>({ url: `/datasets`, method: 'get', params, signal });
};

export const getGetDatasetsQueryKey = (params?: GetDatasetsParams) =>
  [`/datasets`, ...(params ? [params] : [])] as const;

export const getGetDatasetsInfiniteQueryOptions = <
  TData = Awaited<ReturnType<typeof getDatasets>>,
  TError = ErrorType<Error>
>(
  params?: GetDatasetsParams,
  options?: {
    query?: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getDatasets>>, TError, TData>;
  }
): UseInfiniteQueryOptions<Awaited<ReturnType<typeof getDatasets>>, TError, TData> & {
  queryKey: QueryKey;
} => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetDatasetsQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getDatasets>>> = ({ signal, pageParam }) =>
    getDatasets({ 'pagination[page]': pageParam, ...params }, signal);

  return { queryKey, queryFn, staleTime: 10000, ...queryOptions };
};

export type GetDatasetsInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getDatasets>>>;
export type GetDatasetsInfiniteQueryError = ErrorType<Error>;

export const useGetDatasetsInfinite = <
  TData = Awaited<ReturnType<typeof getDatasets>>,
  TError = ErrorType<Error>
>(
  params?: GetDatasetsParams,
  options?: {
    query?: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getDatasets>>, TError, TData>;
  }
): UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetDatasetsInfiniteQueryOptions(params, options);

  const query = useInfiniteQuery(queryOptions) as UseInfiniteQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const getGetDatasetsQueryOptions = <
  TData = Awaited<ReturnType<typeof getDatasets>>,
  TError = ErrorType<Error>
>(
  params?: GetDatasetsParams,
  options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getDatasets>>, TError, TData> }
): UseQueryOptions<Awaited<ReturnType<typeof getDatasets>>, TError, TData> & {
  queryKey: QueryKey;
} => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetDatasetsQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getDatasets>>> = ({ signal }) =>
    getDatasets(params, signal);

  return { queryKey, queryFn, staleTime: 10000, ...queryOptions };
};

export type GetDatasetsQueryResult = NonNullable<Awaited<ReturnType<typeof getDatasets>>>;
export type GetDatasetsQueryError = ErrorType<Error>;

export const useGetDatasets = <
  TData = Awaited<ReturnType<typeof getDatasets>>,
  TError = ErrorType<Error>
>(
  params?: GetDatasetsParams,
  options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getDatasets>>, TError, TData> }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetDatasetsQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const postDatasets = (datasetRequest: DatasetRequest) => {
  return API<DatasetResponse>({
    url: `/datasets`,
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: datasetRequest,
  });
};

export const getPostDatasetsMutationOptions = <
  TError = ErrorType<Error>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postDatasets>>,
    TError,
    { data: DatasetRequest },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postDatasets>>,
  TError,
  { data: DatasetRequest },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postDatasets>>,
    { data: DatasetRequest }
  > = (props) => {
    const { data } = props ?? {};

    return postDatasets(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostDatasetsMutationResult = NonNullable<Awaited<ReturnType<typeof postDatasets>>>;
export type PostDatasetsMutationBody = DatasetRequest;
export type PostDatasetsMutationError = ErrorType<Error>;

export const usePostDatasets = <TError = ErrorType<Error>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postDatasets>>,
    TError,
    { data: DatasetRequest },
    TContext
  >;
}) => {
  const mutationOptions = getPostDatasetsMutationOptions(options);

  return useMutation(mutationOptions);
};
export const getDatasetsId = (id: number, signal?: AbortSignal) => {
  return API<DatasetResponse>({ url: `/datasets/${id}`, method: 'get', signal });
};

export const getGetDatasetsIdQueryKey = (id: number) => [`/datasets/${id}`] as const;

export const getGetDatasetsIdInfiniteQueryOptions = <
  TData = Awaited<ReturnType<typeof getDatasetsId>>,
  TError = ErrorType<Error>
>(
  id: number,
  options?: {
    query?: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getDatasetsId>>, TError, TData>;
  }
): UseInfiniteQueryOptions<Awaited<ReturnType<typeof getDatasetsId>>, TError, TData> & {
  queryKey: QueryKey;
} => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetDatasetsIdQueryKey(id);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getDatasetsId>>> = ({ signal }) =>
    getDatasetsId(id, signal);

  return { queryKey, queryFn, enabled: !!id, staleTime: 10000, ...queryOptions };
};

export type GetDatasetsIdInfiniteQueryResult = NonNullable<
  Awaited<ReturnType<typeof getDatasetsId>>
>;
export type GetDatasetsIdInfiniteQueryError = ErrorType<Error>;

export const useGetDatasetsIdInfinite = <
  TData = Awaited<ReturnType<typeof getDatasetsId>>,
  TError = ErrorType<Error>
>(
  id: number,
  options?: {
    query?: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getDatasetsId>>, TError, TData>;
  }
): UseInfiniteQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetDatasetsIdInfiniteQueryOptions(id, options);

  const query = useInfiniteQuery(queryOptions) as UseInfiniteQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const getGetDatasetsIdQueryOptions = <
  TData = Awaited<ReturnType<typeof getDatasetsId>>,
  TError = ErrorType<Error>
>(
  id: number,
  options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getDatasetsId>>, TError, TData> }
): UseQueryOptions<Awaited<ReturnType<typeof getDatasetsId>>, TError, TData> & {
  queryKey: QueryKey;
} => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetDatasetsIdQueryKey(id);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getDatasetsId>>> = ({ signal }) =>
    getDatasetsId(id, signal);

  return { queryKey, queryFn, enabled: !!id, staleTime: 10000, ...queryOptions };
};

export type GetDatasetsIdQueryResult = NonNullable<Awaited<ReturnType<typeof getDatasetsId>>>;
export type GetDatasetsIdQueryError = ErrorType<Error>;

export const useGetDatasetsId = <
  TData = Awaited<ReturnType<typeof getDatasetsId>>,
  TError = ErrorType<Error>
>(
  id: number,
  options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getDatasetsId>>, TError, TData> }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetDatasetsIdQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const putDatasetsId = (id: number, datasetRequest: DatasetRequest) => {
  return API<DatasetResponse>({
    url: `/datasets/${id}`,
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    data: datasetRequest,
  });
};

export const getPutDatasetsIdMutationOptions = <
  TError = ErrorType<Error>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putDatasetsId>>,
    TError,
    { id: number; data: DatasetRequest },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof putDatasetsId>>,
  TError,
  { id: number; data: DatasetRequest },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof putDatasetsId>>,
    { id: number; data: DatasetRequest }
  > = (props) => {
    const { id, data } = props ?? {};

    return putDatasetsId(id, data);
  };

  return { mutationFn, ...mutationOptions };
};

export type PutDatasetsIdMutationResult = NonNullable<Awaited<ReturnType<typeof putDatasetsId>>>;
export type PutDatasetsIdMutationBody = DatasetRequest;
export type PutDatasetsIdMutationError = ErrorType<Error>;

export const usePutDatasetsId = <TError = ErrorType<Error>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putDatasetsId>>,
    TError,
    { id: number; data: DatasetRequest },
    TContext
  >;
}) => {
  const mutationOptions = getPutDatasetsIdMutationOptions(options);

  return useMutation(mutationOptions);
};
export const deleteDatasetsId = (id: number) => {
  return API<number>({ url: `/datasets/${id}`, method: 'delete' });
};

export const getDeleteDatasetsIdMutationOptions = <
  TError = ErrorType<Error>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteDatasetsId>>,
    TError,
    { id: number },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteDatasetsId>>,
  TError,
  { id: number },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteDatasetsId>>,
    { id: number }
  > = (props) => {
    const { id } = props ?? {};

    return deleteDatasetsId(id);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteDatasetsIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteDatasetsId>>
>;

export type DeleteDatasetsIdMutationError = ErrorType<Error>;

export const useDeleteDatasetsId = <TError = ErrorType<Error>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteDatasetsId>>,
    TError,
    { id: number },
    TContext
  >;
}) => {
  const mutationOptions = getDeleteDatasetsIdMutationOptions(options);

  return useMutation(mutationOptions);
};
