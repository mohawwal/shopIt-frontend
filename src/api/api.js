// // api.js
// import { createApi } from '@reduxjs/toolkit/query'
// import axiosInstance from '../axios/axios'

// const axiosBaseQuery =
//   ({ baseUrl } = { baseUrl: '' }) =>
//   async ({ url, method, data, params, headers }) => {
//     try {
//       const result = await axiosInstance({
//         url: baseUrl + url,
//         method,
//         data,
//         params,
//         headers,
//       })
//       return { data: result.data }
//     } catch (axiosError) {
//       const err = axiosError
//       return {
//         error: {
//           status: err.response?.status,
//           data: err.response?.data || err.message,
//         },
//       }
//     }
//   }

// const api = createApi({
//   baseQuery: axiosBaseQuery({
//     baseUrl: 'http://localhost:4000',
//   }),
//   endpoints(build) {
//     return {
//       query: build.query({ query: () => ({ url: '/query', method: 'get' }) }),
//       mutation: build.mutation({
//         query: () => ({ url: '/mutation', method: 'post' }),
//       }),
//     }
//   },
// })

// export default api