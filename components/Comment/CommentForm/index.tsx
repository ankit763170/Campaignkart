import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

interface CommentFormProps {
  name: string;
  setName: (value: string) => void;
  message: string;
  setMessage: (value: string) => void;
  handleSubmit: () => void;
  loading:boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({
  name,
  setName,
  message,
  setMessage,
  handleSubmit,
  loading
}) => {
  return (
    <div>
      <div className="pt-4 ">
        <div className="bg-brand_lightgray rounded-lg p-6">
          <div>
            <div className="pt-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="title"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="pt-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                className="px-4 text-white py-2 bg-brand_secondary"
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
