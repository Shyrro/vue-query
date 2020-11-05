import { onMounted, ref } from 'vue'
import { notifyManager } from '../core/notifyManager'
import { QueryKey } from '../core/types'
import { parseFilterArgs, QueryFilters } from '../core/utils'
import { useQueryClient } from './QueryClientProvider'

export function useIsFetching(filters?: QueryFilters): number
export function useIsFetching(
  queryKey?: QueryKey,
  filters?: QueryFilters
): number
export function useIsFetching(
  arg1?: QueryKey | QueryFilters,
  arg2?: QueryFilters
): number {
  const queryClient = useQueryClient()
  const [filters] = parseFilterArgs(arg1, arg2)
  const isFetching = ref(queryClient?.isFetching(filters))

  const filtersRef = ref(filters)
  const isFetchingRef = ref(isFetching.value)

  onMounted(() =>
    queryClient?.getQueryCache().subscribe(
      notifyManager.batchCalls(() => {
        const newIsFetching = queryClient.isFetching(filtersRef.value)
        if (isFetchingRef.value !== newIsFetching) {
          isFetching.value = newIsFetching
        }
      })
    )
  )

  return isFetching.value!
}
