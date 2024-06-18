import axios from "axios";
import accessToken from "./jwt-token-access/accessToken";
import * as url from "./url_helper";

//pass new generated access token here
const token = accessToken;
console.log("token")
console.log(token)

//apply base url for axios
const API_URL = url.base_url

console.log(API_URL);

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.defaults.headers.common["Authorization"] = token;

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

// export async function get(url, config = {}) {
//   return await axiosApi
//     .get(url, { ...config })
//     .then((response) => response.data);
// }

export async function get(url,config = {}) {
  try {
    const response = await axiosApi.get(url, { ...config });
    return response;
  } catch (error) {
    throw error;
  }
}

// export async function post(url, data, config = {}) {
//   return axiosApi
//     .post(url, { ...data }, { ...config })
//     .then((response) => response.data);
// }


// export async function post(url, data, config = {}) {
//   try {
//     const response = await axiosApi.post(url, { ...data }, { ...config });
//     return response;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function post(url, data, config = {}) {
//   try {
//     const headers = {
//       'Content-Type': 'multipart/form-data',
//       ...config.headers // Merge with any existing headers
//     };

//     const response = await axiosApi.post(url, data, { ...config, headers });
//     return response;
//   } catch (error) {
//     throw error;
//   }
// }

export async function post(url, data, config = {}) {
  try {
    let headers;
    let postData;

    // Check the type of data
    if (data instanceof FormData) {
      headers = {
        'Content-Type': 'multipart/form-data',
        ...config.headers // Merge with any existing headers
      };
      postData = data;
    } else {
      headers = {
        'Content-Type': 'application/json',
        ...config.headers // Merge with any existing headers
      };
      postData = data;
    }

    const response = await axiosApi.post(url, postData, { ...config, headers });
    return response;
  } catch (error) {
    throw error;
  }
}


// export async function put(url, data, config = {}) {
//   return axiosApi
//     .put(url, { ...data }, { ...config })
//     .then((response) => response.data);
// }


export async function put(url, data, config = {}) {
  try {
    const response = await axiosApi.put(url, { ...data }, { ...config});
    return response;
  } catch (error) {
    throw error;
  }
}



// export async function del(url, config = {}) {
//   return await axiosApi
//     .delete(url, { ...config })
//     .then((response) => response.data);
// }


export async function del(url, config = {}) {
  try {
    const response = await axiosApi.delete(url, { ...config});
    return response;
  } catch (error) {
    throw error;
  }
  // return await axiosApi
  //   .delete(url, { ...config })
  //   .then((response) => response.data);
}
