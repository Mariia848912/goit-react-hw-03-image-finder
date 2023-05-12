import axios from 'axios';

const API_KEY = 'key=34749687-c24667fb41a83a90d303a32c4';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

export async function getPictures(searchQuery, page) {
  const url = `${BASE_URL}?${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${page}`;

  try {
    const data = await axios.get(url);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
