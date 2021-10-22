import React from "react";

import { TodoType } from "../../types";

interface Props {
  todoArray: TodoType[];
}

const TodoList: React.FC<Props> = ({ todoArray }) => {
  return (
    <div className="todolistContainer">
      {todoArray.map((item, index) => {
        return (
          <div>
            <span key={index}>{item.text}</span>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
