import create from 'zustand';
import { postingService, PostingEntity } from '../services/posting-service';

interface PostingsListState {
  postingsList: PostingEntity[];

  isLoading: Boolean;

  loadLatest: () => Promise<void>;

  empty: () => void;

  removeFromList: (postingId: string) => void;

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

  empty: () => {
    set({ postingsList: [], isLoading: false });
  },

  removeFromList: (postingId: string) => {
    set((state) => {
      const { postingsList } = state;
      const reducedList = postingsList.filter((posting) => posting._id !== postingId);

      return { postingsList: reducedList };
    });
  },

  search: async (query: string) => {
    set({ isLoading: true });
    const postingsList = await postingService.search(query);
    set({ postingsList, isLoading: false });
  },
}));
