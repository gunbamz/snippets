import { refreshApi } from "../redux/apiCalls";
import { useDispatch } from "react-redux";


const RefreshToken = () => {
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        refreshApi(dispatch, 'n');
    }

    return (
        <div>
            <button>refresh</button>
        </div>
    );
}
export default RefreshToken;
