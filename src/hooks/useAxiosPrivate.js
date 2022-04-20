import { userRequest } from "../requestMethods";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useRefreshToken from "./useRefreshToken"; 

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useSelector((state) => state.user);
    useEffect(() => {
        const requestIntercept = userRequest.interceptors.request.use(
            config => {
                console.log(auth);
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = userRequest.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    console.log(newAccessToken);
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return userRequest(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            userRequest.interceptors.request.eject(requestIntercept);
            userRequest.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return userRequest;
}

export default useAxiosPrivate;