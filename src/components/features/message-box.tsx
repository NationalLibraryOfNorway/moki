import {ReactNode} from "react";

interface MessageBoxProps {
  title: string;
  body: ReactNode | string;
  className?: string;
}

export const MessageBox = (props: MessageBoxProps) => {
  return (
    <div className={`rounded-md border-2 p-5 border-blue-500 bg-blue-100 bg-opacity-25 ${props.className}`}>
      <h1 className="text-xl text-left pb-2.5">{props.title}</h1>
      <div className="text-left">
        {props.body}
      </div>
    </div>
  )
};