import { useState } from 'react';
import "./SearchBar.css";

function SearchBar({ onSubmit, loading }) {
    const [term, setTerm] = useState('');

    const onFormSubmit = (event) => {
        event.preventDefault();

           if (term.trim() === "") {
                return;
            }

        onSubmit(term);
    };

    return (
        <form onSubmit={onFormSubmit} className="search-form">
            <input
                type="text"
                value={term}
                placeholder="画像を検索..."
                onChange={(event) => {
                    setTerm(event.target.value);
                }}
            />

            <button type="submit" disabled={loading}>
                {loading ? "検索中..." : "検索"}
            </button>
        </form>
    );
}

export default SearchBar;