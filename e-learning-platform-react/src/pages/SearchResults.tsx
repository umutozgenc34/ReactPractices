import { useLocation } from "react-router-dom";
import { Course } from "../types";

const SearchResults = () => {
  const location = useLocation();
  const { results } = location.state as { results: Course[] };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Search Results</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {results.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 cursor-pointer"
          >
            <img
              src={course.imageUrl}
              alt={course.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {course.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {course.courseDetails.educatorFullName}
              </p>
              <p className="text-sm text-gray-500 mb-4">{course.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  ${course.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
