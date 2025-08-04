// import React, { useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import axios from "axios";
// import Title from "../components/Title";
// import StarRating from "../components/StarRating";
// import { testimonials } from "../assets/assets";
// import { useAppContext } from "../context/AppContext";

// const Testimonials = () => {
//   const [formData, setFormData] = useState({ rating: 5, review: "" });
//   const [testimonials, setTestimonials] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const { user, getToken } = useAppContext();

//   const [isExpanded, setIsExpanded] = useState(false);
//   const toggleReadMore = () => setIsExpanded((prev) => !prev);

//   const fetchTestimonials = async (req, res) => {
//     try {
//       const res = await axios.get(`/api/testimonials?page=${page}`);

//       setTestimonials(res.data.testimonials);
//       setTotalPages(res.data.totalPages);
//       console.log(testimonials);
//       console.log(totalPages);

//     } catch (err) {
//       console.error("Error fetching testimonials:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTestimonials();
//   }, [page]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         "/api/testimonials",
//         { ...formData },
//         { headers: { Authorization: `Bearer ${await getToken()}` } }
//       );
//       console.log("save testimonial");

//       setFormData({ rating: 5, review: "" });
//       fetchTestimonials();
//     } catch (err) {
//       console.error("Error submitting testimonial:", err);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center px-4 md:px-16 bg-slate-50 pt-16 pb-24 mt-30">
//       <Title
//         title="What Our Guests Say"
//         subTitle="Discover why travelers consistently choose Quickstay for exclusive and luxurious stays."
//       />

//       {user && (
//         <form
//           onSubmit={handleSubmit}
//           className="w-full max-w-xl mt-10 bg-white p-6 rounded-xl shadow"
//         >
//           <h3 className="text-xl font-semibold mb-4">Add Your Testimonial</h3>
//           <textarea
//             value={formData.review}
//             onChange={(e) =>
//               setFormData({ ...formData, review: e.target.value })
//             }
//             placeholder="Your review..."
//             className="w-full border border-gray-300 rounded-lg p-3 resize-none mb-4"
//             rows={4}
//             required
//           />
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <span className="text-gray-700">Rating:</span>
//               <select
//                 value={formData.rating}
//                 onChange={(e) =>
//                   setFormData({ ...formData, rating: +e.target.value })
//                 }
//                 className="border rounded px-2 py-1"
//               >
//                 {[1, 2, 3, 4, 5].map((num) => (
//                   <option key={num} value={num}>
//                     {num}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
//         {testimonials?.map((testimonial) => (
//           <div
//             key={testimonial._id}
//             className="bg-white p-6 rounded-xl shadow max-w-xs mx-auto"
//           >
//             <div className="flex items-center gap-3">
//               <img
//                 className="w-12 h-12 rounded-full"
//                 src={testimonial.userId.image}
//                 alt={testimonial.userId.username}
//               />
//               <div>
//                 <p className="font-playfair text-lg">
//                   {testimonial.userId.username}
//                 </p>
//               </div>
//             </div>
//             <div className="mt-2">
//               <StarRating rating={testimonial.rating} />
//             </div>
//             <p className="text-gray-500 mt-2">{testimonial.review}</p>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="mt-10 flex gap-4">
//         <button
//           className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//           disabled={page === 1}
//           onClick={() => setPage(page - 1)}
//         >
//           Prev
//         </button>
//         <span className="text-lg font-medium">
//           {page} / {totalPages}
//         </span>
//         <button
//           className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//           disabled={page === totalPages}
//           onClick={() => setPage(page + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Testimonials;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "../components/Title";
import StarRating from "../components/StarRating";
import { useAppContext } from "../context/AppContext";

const Testimonials = () => {
  const [formData, setFormData] = useState({ rating: 5, review: "" });
  const [testimonials, setTestimonials] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedMap, setExpandedMap] = useState({});

  const { user, getToken } = useAppContext();

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(`/api/testimonials?page=${page}`);
      setTestimonials(res.data.testimonials);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/testimonials",
        { ...formData },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      setFormData({ rating: 5, review: "" });
      fetchTestimonials();
    } catch (err) {
      console.error("Error submitting testimonial:", err);
    }
  };

  const toggleExpand = (id) => {
    setExpandedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col items-center px-4 md:px-16 bg-slate-50 pt-16 pb-24 mt-30">
      <Title
        title="What Our Guests Say"
        subTitle="Discover why travelers consistently choose Quickstay for exclusive and luxurious stays."
      />

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {testimonials.map((testimonial) => {
          const isExpanded = expandedMap[testimonial._id];
          const reviewLength = testimonial.review.length;
          const shouldClamp = reviewLength > 250;

          return (
            <div
              key={testimonial._id}
              className="bg-white p-6 rounded-xl shadow w-full max-w-xs min-h-[320px] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={testimonial.userId.image}
                    alt={testimonial.userId.username}
                  />
                  <div>
                    <p className="font-playfair text-lg font-semibold">
                      {testimonial.userId.username}
                    </p>
                  </div>
                </div>

                <StarRating rating={testimonial.rating} />

                <p
                  className={`text-gray-600 text-sm mt-2 transition-all duration-300 ${
                    !isExpanded && shouldClamp ? "line-clamp-5" : ""
                  }`}
                >
                  {testimonial.review}
                </p>
              </div>

              {shouldClamp && (
                <button
                  onClick={() => toggleExpand(testimonial._id)}
                  className="mt-3 text-blue-600 text-sm hover:underline"
                >
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex gap-4 items-center">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span className="text-lg font-medium">
          {page} / {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {user && (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl mt-40 bg-white p-6 rounded-xl shadow"
        >
          <h3 className="text-xl font-semibold mb-4">Add Your Testimonial</h3>
          <textarea
            value={formData.review}
            onChange={(e) =>
              setFormData({ ...formData, review: e.target.value })
            }
            placeholder="Your review..."
            className="w-full border border-gray-300 rounded-lg p-3 resize-none mb-4"
            rows={4}
            required
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gray-700">Rating:</span>
              <select
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: +e.target.value })
                }
                className="border rounded px-2 py-1"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Testimonials;
