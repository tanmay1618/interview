const ScoreCard = ({ onScoreSelect }) => {
    const [selectedScore, setSelectedScore] = useState(null);
  
    const handleScoreClick = (score) => {
      setSelectedScore(score);
      onScoreSelect(score);
    };
  
    return (
      <div className="p-4 border rounded-lg shadow-md max-w-sm mx-auto">
        <h2 className="text-xl font-semibold mb-2">Rate out of 10</h2>
        <div className="flex gap-2 flex-wrap">
          {[...Array(10)].map((_, index) => {
            const score = index + 1;
            return (
              <button
                key={score}
                className={`px-3 py-1 border rounded-md transition duration-200 ${
                  selectedScore === score ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => handleScoreClick(score)}
              >
                {score}
              </button>
            );
          })}
        </div>
        {selectedScore !== null && (
          <p className="mt-3 text-lg">You selected: {selectedScore}</p>
        )}
      </div>
    );
  };