import React, { ButtonHTMLAttributes, HtmlHTMLAttributes } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
// import { deletePublication } from "@/app/_action";

type Props = React.HtmlHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  image?: any;
  onClick?: (id: number) => void;
  postId?: number;
};

const Button = ({
  className,
  label,
  image,
  postId,
  onClick: handleClick,
  ...props
}: Props) => {
  const pathName = usePathname();
  return (
    <button className={className} onClick={handleClick}>
      <div className="flex items-center justify-between self-end	">
        {label && <p className="text-sm text-white"> {label}</p>}
        {image && image}
      </div>
    </button>
  );
};

export default Button;
