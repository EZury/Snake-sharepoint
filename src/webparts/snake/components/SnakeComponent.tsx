import * as React from 'react';

export interface SnakeComponentProps {
  left: number;
  top: number;
}

export default (props, {}) => {
  return (
    <div>
      {props.snakeParts.map((part: string, i: number) => {
        const style = {
          left: `${part[0]}%`,
          top: `${part[1]}%`
        };
        return (
          <div className="snake" key={i} style={style}></div>
        );
      })}
    </div>
  );
};