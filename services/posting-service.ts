import axios from 'axios';
import config from '../env-config';

const { backendAddress } = config;

export type PostingEntity = {
  _id: string,
  title: string,
  content: string,
};

export type PostingForm = {
  title: string,
  content: string,
};

export async function getPostingsListBothSides(): Promise<PostingEntity[]> {
  return (await axios.get(`${backendAddress}/postings/get-list`)).data;
}

export class PostingService {
  async save(formData: PostingForm): Promise<void> {
    await axios.post(`${backendAddress}/postings/create`, formData);
  }

  async search(query: string): Promise<PostingEntity[]> {
    return (await axios.get(`${backendAddress}/postings/search?query=${query}`)).data;
  }
}
