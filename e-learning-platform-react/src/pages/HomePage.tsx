import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { Course } from "../types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { addToCart } = useCart();
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5098/api/categories"
        );
        console.log("API response:", response.data);

        if (response.data && Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5098/api/courses");
        console.log("Courses API response:", response.data);

        if (response.data && Array.isArray(response.data.data)) {
          setFeaturedCourses(response.data.data);
          console.log("Fetched courses:", response.data.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCategories();
    fetchCourses();
  }, []);

  const handleCategoryClick = async (categoryId: number) => {
    setSelectedCategory(categoryId);
    try {
      const response = await axios.get(
        `http://localhost:5098/api/courses/byCategory?categoryId=${categoryId}`
      );
      console.log("Category Courses API response:", response.data);

      if (response.data && Array.isArray(response.data.data)) {
        setFeaturedCourses(response.data.data);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching category courses:", error);
    }
  };

  const handleExploreCoursesClick = async () => {
    setSelectedCategory(null);
    try {
      const response = await axios.get("http://localhost:5098/api/courses");
      console.log("Courses API response:", response.data);

      if (response.data && Array.isArray(response.data.data)) {
        setFeaturedCourses(response.data.data);
        console.log("Fetched courses:", response.data.data);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleCourseClick = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 mb-12">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl font-bold mb-4">Learn Without Limits</h1>
          <p className="text-xl mb-6">
            Start, switch, or advance your career with thousands of courses from
            expert instructors.
          </p>
          <button
            onClick={handleExploreCoursesClick}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Explore Courses
          </button>
        </div>
      </div>

      {/* Featured Courses */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          {selectedCategory
            ? "Courses in Selected Category"
            : "Featured Courses"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 cursor-pointer"
              onClick={() => handleCourseClick(course.id.toString())}
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
                  {course.description}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {course.courseDetails.educatorFullName}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    ${course.price}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(course);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Top Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.isArray(categories) &&
            categories.map((category) => (
              <div
                key={category.id}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleCategoryClick(category.id)}
              >
                <h3 className="text-lg font-medium text-gray-900">
                  {category.name}
                </h3>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
