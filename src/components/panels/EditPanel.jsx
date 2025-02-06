"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X } from "lucide-react";

const editNodeSchema = z.object({
  label: z.string().min(1, "Label is required"),
  options: z.array(z.string()).optional(),
});

function EditPanel({ selectedNode, updateNode, onPanelClose }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editNodeSchema),
    defaultValues: {
      label: selectedNode?.data.label || "",
      options: selectedNode?.data.options || [],
    },
  });

  useEffect(() => {
    if (selectedNode) {
      setValue("label", selectedNode.data.label);
      if (selectedNode.data.options) {
        setValue("options", selectedNode.data.options);
      }
    }
  }, [selectedNode, setValue]);

  if (!selectedNode) return null;

  const onSubmit = (formData) => {
    updateNode(selectedNode.id, {
      label: formData.label,
      ...(formData.options && { options: formData.options }),
    });
    onClose();
  };

  const options = watch("options");

  const addOption = () => {
    setValue("options", [...options, ""]);
  };

  const removeOption = (indexToRemove) => {
    const updatedOptions = options.filter(
      (_, index) => index !== indexToRemove
    );
    setValue("options", updatedOptions);
  };

  return (
    <div className="w-64 bg-white p-4 fixed right-0 top-0 h-full shadow-lg z-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Edit Node</h2>
        <button
          type="button"
          onClick={onPanelClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} className="text-gray-500 hover:text-gray-700" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block mb-2">Label</label>
        <input
          type="text"
          {...register("label")}
          className="w-full border rounded p-2 mb-2"
        />
        {errors.label && <p className="text-red-500">{errors.label.message}</p>}

        {selectedNode && (
          <div className="mb-4">
            <label className="block mb-2">Options</label>
            {options.map((option, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  {...register(`options.${index}`)}
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

        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPanel;
