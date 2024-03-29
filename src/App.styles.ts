import styled from "styled-components";
import { IconButton } from "@material-ui/core";
export const Wrapper = styled.div`
  margin: 40px;
`;

export const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  top: 30px;
  right: 10px;
  background-color: gray;
  border: 0.5px solid white;
`;
