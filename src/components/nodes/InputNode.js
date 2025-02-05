import { Handle, Position } from "@xyflow/react";

const InputNode = ({ data, isConnectable, id }) => {
  return (
    <div className=" border border-gray-200 p-[5px] rounded-md bg-white">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="mb-3">
        <label className="block text-black text-[12px] mb-1">
          {data.label}:
        </label>
        <input
          style={{
            all: "revert",
            border: "1px solid",
            borderRadius: "0.25rem",
            padding: "0.25rem",
          }}
          type={data.type}
          placeholder={data.label}
          required
          minLength={3}
          maxLength={50}
          onChange={data.onChange}
        />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default InputNode;
