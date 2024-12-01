"use client";

import React, { useState } from "react";

interface Contact {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface SearchResultsProps {
  data: Contact[];
  onContactSelect: (contact: Contact) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ data, onContactSelect }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Search Results</h2>

      {/* Table for Displaying Search Results */}
      <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Date of Birth</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Address</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">City</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">State</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Zip Code</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Phone Number</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentContacts.map((contact, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-50 cursor-pointer"
              onClick={() => onContactSelect(contact)}
            >
              <td className="px-4 py-2 text-sm text-gray-700">
                {contact.firstName} {contact.lastName}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">{contact.dateOfBirth}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{contact.address}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{contact.city}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{contact.state}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{contact.zipCode}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{contact.email}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{contact.phoneNumber}</td>
              <td className="px-4 py-2 text-sm text-blue-600">Select</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none disabled:bg-indigo-300`}
          disabled={currentPage === 1 || data.length === 0}
          onClick={() => paginate(currentPage - 1)}
        >
          Previous
        </button>
        <span className="mx-4 self-center text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none disabled:bg-indigo-300"
          disabled={currentPage === totalPages || data.length === 0}
          onClick={() => paginate(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
