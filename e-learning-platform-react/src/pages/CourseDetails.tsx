import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface Category {
  id: number;
  name: string;
  created: string;
  updated: string;
}

interface CourseDetails {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  created: string;
  updated: string;
  category: Category;
  courseDetails: {
    duration: number;
    rating: number;
    educatorFullName: string;
  };
}

export const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(
    null
  );

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5098/api/Courses/${courseId}/details`
        );
        setCourseDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleViewLessons = () => {
    navigate(`/courses/${courseId}/lessons`);
  };

  if (!courseDetails) {
    return <p>Loading course details...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Course Details</h1>
      <h2 className="text-2xl font-semibold text-gray-900">
        {courseDetails.name}
      </h2>
      <p className="text-gray-700">{courseDetails.description}</p>
      <p className="text-gray-700">Price: ${courseDetails.price}</p>
      <img
        src={courseDetails.imageUrl}
        alt={courseDetails.name}
        className="w-full h-auto mb-4"
      />
      <p className="text-gray-700">Category: {courseDetails.category.name}</p>
      <p className="text-gray-700">
        Duration: {courseDetails.courseDetails.duration} hours
      </p>
      <p className="text-gray-700">
        Rating: {courseDetails.courseDetails.rating}
      </p>
      <p className="text-gray-700">
        Educator: {courseDetails.courseDetails.educatorFullName}
      </p>
      <button
        onClick={handleViewLessons}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        View Lessons
      </button>
    </div>
  );
};
