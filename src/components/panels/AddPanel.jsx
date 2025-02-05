"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { X } from "lucide-react";

const nodeSchema = z.object({
  type: z.enum(["inputNode", "selectNode"]),
  label: z
    .string()
    .min(3, "Label must contain at least 3 character(s)")
    .max(20, "Label must contain at most 20 character(s)"),
  options: z.array(z.string()),
});

function AddPanel({ onAddNode }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(nodeSchema),
    defaultValues: {
      type: "inputNode",
      name: "",
      label: "",
      options: [],
    },
  });

  const selectedNodeType = watch("type");

  const [options, setOptions] = useState([]);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
    setValue("options", newOptions);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    setValue("options", newOptions);
  };

  const onSubmit = (data) => {
    onAddNode(data);
    console.log(data);
    reset();
    setOptions([]);
  };

  return (
    <div className="w-64 bg-white p-4 fixed left-0 top-0 h-full shadow-lg">
      <h2 className="text-lg font-bold mb-4">Add Node</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-2">Node Type</label>
          <select
            {...register("type")}
            className="w-full border rounded p-2 mb-2"
          >
            <option value="inputNode">Input Node</option>
            <option value="selectNode">Select Node</option>
          </select>
          {errors.type && <p className="text-red-500">{errors.type.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Label</label>
          <input
            type="text"
            {...register("label")}
            className="w-full border rounded p-2 mb-2"
          />
          {errors.label && (
            <p className="text-red-500">{errors.label.message}</p>
          )}
        </div>

        {selectedNodeType === "selectNode" && (
          <div className="mb-4">
            <label className="block mb-2">Options</label>
            {options.map((option, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  className="flex-1 border rounded p-2"
                />
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="bg-gray-300 text-black px-2 py-1 rounded"
            >
              + Add Option
            </button>
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Node
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPanel;
