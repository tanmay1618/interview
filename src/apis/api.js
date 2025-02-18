import Cookies from 'js-cookie';
import { API_URL } from '../constants';
import axios from 'axios';

export const insertData = async (table,data) => {
    const userCookie = Cookies.get('userId');
    try {
        const config = {
            method: "POST",
            url: `${API_URL}/api/${table}`,
            headers: {
              Authorization: userCookie,
            },
            mode: "no-cors",
            data: data
          };
        const response = await axios(config)
        return response.data
    } catch (error) {
        //console.error('Error logging in:', error.response ? error.response.data : error.message);
    }
}

export const getList = async (table,filters) => {
    //console.log("filters",filters);
    const userCookie = Cookies.get('userId');
    const queryString = new URLSearchParams(filters).toString();
    try {
        const config = {
            method: "GET",
            url: `${API_URL}/api/${table}?${queryString}`,
            headers: {
              Authorization: userCookie
            },
            mode: "no-cors",
            data: filters
          };
        const response = await axios(config)
        return response.data
    } catch (error) {
        //console.error('Error logging in:', error.response ? error.response.data : error.message);
    }
}

export const updateData = async (table, id, data) => {
    const userCookie = Cookies.get('userId');
    try {
        const config = {
            method: "PUT",
            url: `${API_URL}api/${table}/${id}`,
            headers: {
              Authorization: userCookie
            },
            mode: "no-cors",
            data: data
          };
        const response = await axios(config)
        return response.data
    } catch (error) {
        //console.error('Error logging in:', error.response ? error.response.data : error.message);
    }

}

export const deleteData = async (table, id) => {
    const userCookie = Cookies.get('userId');
    try {
        const config = {
            method: "DELETE",
            url: `${API_URL}/${table}/${id}`,
            headers: {
              Authorization: userCookie,
            },
            mode: "no-cors"
          };
        const response = await axios(config)
        return response.data
    } catch (error) {
        //console.error('Error logging in:', error.response ? error.response.data : error.message);
    }
}

export const getAnalyticsData = async (botId)=>{
  //console.log("calling")
  const userCookie = Cookies.get('userId');
  const data = {"bot_id" : botId }
  try {
      const config = {
          method: "POST",
          url: `${API_URL}/analytics`,
          headers: {
            Authorization: userCookie,
          },
          mode: "no-cors",
          data: data
        };
      const response = await axios(config)
      return response.data
  } catch (error) {
      //console.error('Error logging in:', error.response ? error.response.data : error.message);
  }
}

export const handleUpload = async (file, bot_id) => {
  //console.log("handleUploadapi")
  if (!file) {
    //console.log("Please select a file first.");
    return;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('bot_id', bot_id);
  const userCookie = Cookies.get('userId');
  //console.log("userCookie",userCookie)
   try {
     const response = await axios.post(`${API_URL}/uploadv2`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': userCookie,
      },
     });

      //console.log(`File uploaded successfully: ${response.data.filename}`);
      return(response.data.filename);
  } catch (error) {
      //console.error('Error uploading file:', error);
      //console.log('Error uploading file');
  }
};

/*
const handleDownload = async (filename) => {
  try {
      const response = await axios.get(`${API_URL}/download/${filename}`, {
          responseType: 'blob', // Ensure Axios handles binary data
      });

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      return(blob);
  } catch (error) {
      console.error('Error downloading file:', error);
      alert('Error downloading file');
  }
};
*/