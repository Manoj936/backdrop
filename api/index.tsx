import axios from "axios";
const BASE_URL: string = `${process.env.EXPO_PUBLIC_API_URL}?key=${process.env.EXPO_PUBLIC_API_KEY}`;
export const formatURI = (params: any) => {
console.log(params, "params")
  let url = BASE_URL + "&per_page=25&safesearch=true&editors_choise=true";
  if (!params) {
    return url;
  }

  let paramKeys = Object.keys(params);

  paramKeys.map((key) => {
    let val = key === "q" ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${val}`;
  });
  console.log("final url #️⃣#️⃣#️⃣#️⃣", url);
  return url;
};

export const getDataUsingAsyncAwaitGetCall = async (params: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const headers = {
        "Content-Type": "application/json; charset=UTF-8",
      };
      const response = await axios.get(formatURI(params), { headers: headers });
    
      resolve(response.data);
    } catch (error: any) {
      // handle error
      console.log(error);
      reject(error.message);
    }
  });
};
