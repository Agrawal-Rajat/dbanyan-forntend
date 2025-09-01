export default function BackendPagination({ currentPage, totalPages, onPageChange }) {
  if (!totalPages || totalPages === 0) return null;

  const increase = () => {
    onPageChange(Math.min(currentPage + 1, totalPages));
    window.scrollTo(0, 0);
  };

  const decrease = () => {
    onPageChange(Math.max(currentPage - 1, 1));
    window.scrollTo(0, 0);
  };

  // ✅ Updated theme colors (Green + White)
  const activeButtonClass =
    "font-bold text-white bg-green-600 border-green-600 border-2 rounded-lg text-[15px] hover:bg-green-700 transition";
  const disabledButtonClass =
    "font-bold text-gray-400 bg-gray-200 border-gray-300 border-2 rounded-lg text-[15px] cursor-not-allowed";

  return (
    <div className="w-full h-10 mt-10 mb-5 flex justify-center items-center space-x-2">
      {/* Previous Button */}
      <button
        onClick={decrease}
        disabled={currentPage === 1}
        className={`w-[90px] h-[40px] py-[6px] px-[11px] cursor-pointer${
          currentPage === 1 ? disabledButtonClass : activeButtonClass
        }`}
      >
        Previous
      </button>

      {/* Current Page Button */}
      <button
        className={`w-[46px] h-[40px] py-[6px] px-[16px] cursor-default ${activeButtonClass}`}
      >
        {currentPage.toString().padStart(2)}
      </button>

      {/* Next Button */}
      <button
        onClick={increase}
        disabled={currentPage === totalPages}
        className={`w-[60px] h-[40px] py-[6px] px-[11px] cursor-pointer ${
          currentPage === totalPages ? disabledButtonClass : activeButtonClass
        }`}
      >
        Next
      </button>
    </div>
  );
}
