import { useEffect, useRef, useState } from "react";
import "./ImageCard.css";

function ImageCard({ image }) {
    const [selected, setSelected] = useState(false);

    const closeButtonRef = useRef(null);
    const imageRef = useRef(null);
    const modalImageRef = useRef(null);
    const previousSelected = useRef(false);

    // モーダルを開いたとき・閉じたときのフォーカス移動
    useEffect(() => {
        if (selected && !previousSelected.current) {
            closeButtonRef.current?.focus();
        }

        if (!selected && previousSelected.current) {
            imageRef.current?.focus();
        }

        previousSelected.current = selected;
    }, [selected]);

    // モーダル表示中のキーボード操作
    useEffect(() => {
        if (!selected) {
            return;
        }

        const handleKeyDown = (event) => {
            // Escapeでモーダルを閉じる
            if (event.key === "Escape") {
                setSelected(false);
            }

            // Tabでフォーカスを移動
            if (event.key === "Tab") {
                event.preventDefault();

                if (event.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === closeButtonRef.current) {
                        modalImageRef.current?.focus();
                    } else {
                        closeButtonRef.current?.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === closeButtonRef.current) {
                        modalImageRef.current?.focus();
                    } else {
                        closeButtonRef.current?.focus();
                    }
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selected]);

    return (
        <div className="image-card">
            {/* 一覧表示の画像 */}
            <img
                ref={imageRef}
                src={image.urls.small}
                alt={image.alt_description}
                tabIndex={0}
                onClick={() => {
                    setSelected(true);
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        setSelected(true);
                    }
                }}
            />

            {/* 撮影者 */}
            <p className="photographer">
                <span className="photographer-icon">●</span>
                {image.user.name}
            </p>

            {/* モーダル */}
            {selected && (
                <div
                    className="image-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-label="画像を拡大表示"
                    onClick={(event) => {
                        event.stopPropagation();
                        setSelected(false);
                    }}
                >
                    {/* 閉じるボタン */}
                    <button
                        ref={closeButtonRef}
                        className="modal-close"
                        aria-label="画像を閉じる"
                        onClick={(event) => {
                            event.stopPropagation();
                            setSelected(false);
                        }}
                    >
                        ×
                    </button>

                    {/* モーダル内の画像 */}
                    <img
                        ref={modalImageRef}
                        src={image.urls.regular}
                        alt={image.alt_description}
                        tabIndex={0}
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default ImageCard;