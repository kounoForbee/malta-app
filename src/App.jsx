import { useEffect, useState } from 'react';
import SearchBar from "./components/SearchBar.jsx";
import ImageList from "./components/ImageList.jsx";
import axios from "axios";
import "./App.css";

const App = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const onSearchSubmit = async (term) => {
        setLoading(true);
        setError("");

        try {
            const response = await axios.get(
                "https://api.unsplash.com/search/photos",
                {
                    params: {
                        query: term,
                        per_page: 30,
                    },
                    headers: {
                        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
                    },
                }
            );

            setImages(response.data.results);
            setSearchTerm(term);
            } catch (error) {
                console.error(error);
                setError("画像を取得できませんでした。");
            }

        setLoading(false);
    };

    useEffect(() => {
        onSearchSubmit("Malta");
    }, []);

    return (
        <div className="ui container">
            <h1>Malta in Photos</h1>

            <SearchBar
                onSubmit={onSearchSubmit}
                loading={loading}
            />

            {searchTerm && <h2>「{searchTerm}」の検索結果</h2>}
            
            {loading && <p>検索中...</p>}
            {error && <p>{error}</p>}

            <ImageList images={images} />
        </div>
    );
};

export default App;