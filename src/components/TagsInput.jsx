import React, { useState } from "react";

const TagsInput = ({ tags = [], setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && tags.length) {
      setTags(tags.slice(0, tags.length - 1));
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap mb-2">
        {Array.isArray(tags) &&
          tags.map((tag, index) => (
            <div
              key={index}
              className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 m-1 flex items-center"
            >
              <span>{tag}</span>
              <button
                className="ml-2 text-gray-500 hover:text-red-500"
                onClick={() => removeTag(index)}
              >
                &times;
              </button>
            </div>
          ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a tag and press Enter"
        className="input input-bordered w-full bg-gray-100 border-gray-300 focus-within:outline-none placeholder:text-gray-400 text-black"
      />
    </div>
  );
};

export default TagsInput;
