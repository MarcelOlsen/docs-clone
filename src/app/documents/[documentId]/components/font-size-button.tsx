import { useEditorStore } from "@/store/use-editor-store";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

export const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);

    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const incrementFontSize = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrementFontSize = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) updateFontSize(newSize.toString());
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <button className="h-7 w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
        <MinusIcon
          className="size-4 cursor-pointer"
          onClick={decrementFontSize}
        />
      </button>
      {/* not using a useEffect to update the displayed value, cause there'd be too much stuff affecting the <input/> with some value conflicts */}
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="h-7 w-10 rounded-sm text-sm text-center border border-neutral-400 bg-transparent cursor-text focus:outline-none focus:ring-0"
        />
      ) : (
        <button
          className="h-7 w-10 rounded-sm text-sm text-center border border-neutral-400 bg-transparent cursor-text hover:bg-neutral-200/80"
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
        >
          {currentFontSize}
        </button>
      )}
      <button className="h-7 w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
        <PlusIcon
          className="size-4 cursor-pointer"
          onClick={incrementFontSize}
        />
      </button>
    </div>
  );
};
