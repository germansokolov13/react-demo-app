import create from 'zustand'
import { postingService, PostingEntity } from '../services/posting-service';

interface PostingsListState {
  postingsList: PostingEntity[];

  isLoading: Boolean;

  loadLatest: () => Promise<void>;

  search: (query: string) => Promise<void>;
}

export const postingsListStore = create<PostingsListState>((set) => ({
  postingsList: [],

  isLoading: true,

  loadLatest: async () => {
    set({ isLoading: true });
    const postingsList = await postingService.loadLatest();
    set({ postingsList, isLoading: false });
  },

  search: async (query: string) => {
    set({ isLoading: true });
    const postingsList = await postingService.search(query);
    set({ postingsList, isLoading: false });
  }
}));
