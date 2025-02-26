import {ReactNode} from "react";

interface MessageBoxProps {
    title: string;
    body: ReactNode | string;
    type: 'error' | 'warning' | 'info';
}

export const MessageBox = (props: MessageBoxProps) => {
  let color;
  switch (props.type) {
    case 'error':
      color = 'red';
      break;
    case 'warning':
      color = 'yellow';
      break;
    case 'info':
      color = 'blue';
      break;
    default:
      color = 'white';
  }

  return (
    <div className={`rounded-md border-2 p-5 border-${color}-500 bg-${color}-100 bg-opacity-50`}>
      <h1 className="text-xl text-left pb-2.5">{props.title}</h1>
      <div className="text-left">
        {props.body}
      </div>
    </div>
  )
};