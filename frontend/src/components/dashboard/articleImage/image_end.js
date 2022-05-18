import styled from "styled-components";
import Uploader from "./upload";
import ImagePreview from "./preview";

const Avatar = styled.div`
    position: relative;
    ${'' /* padding-top: 100%; */}
    display: flex;
    justify-content: center;
    width: ${props => props.size + '%'};
    height: 350px;
    ${'' /* min-height: 50%; */}
    border: 2px dashed #9b9b9b;
    cursor: pointer;
    background-color: #f7f7f7;
    background-position: center center;
    background-repeat: no-repeat;
    overflow: hidden;
    background-image: url(${props => props.placeholder});
`;

Avatar.Uploader = Uploader;
Avatar.Preview = ImagePreview;

export default Avatar;