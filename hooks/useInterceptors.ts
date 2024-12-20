//NOTE :  interceptors are global request/response confiugurations a

import { setLoading } from '@/app/state/loading-state';
import { toast } from '@/components/ui/use-toast';
import { privateRequest } from '@/lib/requests';
import { useEffect } from 'react';

export const useAxiosInterceptors = () => {
  useEffect(() => {
    const requestInterceptor = () =>
      privateRequest.interceptors.request.use((config: any) => {
        // Do something before request is sent
        setLoading(true);
        return config;
      });

    const responseInterceptor = () =>
      privateRequest.interceptors.response.use(
        ({ status, data, ...others }) => {
          // Do something with response data
          setLoading(false);
          if (status !== 200) {
            toast({
              title: `Status ${status}`,
              description: data.message,
            });
            data = {
              ...data,
              success: false,
            };
          }
          return Promise.reject({ status, data, ...others });
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
