// import React, { useState } from 'react';

// const FormInput = ({ 
//   label, 
//   id, 
//   type = "text", 
//   error, 
//   ...props 
// }) => {
//   return (
//     <div>
//       <label htmlFor={id} className="block text-sm font-medium text-gray-700">
//         {label}
//       </label>
//       <div className="mt-1">
//         <input
//           id={id}
//           type={type}
//           className={`appearance-none relative block w-full px-3 py-2 border ${
//             error ? 'border-red-500' : 'border-gray-300'
//           } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//           {...props}
//         />
//         {error && (
//           <p className="mt-2 text-sm text-red-600">{error}</p>
//         )}
//       </div>
//     </div>
//   );
// };