import { bussiness } from '../../constant';

export const getStatistic = payload => ({
    type: bussiness.GET_STATISTIC,
    payload
})

export const searchRevenue = payload => ({
    type: bussiness.SEARCH_REVENUE,
    payload
})


