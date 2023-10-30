import axios from 'axios';
const API_KEY = '38386717-8fe577dd1ca73c2d4057f199b'

export const fetchImage = async (query, page) => {
    const response = await axios.get(`https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
    return response.data;
}