import { FaCaretDown } from "react-icons/fa";

interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

export const Marker = ({
  position,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick,
}: MarkerProps) => {
  return (
    <div
      className="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2"
      style={{ [isLeft ? "left" : "right"]: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className="absolute left-1.5 top-0 h-full fill-blue-500 transform -translate-x-1/2" />
      <div
        className="absolute bg-blue-500 h-screen w-[1px] left-1.5 top-4 transform -translate-x-1/2 transition-opacity duration-150"
        style={{ display: isDragging ? "block" : "none" }}
      />
    </div>
  );
};
