import { ImageGalleryItemContainer, ImageGalleryItemImage } from "./ImageGalleryItem.styled";

export const ImageGalleryItem = ({ id, smallurl, tags, onClickImage }) => (
    <ImageGalleryItemContainer key={id} dataId={id} onClick={onClickImage}>
        <ImageGalleryItemImage dataId={id} src={smallurl} alt={tags} />
    </ImageGalleryItemContainer>
);