import { refreshRequest } from '../requestMethods';
import { apiRefreshSuccess, logout } from "../redux/userRedux";
import { useDispatch } from "react-redux";
  
const useRefreshToken = () => {
    const dispatch = useDispatch();

    const refresh = async () => {
        try {
            const res = await refreshRequest.get('/auth/refresh');
            dispatch(apiRefreshSuccess(res.data));
            //console.log("use refresh try ran");
            //console.log(res);
            return res.data.accessToken;
        }
        catch (err) {
            if (err.response.status === 401) {
                console.log("use refresh error ran");
            }
        }
    }
    return refresh;
};

export default useRefreshToken;
