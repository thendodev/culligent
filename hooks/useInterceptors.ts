//NOTE :  interceptors are global request/response confiugurations a

import { setLoading } from '@/app/state/loading-state';
import { toast } from '@/components/ui/use-toast';
import { privateRequest } from '@/lib/requests';
import { useEffect } from 'react';

export const useAxiosInterceptors = () => {
  useEffect(() => {
    const controller = new AbortController();

    const requestInterceptor = () =>
      privateRequest.interceptors.request.use(
        (config) => {
          // Do something before request is sent
          setLoading(true);
          config.signal = controller.signal;
          return config;
        },
        (error) => {
          // Do something with request error
          return Promise.reject(error);
        },
      );

    const responseInterceptor = () =>
      privateRequest.interceptors.response.use(
        (response) => {
          // Do something with response data
          setLoading(false);
          return response;
        },
        ({ response }) => {
          // Do something with response data
          setLoading(false);

          if (response.status !== 200) {
            toast({
              title: `Status ${response.status}`,
              description: response.data?.message,
            });
            response.data = {
              ...response.data,
              success: false,
            };
            return Promise.reject(response);
          }

          return Promise.resolve(response);
        },
      );

    const requests = requestInterceptor();
    const responses = responseInterceptor();

    return () => {
      controller.abort();
      privateRequest.interceptors.request.eject(requests);
      privateRequest.interceptors.response.eject(responses);
    };
  }, []);
};
