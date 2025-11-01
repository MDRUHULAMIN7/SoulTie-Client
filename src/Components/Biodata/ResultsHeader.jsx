import { Users } from "lucide-react";

const ResultsHeader = ({ biodatasCount, totalItems }) => {
  return (
    <div className="flex items-center justify-between mb-6 rounded-lg px-6 py-4 shadow-sm">
      <p className="text-gray-600 flex items-center gap-2">
        <Users className="w-5 h-5 text-rose-500" />
        <span>
          Showing <span className="font-semibold text-gray-800">{biodatasCount}</span> of{' '}
          <span className="font-semibold text-gray-800">{totalItems}</span> biodatas
        </span>
      </p>
    </div>
  );
};

export default ResultsHeader;