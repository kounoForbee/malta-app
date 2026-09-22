import ImageCard from "./ImageCard.jsx";
import "./ImageList.css";

function ImageList({ images }) {

    if (images.length === 0) {
        return <p className="no-results">写真が見つかりませんでした。</p>;
    }

    return (
        <div className="image-list">
            {images.map((image) => {
                return <ImageCard key={image.id} image={image} />;
            })}
        </div>
    );
}

export default ImageList;