import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../api";
import { getApiJson } from "../../controllers/APICtrl";
import { removeUserData, setUserData } from "../../store/slice/userSlice";

const FetchAppData = () => {

  const dispatch = useDispatch()

  useEffect(() => {

    // Fetch User Data
    const fetchUser = async () => {

      const userData = await getApiJson(getUser())

      if (userData.error) dispatch(removeUserData()) 

      else dispatch(setUserData(userData))

      // return userData

    }

    fetchUser()

  }, [dispatch])

  return false

}

export default FetchAppData