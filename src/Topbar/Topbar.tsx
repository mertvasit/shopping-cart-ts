//Styles
import { Wrapper } from "./Topbar.styles";

type Props = {};

const Topbar: React.FC<Props> = () => {
  return (
    <Wrapper>
      {["products", "services", "support", "todolist"].map((item, index) => {
        return (
          <a key={index} href={`/${item}`}>
            {item.toUpperCase()}
          </a>
        );
      })}
    </Wrapper>
  );
};

export default Topbar;
