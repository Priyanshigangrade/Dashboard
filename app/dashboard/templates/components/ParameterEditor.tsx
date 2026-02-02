"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ParamType = "text" | "number" | "file";

interface Parameter {
  key: string;
  type: ParamType;
}

export default function ParameterEditor({
  parameters,
  onChange,
  allowedTypes,
}: {
  parameters: Parameter[];
  onChange: (p: Parameter[]) => void;
  allowedTypes: ParamType[];
}) {
  return (
    <div className="space-y-3">
      {parameters.map((p, i) => (
        <div key={i} className="grid grid-cols-4 gap-2 items-center">
          {/* Key */}
          <Input
            value={p.key}
            placeholder="parameter_key"
            onChange={(e) => {
              const next = [...parameters];
              next[i] = { ...p, key: e.target.value };
              onChange(next);
            }}
          />

          {/* Type */}
          <select
            value={p.type}
            onChange={(e) => {
              const next = [...parameters];
              next[i] = { ...p, type: e.target.value as ParamType };
              onChange(next);
            }}
            className="border rounded px-2 py-1"
          >
            {allowedTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* Delete */}
          <Button
            variant="ghost"
            onClick={() =>
              onChange(parameters.filter((_, x) => x !== i))
            }
          >
            Delete
          </Button>
        </div>
      ))}

      {/* Add */}
      <Button
        variant="outline"
        onClick={() =>
          onChange([...parameters, { key: "", type: allowedTypes[0] }])
        }
      >
        Add Parameter
      </Button>
    </div>
  );
}
