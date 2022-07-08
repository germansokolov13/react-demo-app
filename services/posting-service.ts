import axios from 'axios';
import config from '../env-config';
import { withAuth } from './with-auth';

const { backendAddress } = config;

export type PostingEntity = {
  _id: string,
  title?: string,
  createdAt: string,
  content?: string,
  s3Key?: string,
};

export type PostingForm = {
  title: string,
  content: string,
};

export const postingService = {
  async loadLatest(): Promise<PostingEntity[]> {
    const res = await axios.get(`${backendAddress}/postings/get-latest`);
    return res.data;
  },

  async save(formData: PostingForm): Promise<void> {
    await withAuth(axios).post(`${backendAddress}/postings/create`, formData);
  },

  async search(query: string): Promise<PostingEntity[]> {
    const res = await axios.get(`${backendAddress}/postings/search?query=${query}`);
    return res.data;
  },
}
