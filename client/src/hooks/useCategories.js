import { useState, useEffect } from 'react';
import Axios from 'axios';

const useCategories = () => {
    const [categoryList, setCategoryList] = useState([]);

    const refreshCategories = () => {
        Axios.get("http://localhost:3001/api/get/users").then((response) => {
            setCategoryList(response.data);
        });
    };

    useEffect(() => {
        refreshCategories();
    }, []);

    return { categoryList, refreshCategories };
}

export default useCategories;