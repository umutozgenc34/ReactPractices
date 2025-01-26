import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Lesson {
  id: number;
  courseId: string;
  title: string;
  videoUrl: string;
  lessonOrder: number;
  created: string;
  updated: string;
}

const CourseLessons = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5098/api/Courses/${courseId}/lessons`
        );
        setLessons(response.data.data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
  }, [courseId]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Course Lessons</h1>
      {lessons.length === 0 ? (
        <p>No lessons available for this course.</p>
      ) : (
        <ul className="space-y-4">
          {lessons.map((lesson) => (
            <li key={lesson.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900">
                {lesson.title}
              </h2>
              <video controls className="w-full h-auto">
                <source src={lesson.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-gray-700">
                Lesson Order: {lesson.lessonOrder}
              </p>
              <p className="text-gray-700">
                Created: {new Date(lesson.created).toLocaleString()}
              </p>
              <p className="text-gray-700">
                Updated: {new Date(lesson.updated).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseLessons;
