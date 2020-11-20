import react from 'react';
import { PostingService } from './posting-service';

export class ServiceLocator {
  postingService: PostingService = new PostingService();
}

export const ServiceLocatorContext = react.createContext<ServiceLocator>(undefined);
