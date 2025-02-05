import { Handle, Position } from "@xyflow/react";

const SelectNode = ({ data, isConnectable, id }) => {
  return (
    <div className="border border-gray-200 p-[5px] rounded-md bg-white">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="mb-3">
        <label className="block text-black text-[12px] mb-1">
          {data.label}:
        </label>
        <select
          onChange={data.onChange}
          style={{
            all: "revert",
            border: "1px solid",
            borderRadius: "0.25rem",
            padding: "0.25rem",
          }}
          required={data.required}
        >
          <option value="">Select an option...</option>
          {data.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default SelectNode;
