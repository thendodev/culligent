//NOTE :  interceptors are global request/response confiugurations a

import { setLoading } from '@/app/state/loading-state';
import { toast } from '@/components/ui/use-toast';
import { ClientErrorResponse } from '@/global/response.types';
import { privateRequest } from '@/lib/requests';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

export const useAxiosInterceptors = () => {
  useEffect(() => {
    const requestInterceptor = () =>
      privateRequest.interceptors.request.use(
        (config: any) => {
          console.log('here');
          // Do something before request is sent
          setLoading(true);
          return config;
        },
        (error: AxiosError<ClientErrorResponse>) => {
          setLoading(false);
          toast({
            title: `Status ${error.response?.status}`,
            description: error.response?.data.message,
          });
          return Promise.reject(error);
        },
      );

    const responseInterceptor = () =>
      privateRequest.interceptors.response.use(
        (response: any) => {
          console.log('here');

          // Do something with response data
          setLoading(false);
          if (response instanceof AxiosError) {
            toast({
              title: `Status ${response.status}`,
              description: response.response?.data.message,
            });
          }
          return response;
        },
        (error: AxiosError<ClientErrorResponse>) => {
          setLoading(false);
          toast({
            title: `Status ${error.response?.status}`,
            description: error.response?.data.message,
          });
          return Promise.reject(error);
        },
      );

    const requests = requestInterceptor();
    const responses = responseInterceptor();

    return () => {
      privateRequest.interceptors.request.eject(requests);
      privateRequest.interceptors.response.eject(responses);
    };
  }, []);
};
