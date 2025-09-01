import logo from "./spinnerimg.png"; // Adjust path as needed
export default function CustomLoader(){
return (
<div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gray-500 bg-opacity-75 backdrop-blur-sm">
  <div className="relative h-24 w-24">
    <div className="absolute inset-0 animate-spin rounded-full border-4 border-t-[#008080] border-r-transparent border-b-transparent border-l-transparent"></div>
    <img
      src={logo}
      alt="Loading..."
      className="absolute inset-0 m-auto h-16 w-16 object-contain"
    />
  </div>
  <p className="mt-4 text-black text-lg font-semibold tracking-wide">
    Loading... Please wait
  </p>
</div>
)
}