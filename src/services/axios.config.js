import axiosInstance from "./axios";

export const axiosPost = async (
  url,
  data,
  contentType = "application/json"
) => {
  let response = {};
  try {
    const result = await axiosInstance.post(url, data, {
      headers: {
        "Content-Type": contentType,
      },
    });
    response.data = result.data;
    response.success = result.success;
    response.msg = result.msg;
  } catch (e) {
    response.success = false;
    response.msg = "something went wrong";
    response.data = e;
  }
  return response;
};

export const axiosGet = async (
  url,
  params = {},
  contentType = "application/json"
) => {
  let response = {};
  try {
    const result = await axiosInstance.get(url, {
      headers: {
        "Content-Type": contentType,
      },
      params,
    });
    response.data = result.data;
    response.success = result.success;
    response.msg = result.msg;
  } catch (e) {
    response.success = false;
    response.message = "something went wrong";
    response.data = e;
  }
  return response;
};

export const axiosPatch = async (
  url,
  data,
  params = {},
  contentType = "application/json"
) => {
  let response = {};
  try {
    const result = await axiosInstance.patch(url, data, {
      headers: {
        "Content-Type": contentType,
      },
      params,
    });
    response.data = result.data;
    response.success = result.success;
    response.msg = result.msg;
  } catch (e) {
    response.success = false;
    response.msg = "something went wrong";
    response.data = e;
  }
  return response;
};

export const axiosDelete = async (
  url,
  params = {},
  contentType = "application/json"
) => {
  let response = {};
  try {
    const result = await axiosInstance.delete(url, {
      headers: {
        "Content-Type": contentType,
      },
      params,
    });
    response.data = result.data;
    response.success = result.success;
    response.msg = result.msg;
  } catch (e) {
    response.success = false;
    response.msg = "something went wrong";
    response.data = e;
  }
  return response;
};

export const axiosPut = async (
  url,
  data,
  params = {},
  contentType = "application/json"
) => {
  let response = {};
  try {
    const result = await axiosInstance.put(url, data, {
      headers: {
        "Content-Type": contentType,
      },
      params,
    });
    response.data = result.data;
    response.success = result.success;
    response.msg = result.msg;
  } catch (e) {
    response.success = false;
    response.msg = "something went wrong";
    response.data = e;
  }
  return response;
};
